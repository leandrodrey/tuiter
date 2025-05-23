import {type JSX} from 'react';
import {Formik, Form, type FormikHelpers} from 'formik';
import type {PostFormData} from "../../types/formTypes.ts";
import type {ObjectSchema} from "yup";
import PostFormFields from './PostFormFields';
import PostFormActions from './PostFormActions';
import {Avatar} from '../UI';

/**
 * Props for the PostForm component
 * @interface PostFormProps
 * @property {PostFormData} initialValues - Initial values for the form
 * @property {ObjectSchema<PostFormData>} validationSchema - Yup validation schema for the form
 * @property {Function} onSubmit - Function to handle form submission
 * @property {Function} onSaveDraft - Function to save the current form state as a draft
 * @property {Function} onClearDraft - Function to clear the current draft
 * @property {string} [userAvatar] - URL of the user's avatar image
 */
interface PostFormProps {
    initialValues: PostFormData;
    validationSchema: ObjectSchema<PostFormData>;
    onSubmit: (values: PostFormData, formikHelpers: FormikHelpers<PostFormData>) => Promise<void>;
    onSaveDraft: (values: PostFormData) => void;
    onClearDraft: (resetForm: (nextState?: { values: PostFormData }) => void) => void;
    userAvatar?: string;
}

/**
 * A form component for creating or replying to posts.
 * Uses Formik for form state management and validation.
 * Includes fields for the post content and action buttons for submitting, saving drafts, etc.
 *
 * @param {PostFormProps} props - Component props
 * @returns {JSX.Element} The post form component
 */
const PostForm = ({
    initialValues,
    validationSchema,
    onSubmit,
    onSaveDraft,
    onClearDraft,
    userAvatar = 'https://pbs.twimg.com/profile_images/1121328878142853120/e-rpjoJi_bigger.png'
}: PostFormProps): JSX.Element => {
    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
            enableReinitialize
        >
            {({isSubmitting, values, resetForm}) => {

                return (
                    <Form>
                        <div className="border-b border-gray-800">
                            <div className="flex">
                                <div className="m-2 py-1">
                                    <Avatar username="User" avatarUrl={userAvatar} />
                                </div>
                                <div className="flex-1 px-2 pt-2 mt-2">
                                    <PostFormFields isSubmitting={isSubmitting} />
                                </div>
                            </div>

                            <PostFormActions
                                isSubmitting={isSubmitting}
                                values={values}
                                resetForm={resetForm}
                                onSaveDraft={onSaveDraft}
                                onClearDraft={onClearDraft}
                            />
                        </div>
                    </Form>
                );
            }}
        </Formik>
    );
};

export default PostForm;
