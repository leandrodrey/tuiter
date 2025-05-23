import {useState, useCallback} from 'react';
import {apiGetTuitReplies} from '../../services/TuitsService';
import type {Post} from '../../types/postTypes';

/**
 * Hook for managing post replies visibility and fetching
 *
 * @param postId - The ID of the post to fetch replies for
 * @param initialReplies - Initial replies to the post, if any
 * @returns State and functions for managing post replies
 */
export const usePostReplies = (postId: number, initialReplies: Post[] = []) => {
    const [showReplies, setShowReplies] = useState<boolean>(initialReplies.length > 0);
    const [replies, setReplies] = useState<Post[]>(initialReplies);
    const [loadingReplies, setLoadingReplies] = useState<boolean>(false);

    /**
     * Toggles the visibility of replies and fetches them if needed
     * @param id - Optional post ID, defaults to the postId provided to the hook
     */
    const handleToggleReplies = useCallback(async (id?: number) => {
        const currentPostId = id || postId;

        // Toggle replies visibility
        if (showReplies) {
            setShowReplies(false);
            return;
        }

        // If we already have replies, just show them
        if (replies.length > 0) {
            setShowReplies(true);
            return;
        }

        // Otherwise, fetch replies
        setLoadingReplies(true);
        try {
            const fetchedReplies = await apiGetTuitReplies(currentPostId);
            setReplies(fetchedReplies);
            setShowReplies(true);
        } catch (error) {
            console.error('Error fetching replies:', error);
        } finally {
            setLoadingReplies(false);
        }
    }, [postId, showReplies, replies]);

    return {
        showReplies,
        replies,
        loadingReplies,
        handleToggleReplies
    };
};
