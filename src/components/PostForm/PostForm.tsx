import {type JSX} from 'react';
import {Formik, Form, type FormikHelpers} from 'formik';
import PostFormFields from './PostFormFields';
import PostFormActions from './PostFormActions';
import type {PostFormData} from "../../types/formTypes.ts";

interface PostFormProps {
    initialValues: PostFormData;
    validationSchema: any;
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
                <Form>
                    <PostFormFields isSubmitting={isSubmitting}/>
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
