import {useContext} from 'react';
import {PostContext, type PostContextType} from '../context/PostContext.ts';

/**
 * Custom hook to access the post context.
 * Provides access to post data and post-related functions.
 * Must be used within a PostProvider component.
 *
 * @returns {PostContextType} The post context value
 * @throws {Error} If used outside of a PostProvider
 */
export const usePostContext = (): PostContextType => {
    const context = useContext(PostContext);
    if (!context) {
        throw new Error('usePostContext must be used within a PostProvider');
    }
    return context;
};
