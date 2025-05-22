import { useCallback } from 'react';
import type { Post } from '../types/postTypes';

export interface PostWithReplies {
    post: Post;
    replies: Post[];
}

/**
 * Hook for processing posts into a hierarchical structure
 * @returns Functions for processing posts
 */
export const usePostProcessor = () => {
    /**
     * Processes a flat array of posts into a hierarchical structure with parent posts and replies
     * @param posts The flat array of posts from the API
     * @returns An array of PostWithReplies objects
     */
    const processPostsResponse = useCallback((posts: Post[]): PostWithReplies[] => {
        const parentPosts: Post[] = [];
        const repliesByParentId: Record<number, Post[]> = {};

        // First pass: separate parent posts and replies
        posts.forEach(post => {
            if (post.parent_id === 0) {
                // This is a parent post
                parentPosts.push(post);
            } else {
                // This is a reply
                if (!repliesByParentId[post.parent_id]) {
                    repliesByParentId[post.parent_id] = [];
                }
                repliesByParentId[post.parent_id].push(post);
            }
        });

        // Second pass: create PostWithReplies objects
        return parentPosts.map(post => ({
            post,
            replies: repliesByParentId[post.id] || []
        }));
    }, []);

    return {
        processPostsResponse
    };
};
