import {useCallback} from 'react';
import type {Post} from '../../types/postTypes';

/**
 * Hook for managing post-actions like liking and toggling replies
 *
 * @param post - The post to manage actions for
 * @param onLike - Function to call when liking/unliking a post
 * @param onToggleReplies - Function to call when toggling replies visibility
 * @returns Functions for handling post actions
 */
export const usePostActions = (
    post: Post,
    onLike: (postId: number) => Promise<void>,
    onToggleReplies?: (postId: number) => void
) => {
    /**
     * Handles liking/unliking a post
     */
    const handleLike = useCallback(async () => {
        await onLike(post.id);
    }, [post.id, onLike]);

    /**
     * Handles toggling replies visibility
     */
    const handleToggleReplies = useCallback(() => {
        if (onToggleReplies) {
            onToggleReplies(post.id);
        }
    }, [onToggleReplies, post.id]);

    /**
     * Determines if the "Show Replies" button should be visible
     */
    const hasReplies = post.replies_count !== undefined && post.replies_count > 0;

    /**
     * Determines if the "No Replies" button should be visible
     */
    const hasNoReplies = post.replies_count !== undefined && post.replies_count === 0;

    return {
        handleLike,
        handleToggleReplies,
        hasReplies,
        hasNoReplies,
        isLiked: post.liked,
        likesCount: post.likes || 0,
        repliesCount: post.replies_count || 0
    };
};
