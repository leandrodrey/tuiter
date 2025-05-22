import { useState, useEffect } from 'react';
import { apiGetFeed } from '../../services/FeedService.ts';
import { useToast } from '../context/useToast.ts';
import { usePostProcessor, type PostWithReplies } from './usePostProcessor.ts';

/**
 * Hook for managing feed posts, including fetching, pagination, and error handling
 * @returns State and functions for managing feed posts
 */
export const useFeedPosts = () => {
    const [postsWithReplies, setPostsWithReplies] = useState<PostWithReplies[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [loadingMore, setLoadingMore] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [page, setPage] = useState<number>(1);
    const [hasMore, setHasMore] = useState<boolean>(true);
    const [initialLoading, setInitialLoading] = useState<boolean>(true);

    const toast = useToast();
    const { processPostsResponse } = usePostProcessor();

    /**
     * Fetches more posts when the user scrolls to the bottom
     */
    const fetchMorePosts = async () => {
        if (!hasMore || loadingMore || loading) return;

        try {
            setError(null);
            setLoadingMore(true);

            const nextPage = page + 1;
            const response = await apiGetFeed({page: nextPage});

            if (response.length === 0) {
                setHasMore(false);
                return;
            }

            const POSTS_PER_PAGE = 10;
            if (response.length < POSTS_PER_PAGE) {
                setHasMore(false);
            }

            const newPostsWithReplies = processPostsResponse(response);

            setPostsWithReplies(prevPosts => [...prevPosts, ...newPostsWithReplies]);
            setPage(nextPage);
        } catch (err) {
            console.error('Error fetching more posts:', err);
            toast.error('Failed to load more posts. Please try again.');
        } finally {
            setLoadingMore(false);
        }
    };

    /**
     * Refreshes the feed by fetching the first page of posts
     */
    const refreshFeed = async () => {
        if (loading || loadingMore) return;

        try {
            setError(null);
            setLoading(true);
            setPage(1);
            setHasMore(true);

            const response = await apiGetFeed({page: 1});

            if (response.length === 0) {
                setHasMore(false);
                setPostsWithReplies([]);
                toast.info('No posts available at the moment.');
                return;
            }

            const POSTS_PER_PAGE = 10;
            if (response.length < POSTS_PER_PAGE) {
                setHasMore(false);
            }

            const postsWithRepliesArray = processPostsResponse(response);
            setPostsWithReplies(postsWithRepliesArray);

            toast.success('Feed refreshed successfully!');
        } catch (err) {
            console.error('Error refreshing feed:', err);
            toast.error('Failed to refresh feed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const fetchInitialPosts = async () => {
            try {
                setInitialLoading(true);
                const response = await apiGetFeed({page: 1});

                if (response.length === 0) {
                    setHasMore(false);
                    setError('No posts available at the moment.');
                    return;
                }

                const POSTS_PER_PAGE = 10;
                if (response.length < POSTS_PER_PAGE) {
                    setHasMore(false);
                }

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
    }, [processPostsResponse]);

    return {
        postsWithReplies,
        setPostsWithReplies,
        loading,
        loadingMore,
        error,
        hasMore,
        initialLoading,
        fetchMorePosts,
        refreshFeed
    };
};
