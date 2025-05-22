import {type JSX} from 'react';
import {Field, ErrorMessage} from 'formik';

interface PostFormFieldsProps {
    isSubmitting: boolean;
}

const PostFormFields = ({isSubmitting}: PostFormFieldsProps): JSX.Element => {
    return (
        <div className="form-group">
            <label htmlFor="message">What's on your mind?</label>
            <Field
                as="textarea"
                id="message"
                name="message"
                rows={6}
                placeholder="Write your post here..."
                disabled={isSubmitting}
            />
            <ErrorMessage name="message" component="div" className="error-message"/>
        </div>
    );
};

export default PostFormFields;
