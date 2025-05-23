import {type ReactNode, type JSX} from 'react';
import {PostReplyContext} from './PostReplyContext';
import {usePostReplies} from '../hooks/usePostReplies';

interface PostReplyProviderProps {
    children: ReactNode;
}

/**
 * Provider component for the PostReply context.
 * Manages post-reply data and interactions, making them available to child components.
 *
 * @param {PostReplyProviderProps} props - Component props
 * @returns {JSX.Element} Provider component with post-reply context
 */
export const PostReplyProvider = ({children}: PostReplyProviderProps): JSX.Element => {
    const {
        replies,
        isLoading,
        error,
        handleSubmit,
        handleSaveDraft,
        handleClearDraft,
        handleLikePost,
        validationSchema,
        initialValues,
        userAvatar
    } = usePostReplies();

    const contextValue = {
        replies,
        isLoading,
        error,
        handleSubmit,
        handleSaveDraft,
        handleClearDraft,
        handleLikePost,
        validationSchema,
        initialValues,
        userAvatar
    };

    return (
        <PostReplyContext.Provider value={contextValue}>
            {children}
        </PostReplyContext.Provider>
    );
};
