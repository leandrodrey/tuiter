import * as Yup from 'yup';
import type {PostFormData, ReplyFormData} from '../types/formTypes';

// --- Create Post Form ---
export const createPostValidationSchema = Yup.object({
    message: Yup.string()
        .required('Post content cannot be empty')
        .max(280, 'Post content cannot exceed 280 characters')
});

export const createPostEmptyValues: PostFormData = {
    message: ''
};

// --- Post Reply Form ---
export const replyValidationSchema = Yup.object({
    message: Yup.string()
        .required('Reply content cannot be empty')
        .max(280, 'Reply cannot exceed 280 characters')
});

export const replyInitialValues: ReplyFormData = {
    message: ''
};
