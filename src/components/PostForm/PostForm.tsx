import {type JSX} from 'react';
import {Formik, Form, type FormikHelpers} from 'formik';
import PostFormFields from './PostFormFields';
import PostFormActions from './PostFormActions';
import type {PostFormData} from "../../types/formTypes.ts";
import type {ObjectSchema} from "yup";

interface PostFormProps {
    initialValues: PostFormData;
    validationSchema: ObjectSchema<PostFormData>;
    onSubmit: (values: PostFormData, formikHelpers: FormikHelpers<PostFormData>) => Promise<void>;
    onSaveDraft: (values: PostFormData) => void;
    onClearDraft: (resetForm: (nextState?: { values: PostFormData }) => void) => void;
}

// Media attachment buttons (visual only)
const MediaButtons = () => (
    <div className="flex items-center space-x-4 py-3 border-t border-gray-200 dark:border-gray-700 mt-2 mb-3">
        <button
            type="button"
            className="text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
            title="Add image"
        >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
            </svg>
        </button>
        <button
            type="button"
            className="text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
            title="Add GIF"
        >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z" />
            </svg>
        </button>
        <button
            type="button"
            className="text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
            title="Add poll"
        >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
            </svg>
        </button>
        <button
            type="button"
            className="text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
            title="Add emoji"
        >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 100-2 1 1 0 000 2zm7-1a1 1 0 11-2 0 1 1 0 012 0zm-.464 5.535a1 1 0 10-1.415-1.414 3 3 0 01-4.242 0 1 1 0 00-1.415 1.414 5 5 0 007.072 0z" clipRule="evenodd" />
            </svg>
        </button>
        <button
            type="button"
            className="text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
            title="Schedule post"
        >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
            </svg>
        </button>
        <button
            type="button"
            className="text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
            title="Add location"
        >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
            </svg>
        </button>
    </div>
);

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
                    <MediaButtons />
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
