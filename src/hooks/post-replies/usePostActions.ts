import {useCallback} from 'react';
import type {Post} from '../../types/postTypes';

/**
 * Hook for managing post-actions like liking
 *
 * @param post - The post to manage actions for
 * @param onLike - Function to call when liking/unliking a post
 * @returns Functions for handling post actions
 */
export const usePostActions = (
    post: Post,
    onLike: (postId: number) => Promise<void>
) => {
    /**
     * Handles liking/unliking a post
     */
    const handleLike = useCallback(async () => {
        await onLike(post.id);
    }, [post.id, onLike]);

    return {
        handleLike,
        isLiked: post.liked,
        likesCount: post.likes || 0
    };
};
