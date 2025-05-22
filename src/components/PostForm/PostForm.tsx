import {type JSX} from 'react';
import {Formik, Form, type FormikHelpers} from 'formik';
import PostFormFields from './PostFormFields';
import PostFormActions from './PostFormActions';
import MediaButtons from '../UI/MediaButtons';
import type {PostFormData} from "../../types/formTypes.ts";
import type {ObjectSchema} from "yup";

interface PostFormProps {
    initialValues: PostFormData;
    validationSchema: ObjectSchema<PostFormData>;
    onSubmit: (values: PostFormData, formikHelpers: FormikHelpers<PostFormData>) => Promise<void>;
    onSaveDraft: (values: PostFormData) => void;
    onClearDraft: (resetForm: (nextState?: { values: PostFormData }) => void) => void;
}

const PostForm = ({
    initialValues,
    validationSchema,
    onSubmit,
    onSaveDraft,
    onClearDraft
}: PostFormProps): JSX.Element => {
    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
            enableReinitialize
        >
            {({isSubmitting, values, resetForm}) => (
                <Form className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4 md:p-6 transition-all">
                    <PostFormFields isSubmitting={isSubmitting}/>
                    <MediaButtons/>
                    <PostFormActions
                        isSubmitting={isSubmitting}
                        values={values}
                        resetForm={resetForm}
                        onSaveDraft={onSaveDraft}
                        onClearDraft={onClearDraft}
                    />
                </Form>
            )}
        </Formik>
    );
};

export default PostForm;
