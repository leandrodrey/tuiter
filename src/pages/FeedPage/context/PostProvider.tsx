import {type ReactNode, type JSX} from 'react';
import {PostContext} from './PostContext.ts';
import {useFeedPosts} from '../hooks/useFeedPosts.ts';
import {usePostInteractions} from '../../../hooks/post-feed/usePostInteractions.ts';

interface PostProviderProps {
    children: ReactNode;
}

/**
 * Provider component for the Post context.
 * Manages post-data and interactions, making them available to child components.
 *
 * @param {PostProviderProps} props - Component props
 * @returns {JSX.Element} Provider component with post-context
 */
export const PostProvider = ({children}: PostProviderProps): JSX.Element => {
    const {
        postsWithReplies: posts,
        setPostsWithReplies: setPosts,
        loading,
        error,
        hasMore,
        initialLoading,
        fetchMorePosts,
        refreshFeed
    } = useFeedPosts();

    const {
        handleLikePost,
        handleAddToFavorites
    } = usePostInteractions(posts, setPosts);

    const contextValue = {
        posts,
        loading,
        error,
        hasMore,
        initialLoading,
        fetchMorePosts,
        refreshFeed,
        handleLikePost,
        handleAddToFavorites
    };

    return (
        <PostContext.Provider value={contextValue}>
            {children}
        </PostContext.Provider>
    );
};
