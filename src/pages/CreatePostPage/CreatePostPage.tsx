import {useState, useEffect, type JSX} from 'react';
import {useNavigate} from 'react-router-dom';
import {type FormikHelpers} from 'formik';
import {apiCreateTuit} from '../../services/TuitsService.ts';
import {useToast} from "../../hooks/useToast.ts";
import {
    createPostValidationSchema as validationSchema,
    createPostEmptyValues as emptyValues
} from '../../validations/postSchemas';
import PostForm from '../../components/PostForm/PostForm';
import type {PostFormData} from "../../types/formTypes.ts";
import {loadDraft, saveDraft, clearDraft} from '../../utils/draftUtils';

const CreatePostPage = (): JSX.Element => {
    const [initialValues, setInitialValues] = useState<PostFormData>(emptyValues);
    const navigate = useNavigate();
    const toast = useToast();

    // Load draft on component mount
    useEffect(() => {
        const savedDraft = loadDraft();
        if (savedDraft) {
            setInitialValues({message: savedDraft});
        }
    }, []);

    const handleSaveDraft = (values: PostFormData) => {
        saveDraft(values);
        toast.success('Draft saved successfully!');
    };

    const handleClearDraft = (resetForm: (nextState?: { values: PostFormData }) => void) => {
        clearDraft();
        resetForm({values: emptyValues});
        toast.info('Draft cleared!');
    };

    const handleSubmit = async (values: PostFormData, {setSubmitting, resetForm}: FormikHelpers<PostFormData>) => {
        try {
            await apiCreateTuit({message: values.message});
            clearDraft();
            resetForm();

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
