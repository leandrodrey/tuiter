import {useState, useEffect, useCallback} from 'react';
import {useNavigate} from 'react-router-dom';
import {type FormikHelpers} from 'formik';
import {apiCreateTuit} from '../../services/TuitsService.ts';
import {useToast} from "../context/useToast.ts";
import {
    createPostEmptyValues as emptyValues
} from '../../validations/postSchemas';
import type {PostFormData} from "../../types/formTypes.ts";
import {loadDraft, saveDraft, clearDraft} from '../../utils/draftUtils';

/**
 * Custom hook for handling post creation functionality.
 * Encapsulates the logic for creating posts, saving drafts, and form submission.
 *
 * @returns {Object} Post creation methods and state
 * @returns {PostFormData} initialValues - The initial values for the post form
 * @returns {Function} handleSubmit - Function to handle form submission
 * @returns {Function} handleSaveDraft - Function to save the current form as a draft
 * @returns {Function} handleClearDraft - Function to clear the saved draft
 */
export const usePostCreation = () => {
    const [initialValues, setInitialValues] = useState<PostFormData>(emptyValues);
    const navigate = useNavigate();
    const toast = useToast();

    // Load draft on hook initialization
    useEffect(() => {
        const savedDraft = loadDraft();
        if (savedDraft) {
            setInitialValues({message: savedDraft});
        }
    }, []);

    /**
     * Handles saving the current form values as a draft.
     * Stores the draft in localStorage and displays a success message.
     *
     * @param {PostFormData} values - The form values to save as a draft
     */
    const handleSaveDraft = useCallback((values: PostFormData) => {
        saveDraft(values);
        toast.success('Draft saved successfully!');
    }, [toast]);

    /**
     * Handles clearing the saved draft.
     * Removes the draft from localStorage, resets the form, and displays a notification.
     *
     * @param {Function} resetForm - Formik's resetForm function to reset the form values
     */
    const handleClearDraft = useCallback((resetForm: (nextState?: { values: PostFormData }) => void) => {
        clearDraft();
        resetForm({values: emptyValues});
        toast.info('Draft cleared!');
    }, [toast]);

    /**
     * Handles the post creation form submission.
     * Creates a new post, clears the draft, and navigates to the home page on success.
     * Displays appropriate success or error messages.
     *
     * @param {PostFormData} values - The form values containing the post message
     * @param {FormikHelpers<PostFormData>} formikHelpers - Formik helper functions
     * @returns {Promise<void>} A promise that resolves when the submission process completes
     */
    const handleSubmit = useCallback(async (
        values: PostFormData,
        {setSubmitting, resetForm}: FormikHelpers<PostFormData>
    ) => {
        try {
            await apiCreateTuit({message: values.message});
            clearDraft();
            resetForm();

            toast.success('Post created successfully!');
            navigate('/');
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
    }, [navigate, toast]);

    return {
        initialValues,
        handleSubmit,
        handleSaveDraft,
        handleClearDraft
    };
};
