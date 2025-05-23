import {createContext} from 'react';
import type {Post} from '../../../types/postTypes';
import type {PostFormData, ReplyFormData} from '../../../types/formTypes';
import type {FormikHelpers} from 'formik';
import type {ObjectSchema} from 'yup';

/**
 * Type definition for the PostReply context
 */
export interface PostReplyContextType {
    replies: Post[];
    isLoading: boolean;
    error: string | null;
    handleSubmit: (values: PostFormData, formikHelpers: FormikHelpers<PostFormData>) => Promise<void>;
    handleSaveDraft: (values: PostFormData) => void;
    handleClearDraft: (resetForm: (nextState?: { values: PostFormData }) => void) => void;
    handleLikePost: (postId: number) => Promise<void>;
    userAvatar?: string;
    validationSchema: ObjectSchema<PostFormData>;
    initialValues: ReplyFormData;
}

/**
 * React context for post-reply-related state and operations.
 * Provides replies data and functions to interact with replies.
 */
export const PostReplyContext = createContext<PostReplyContextType | undefined>(undefined);
