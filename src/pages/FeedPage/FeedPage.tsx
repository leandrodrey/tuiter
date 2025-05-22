import {useEffect, useState, type JSX} from 'react';
import {apiGetFeed} from '../../services/FeedService.ts';
import {apiAddLikeToTuit, apiRemoveLikeFromTuit} from '../../services/TuitsService.ts';
import {FAVORITE_USERS_KEY} from '../../constants/storageConstants';
import type {Post} from '../../types/postTypes';
import PostList from '../../components/Post/PostList';
import {useToast} from "../../hooks/useToast.ts";
import Loader from '../../components/UI/Loader';

interface PostWithReplies {
    post: Post;
    replies: Post[];
}

const FeedPage = (): JSX.Element => {
    const [postsWithReplies, setPostsWithReplies] = useState<PostWithReplies[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
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

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                setLoading(true);
                const response = await apiGetFeed({page: 1});

                // Process the response to organize posts
                const postsWithRepliesArray = processPostsResponse(response);
                setPostsWithReplies(postsWithRepliesArray);
            } catch (err) {
                setError('Failed to load posts. Please try again later.');
                console.error('Error fetching posts:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchPosts();
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

    if (loading) return <Loader text="Loading posts..." fullScreen={true} />;
    if (error) return <div className="p-4 text-red-500 dark:text-red-400 text-center">{error}</div>;

    return (
        <div>
            <h1 className="text-3xl font-bold text-center mb-8 text-gray-900 dark:text-white">Post Feed</h1>
            <PostList
                posts={[]} // Empty array as we're using postsWithReplies
                postsWithReplies={postsWithReplies}
                onLike={handleLikePost}
                onAddToFavorites={handleAddToFavorites}
            />
        </div>
    );
};

export default FeedPage;
