import {type JSX} from 'react';
import {Formik, Form, type FormikHelpers} from 'formik';
import type {PostFormData} from "../../types/formTypes.ts";
import type {ObjectSchema} from "yup";
import PostFormFields from './PostFormFields';
import PostFormActions from './PostFormActions';
import {Avatar} from '../UI';

interface PostFormProps {
    initialValues: PostFormData;
    validationSchema: ObjectSchema<PostFormData>;
    onSubmit: (values: PostFormData, formikHelpers: FormikHelpers<PostFormData>) => Promise<void>;
    onSaveDraft: (values: PostFormData) => void;
    onClearDraft: (resetForm: (nextState?: { values: PostFormData }) => void) => void;
    userAvatar?: string;
}

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

                            {/* Form actions */}
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
