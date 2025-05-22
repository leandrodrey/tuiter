import {useState, useEffect, type JSX} from 'react';
import {useNavigate} from 'react-router-dom';
import {type FormikHelpers} from 'formik';
import {apiCreateTuit} from '../../services/TuitsService.ts';
import {useToast} from "../../hooks/useToast.ts";
import {DRAFT_STORAGE_KEY} from '../../constants/storageConstants';
import {createPostValidationSchema as validationSchema, type PostFormData, createPostEmptyValues as emptyValues} from '../../validations/postSchemas';
import PostForm from '../../components/PostForm/PostForm';

const CreatePostPage = (): JSX.Element => {
    const [initialValues, setInitialValues] = useState<PostFormData>(emptyValues);
    const navigate = useNavigate();
    const toast = useToast();

    // Load draft on component mount
    useEffect(() => {
        const savedDraft = localStorage.getItem(DRAFT_STORAGE_KEY);
        if (savedDraft) {
            setInitialValues({message: savedDraft});
        }
    }, []);

    const handleSaveDraft = (values: PostFormData) => {
        localStorage.setItem(DRAFT_STORAGE_KEY, values.message);
        toast.success('Draft saved successfully!');
    };

    const handleClearDraft = (resetForm: (nextState?: { values: PostFormData }) => void) => {
        localStorage.removeItem(DRAFT_STORAGE_KEY);
        resetForm({values: emptyValues});
        toast.info('Draft cleared!');
    };

    const handleSubmit = async (values: PostFormData, {setSubmitting, resetForm}: FormikHelpers<PostFormData>) => {
        try {
            await apiCreateTuit({message: values.message});

            // Clear draft after successful submission
            localStorage.removeItem(DRAFT_STORAGE_KEY);
            resetForm();

            // Show success notification and redirect to feed page
            toast.success('Post created successfully!');
            navigate('/feed');
        } catch (err: unknown) {
            console.error('Error creating post:', err);
            const errorMessage = err instanceof Error
                ? err.message
                : (err as {
                response?: { data?: { message?: string } }
            })?.response?.data?.message || 'Failed to create post. Please try again.';
            toast.error(errorMessage);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="create-post-container">
            <h1>Create New Post</h1>

            <PostForm
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
                onSaveDraft={handleSaveDraft}
                onClearDraft={handleClearDraft}
            />
        </div>
    );
};

export default CreatePostPage;
