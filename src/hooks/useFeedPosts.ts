import { useState, useEffect } from 'react';
import { apiGetFeed } from '../services/FeedService';
import { useToast } from './useToast';
import { usePostProcessor, type PostWithReplies } from './usePostProcessor';

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
        // Prevent concurrent fetches and don't fetch if there are no more posts
        if (!hasMore || loadingMore || loading) return;

        try {
            // Clear any previous errors
            setError(null);
            setLoadingMore(true);

            const nextPage = page + 1;
            const response = await apiGetFeed({page: nextPage});

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
                const response = await apiGetFeed({page: 1});

                // If no posts are returned, set hasMore to false
                if (response.length === 0) {
                    setHasMore(false);
                    setError('No posts available at the moment.');
                    return;
                }

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
