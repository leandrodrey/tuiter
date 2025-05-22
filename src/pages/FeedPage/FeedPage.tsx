import {useEffect, useState, type JSX} from 'react';
import {apiGetFeed} from '../../services/FeedService.ts';
import {apiAddLikeToTuit, apiRemoveLikeFromTuit} from '../../services/TuitsService.ts';
import {FAVORITE_USERS_KEY} from '../../constants/storageConstants';
import type {Post} from '../../types/postTypes';
import PostList from '../../components/Post/PostList';
import {useToast} from "../../hooks/useToast.ts";
import Loader from '../../components/UI/Loader';
import InfiniteScroll from 'react-infinite-scroll-component';

interface PostWithReplies {
    post: Post;
    replies: Post[];
}

const FeedPage = (): JSX.Element => {
    const [postsWithReplies, setPostsWithReplies] = useState<PostWithReplies[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [loadingMore, setLoadingMore] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [page, setPage] = useState<number>(1);
    const [hasMore, setHasMore] = useState<boolean>(true);
    const [initialLoading, setInitialLoading] = useState<boolean>(true);
    const toast = useToast();

    const processPostsResponse = (response: Post[]): PostWithReplies[] => {
        const parentPosts: Post[] = [];
        const repliesByParentId: Record<number, Post[]> = {};

        response.forEach(post => {
            if (post.parent_id === 0) {
                parentPosts.push(post);
            } else {
                if (!repliesByParentId[post.parent_id]) {
                    repliesByParentId[post.parent_id] = [];
                }
                repliesByParentId[post.parent_id].push(post);
            }
        });

        return parentPosts.map(post => ({
            post,
            replies: repliesByParentId[post.id] || []
        }));
    };

    const fetchMorePosts = async () => {
        // Prevent concurrent fetches and don't fetch if there are no more posts
        if (!hasMore || loadingMore || loading) return;

        try {
            // Clear any previous errors
            setError(null);
            setLoadingMore(true);

            const nextPage = page + 1;
            const response = await apiGetFeed({ page: nextPage });

            // If no more posts are returned or fewer than expected, set hasMore to false
            if (response.length === 0) {
                setHasMore(false);
                return;
            }

            // Assuming the API returns a fixed number of posts per page (e.g., 10)
            // If fewer posts are returned, it likely means we've reached the end
            const POSTS_PER_PAGE = 10;
            if (response.length < POSTS_PER_PAGE) {
                setHasMore(false);
            }

            // Process the response to organize posts
            const newPostsWithReplies = processPostsResponse(response);

            // Append new posts to existing posts
            setPostsWithReplies(prevPosts => [...prevPosts, ...newPostsWithReplies]);
            setPage(nextPage);
        } catch (err) {
            console.error('Error fetching more posts:', err);
            toast.error('Failed to load more posts. Please try again.');
            // Don't set hasMore to false on error, so user can try again
        } finally {
            setLoadingMore(false);
        }
    };

    const refreshFeed = async () => {
        // Prevent concurrent refreshes
        if (loading || loadingMore) return;

        try {
            // Clear any previous errors
            setError(null);
            setLoading(true);
            setPage(1);
            setHasMore(true);

            const response = await apiGetFeed({ page: 1 });

            // If no posts are returned, set hasMore to false but still clear the current posts
            if (response.length === 0) {
                setHasMore(false);
                setPostsWithReplies([]);
                toast.info('No posts available at the moment.');
                return;
            }

            // Assuming the API returns a fixed number of posts per page (e.g., 10)
            // If fewer posts are returned, it likely means we've reached the end
            const POSTS_PER_PAGE = 10;
            if (response.length < POSTS_PER_PAGE) {
                setHasMore(false);
            }

            // Process the response to organize posts
            const postsWithRepliesArray = processPostsResponse(response);
            setPostsWithReplies(postsWithRepliesArray);

            toast.success('Feed refreshed successfully!');
        } catch (err) {
            console.error('Error refreshing feed:', err);
            toast.error('Failed to refresh feed. Please try again.');
            // Don't clear current posts on error
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const fetchInitialPosts = async () => {
            try {
                setInitialLoading(true);
                const response = await apiGetFeed({ page: 1 });

                // If no posts are returned, set hasMore to false
                if (response.length === 0) {
                    setHasMore(false);
                    setError('No posts available at the moment.');
                    return;
                }

                // Assuming the API returns a fixed number of posts per page (e.g., 10)
                // If fewer posts are returned, it likely means we've reached the end
                const POSTS_PER_PAGE = 10;
                if (response.length < POSTS_PER_PAGE) {
                    setHasMore(false);
                }

                // Process the response to organize posts
                const postsWithRepliesArray = processPostsResponse(response);
                setPostsWithReplies(postsWithRepliesArray);
            } catch (err) {
                setError('Failed to load posts. Please try again later.');
                console.error('Error fetching posts:', err);
            } finally {
                setInitialLoading(false);
            }
        };

        fetchInitialPosts();
    }, []);

    const handleLikePost = async (postId: number) => {
        try {
            // Find the post in either parent posts or replies
            let targetPost: Post | undefined;
            let isReply = false;
            let parentPostId = 0;

            // Search in parent posts
            for (const postWithReplies of postsWithReplies) {
                if (postWithReplies.post.id === postId) {
                    targetPost = postWithReplies.post;
                    break;
                }

                // Search in replies
                const reply = postWithReplies.replies.find(r => r.id === postId);
                if (reply) {
                    targetPost = reply;
                    isReply = true;
                    parentPostId = postWithReplies.post.id;
                    break;
                }
            }

            if (!targetPost) {
                console.error(`Post with ID ${postId} not found`);
                return;
            }

            if (targetPost.liked) {
                // Unlike the post
                await apiRemoveLikeFromTuit(postId);

                setPostsWithReplies(prevPostsWithReplies =>
                    prevPostsWithReplies.map(pwr => {
                        if (!isReply && pwr.post.id === postId) {
                            // Update parent post
                            return {
                                ...pwr,
                                post: {
                                    ...pwr.post,
                                    likes: (pwr.post.likes || 0) - 1,
                                    liked: false
                                }
                            };
                        } else if (isReply && pwr.post.id === parentPostId) {
                            // Update reply
                            return {
                                ...pwr,
                                replies: pwr.replies.map(reply =>
                                    reply.id === postId
                                        ? {...reply, likes: (reply.likes || 0) - 1, liked: false}
                                        : reply
                                )
                            };
                        }
                        return pwr;
                    })
                );
            } else {
                // Like the post
                await apiAddLikeToTuit(postId);

                setPostsWithReplies(prevPostsWithReplies =>
                    prevPostsWithReplies.map(pwr => {
                        if (!isReply && pwr.post.id === postId) {
                            // Update parent post
                            return {
                                ...pwr,
                                post: {
                                    ...pwr.post,
                                    likes: (pwr.post.likes || 0) + 1,
                                    liked: true
                                }
                            };
                        } else if (isReply && pwr.post.id === parentPostId) {
                            // Update reply
                            return {
                                ...pwr,
                                replies: pwr.replies.map(reply =>
                                    reply.id === postId
                                        ? {...reply, likes: (reply.likes || 0) + 1, liked: true}
                                        : reply
                                )
                            };
                        }
                        return pwr;
                    })
                );
            }
        } catch (err) {
            console.error('Error toggling like on post:', err);
        }
    };

    const handleAddToFavorites = (author: string, avatarUrl: string) => {
        // Get existing favorites from localStorage
        const existingFavorites = JSON.parse(localStorage.getItem(FAVORITE_USERS_KEY) || '[]');

        const isAlreadyFavorite = existingFavorites.some(
            (favorite: { author: string }) => favorite.author === author
        );

        if (!isAlreadyFavorite) {
            // Add to favorites
            const updatedFavorites = [...existingFavorites, {author, avatar_url: avatarUrl}];
            localStorage.setItem(FAVORITE_USERS_KEY, JSON.stringify(updatedFavorites));
            toast.success(`${author} added to favorites!`);
        } else {
            toast.info(`${author} is already in your favorites!`);
        }
    };

    if (initialLoading) return <Loader text="Loading posts..." fullScreen={true} />;

    if (error) {
        return (
            <div className="p-4 text-center">
                <p className="text-red-500 dark:text-red-400 mb-4">{error}</p>
                <button
                    onClick={refreshFeed}
                    className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md transition-colors"
                    disabled={loading}
                >
                    {loading ? 'Retrying...' : 'Retry'}
                </button>
            </div>
        );
    }

    return (
        <div>
            <h1 className="text-3xl font-bold text-center mb-8 text-gray-900 dark:text-white">Post Feed</h1>

            <InfiniteScroll
                dataLength={postsWithReplies.length} // This is important field to render the next data
                next={fetchMorePosts}
                hasMore={hasMore}
                loader={
                    <div className="text-center py-4">
                        <Loader text="Loading more posts..." spinnerSize="sm" />
                    </div>
                }
                endMessage={
                    <p className="text-center text-gray-500 dark:text-gray-400 my-8">
                        <b>You've seen all posts!</b>
                    </p>
                }
                scrollThreshold={0.9}
                pullDownToRefresh
                pullDownToRefreshThreshold={50}
                pullDownToRefreshContent={
                    <h3 className="text-center text-gray-500 dark:text-gray-400 my-4">
                        &#8595; Pull down to refresh
                    </h3>
                }
                releaseToRefreshContent={
                    <h3 className="text-center text-gray-500 dark:text-gray-400 my-4">
                        &#8593; Release to refresh
                    </h3>
                }
                refreshFunction={refreshFeed}
            >
                <PostList
                    posts={[]} // Empty array as we're using postsWithReplies
                    postsWithReplies={postsWithReplies}
                    onLike={handleLikePost}
                    onAddToFavorites={handleAddToFavorites}
                />
            </InfiniteScroll>
        </div>
    );
};

export default FeedPage;
