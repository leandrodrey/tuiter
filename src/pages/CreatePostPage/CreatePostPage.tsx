import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage, type FormikHelpers } from 'formik';
import * as Yup from 'yup';
import { apiCreateTuit } from '../../services/TuitsService.ts';

const DRAFT_STORAGE_KEY = 'post_draft';

// Define validation schema using Yup
const validationSchema = Yup.object({
  message: Yup.string()
    .required('Post content cannot be empty')
    .max(280, 'Post content cannot exceed 280 characters')
});

interface PostFormData {
  message: string;
}

const CreatePostPage: React.FC = () => {
  const [error, setError] = useState<string | null>(null);
  const [initialValues, setInitialValues] = useState<PostFormData>({ message: '' });
  const navigate = useNavigate();

  // Load draft on component mount
  useEffect(() => {
    const savedDraft = localStorage.getItem(DRAFT_STORAGE_KEY);
    if (savedDraft) {
      setInitialValues({ message: savedDraft });
    }
  }, []);

  const handleSaveDraft = (values: PostFormData) => {
    localStorage.setItem(DRAFT_STORAGE_KEY, values.message);
    alert('Draft saved successfully!');
  };

  const handleClearDraft = (resetForm: (nextState?: { values: PostFormData }) => void) => {
    localStorage.removeItem(DRAFT_STORAGE_KEY);
    resetForm({ values: { message: '' } });
    alert('Draft cleared!');
  };

  const handleSubmit = async (values: PostFormData, { setSubmitting, resetForm }: FormikHelpers<PostFormData>) => {
    try {
      setError(null);

      await apiCreateTuit({ message: values.message });

      // Clear draft after successful submission
      localStorage.removeItem(DRAFT_STORAGE_KEY);
      resetForm();

      // Redirect to feed page
      alert('Post created successfully!');
      navigate('/feed');
    } catch (err: unknown) {
      console.error('Error creating post:', err);
      const errorMessage = err instanceof Error
          ? err.message
          : (err as { response?: { data?: { message?: string } } })?.response?.data?.message || 'Failed to create post. Please try again.';
      setError(errorMessage);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="create-post-container">
      <h1>Create New Post</h1>

      {error && <div className="error-message">{error}</div>}

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        enableReinitialize
      >
        {({ isSubmitting, values, resetForm }) => (
          <Form>
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
              <ErrorMessage name="message" component="div" className="error-message" />
            </div>

            <div className="button-group">
              <button
                type="button"
                onClick={() => handleSaveDraft(values)}
                disabled={isSubmitting || !values.message.trim()}
                className="save-draft-button"
              >
                Save Draft
              </button>

              <button
                type="button"
                onClick={() => handleClearDraft(resetForm)}
                disabled={isSubmitting || !values.message.trim()}
                className="clear-draft-button"
              >
                Clear Draft
              </button>

              <button
                type="submit"
                disabled={isSubmitting || !values.message.trim()}
                className="submit-button"
              >
                {isSubmitting ? 'Posting...' : 'Post'}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default CreatePostPage;
