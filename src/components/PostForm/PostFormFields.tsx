import {type JSX} from 'react';
import {Field, ErrorMessage} from 'formik';

interface PostFormFieldsProps {
    isSubmitting: boolean;
}

const PostFormFields = ({isSubmitting}: PostFormFieldsProps): JSX.Element => {
    return (
        <>
            <Field
                as="textarea"
                id="message"
                name="message"
                className="bg-transparent text-gray-400 font-medium text-lg w-full"
                rows="2"
                cols="50"
                placeholder="What's happening?"
                disabled={isSubmitting}
            />
            <ErrorMessage
                name="message"
                component="div"
                className="mt-1 text-sm text-red-600"
            />
        </>
    );
};

export default PostFormFields;
