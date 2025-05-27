import * as Yup from 'yup';
import type {PostFormData, ReplyFormData} from '../types/formTypes';

/**
 * Validation schema for creating a new post
 */
export const createPostValidationSchema = Yup.object({
    message: Yup.string()
        .required('Post content cannot be empty')
        .max(280, 'Post content cannot exceed 280 characters')
});

/**
 * Initial empty values for the create post form
 */
export const createPostEmptyValues: PostFormData = {
    message: ''
};

/**
 * Validation schema for replying to a post
 */
export const replyValidationSchema = Yup.object({
    message: Yup.string()
        .required('Reply content cannot be empty')
        .max(280, 'Reply cannot exceed 280 characters')
});

/**
 * Initial empty values for the reply form
 */
export const replyInitialValues: ReplyFormData = {
    message: ''
};
