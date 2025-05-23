import {useContext} from 'react';
import {PostReplyContext, type PostReplyContextType} from '../context/PostReplyContext';

/**
 * Custom hook to access the post reply context.
 * Provides access to post reply data and post-reply-related functions.
 * Must be used within a PostReplyProvider component.
 *
 * @returns {PostReplyContextType} The post reply context value
 * @throws {Error} If used outside of a PostReplyProvider
 */
export const usePostReplyContext = (): PostReplyContextType => {
    const context = useContext(PostReplyContext);
    if (!context) {
        throw new Error('usePostReplyContext must be used within a PostReplyProvider');
    }
    return context;
};
