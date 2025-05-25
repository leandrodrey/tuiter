import {useState, useEffect, useCallback} from 'react';
import {apiGetFeed} from '../../../services/FeedService.ts';
import {useToast} from '../../../hooks/context/useToast.ts';
import type {Post} from '../../../types/postTypes';

const POSTS_PER_PAGE = 10;

/**
 * Hook for managing feed posts, including fetching, pagination, and error handling
 * @returns State and functions for managing feed posts
 */
export const useFeedPosts = () => {
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [loadingMore, setLoadingMore] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [page, setPage] = useState<number>(1);
    const [hasMore, setHasMore] = useState<boolean>(true);
    const [initialLoading, setInitialLoading] = useState<boolean>(true);

    const toast = useToast();

    /**
     * Handles the API response and updates state accordingly
     * @param response The API response
     * @param isInitialLoad Whether this is the initial load
     * @param isRefresh Whether this is a refresh operation
     * @returns Posts from the API
     */
    const handleApiResponse = useCallback((
        response: Post[],
        isInitialLoad = false,
        isRefresh = false
    ): Post[] => {
        if (response.length === 0) {
            setHasMore(false);

            if (isInitialLoad) {
                setError('No posts available at the moment.');
            } else if (isRefresh) {
                setPosts([]);
                toast.info('No posts available at the moment.');
            }
            return [];
        }

        if (response.length < POSTS_PER_PAGE) {
            setHasMore(false);
        }

        return response;
    }, [toast]);

    /**
     * Common function to fetch posts with error handling
     * @param pageNumber The page number to fetch
     * @param options Additional options for the fetch operation
     * @returns The processed posts or null on error
     */
    const fetchPosts = useCallback(async (
        pageNumber: number,
        options: {
            isLoadingMore?: boolean;
            isRefresh?: boolean;
            isInitialLoad?: boolean;
        } = {}
    ) => {
        const {isLoadingMore = false, isRefresh = false, isInitialLoad = false} = options;

        // Set appropriate loading state
        if (isInitialLoad) {
            setInitialLoading(true);
        } else if (isLoadingMore) {
            setLoadingMore(true);
        } else if (isRefresh) {
            setLoading(true);
        }

        try {
            setError(null);
            const response = await apiGetFeed({page: pageNumber, only_parents: true});
            const processedPosts = handleApiResponse(response, isInitialLoad, isRefresh);
            if (isRefresh && processedPosts.length > 0) {
                toast.success('Feed refreshed successfully!');
            }
            return processedPosts;
        } catch (err) {
            console.error(`Error ${isLoadingMore ? 'fetching more posts' : isRefresh ? 'refreshing feed' : 'fetching posts'}:`, err);

            if (isInitialLoad) {
                setError('Failed to load posts. Please try again later.');
            } else if (isLoadingMore) {
                toast.error('Failed to load more posts. Please try again.');
            } else if (isRefresh) {
                toast.error('Failed to refresh feed. Please try again.');
            }
            return null;
        } finally {
            if (isInitialLoad) {
                setInitialLoading(false);
            } else if (isLoadingMore) {
                setLoadingMore(false);
            } else if (isRefresh) {
                setLoading(false);
            }
        }
    }, [handleApiResponse, toast]);

    /**
     * Fetches more posts when the user scrolls to the bottom
     */
    const fetchMorePosts = useCallback(async () => {
        if (!hasMore || loadingMore || loading) return;

        const nextPage = page + 1;
        const newPosts = await fetchPosts(nextPage, {isLoadingMore: true});

        if (newPosts) {
            setPosts(prevPosts => [...prevPosts, ...newPosts]);
            setPage(nextPage);
        }
    }, [fetchPosts, hasMore, loadingMore, loading, page]);

    /**
     * Refreshes the feed by fetching the first page of posts
     */
    const refreshFeed = useCallback(async () => {
        if (loading || loadingMore) return;

        setPage(1);
        setHasMore(true);

        const refreshedPosts = await fetchPosts(1, {isRefresh: true});

        if (refreshedPosts) {
            setPosts(refreshedPosts);
        }
    }, [fetchPosts, loading, loadingMore]);

    useEffect(() => {
        const fetchInitialPosts = async () => {
            const initialPosts = await fetchPosts(1, {isInitialLoad: true});

            if (initialPosts) {
                setPosts(initialPosts);
            }
        };

        fetchInitialPosts();
    }, [fetchPosts]);

    return {
        posts,
        setPosts,
        loading,
        loadingMore,
        error,
        hasMore,
        initialLoading,
        fetchMorePosts,
        refreshFeed
    };
};
