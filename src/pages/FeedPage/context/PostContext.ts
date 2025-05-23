import {createContext} from 'react';
import type {PostWithReplies} from '../../../hooks/post-feed/usePostProcessor.ts';

/**
 * Type definition for the Post context
 */
export interface PostContextType {
    posts: PostWithReplies[];
    loading: boolean;
    error: string | null;
    hasMore: boolean;
    initialLoading: boolean;
    fetchMorePosts: () => Promise<void>;
    refreshFeed: () => Promise<void>;
    handleLikePost: (postId: number) => Promise<void>;
    handleAddToFavorites: (author: string, avatarUrl: string) => void;
}

/**
 * React context for post-related state and operations.
 * Provides post-data and functions to interact with posts.
 */
export const PostContext = createContext<PostContextType | undefined>(undefined);
