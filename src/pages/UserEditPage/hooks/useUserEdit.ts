import {useCallback, useState, useEffect} from 'react';
import type {NavigateFunction} from 'react-router-dom';
import {type FormikHelpers} from 'formik';
import {apiGetProfile} from '../../../services/ProfileService.ts';
import type {ProfileData} from '../../../types/apiTypes.ts';
import type {ToastContextType} from '../../../context/ToastContext.ts';
import type {UserFormData} from "../../../types/formTypes.ts";
import {useUser} from '../../../hooks/context/useUser.ts';

interface UserEditHookResult {
    initialValues: UserFormData;
    isLoading: boolean;
    error: string | null;
    handleSubmit: (values: UserFormData, formikHelpers: FormikHelpers<UserFormData>) => Promise<void>;
}

/**
 * Custom hook for handling user edit form.
 * Encapsulates the logic for fetching user data and updating the user profile.
 *
 * @param {NavigateFunction} navigate - React Router's navigate function for redirection
 * @param {ToastContextType} toast - Toast context for displaying notifications
 * @returns {UserEditHookResult} Object containing initialValues, isLoading, error, and handleSubmit function
 */
export const useUserEdit = (
    navigate: NavigateFunction,
    toast: ToastContextType
): UserEditHookResult => {
    const {updateUserInformation} = useUser();
    const [initialValues, setInitialValues] = useState<UserFormData>({
        name: '',
        email: '',
        avatar_url: '',
        password: '',
        confirmPassword: ''
    });
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    // Fetch user data on mount
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                setIsLoading(true);
                setError(null);

                const profile = await apiGetProfile();

                // In a real app, you'd get the email from the profile response
                // For now, we'll mock it
                setInitialValues({
                    name: profile.name,
                    email: profile.email || `user_${profile.id}@example.com`, // Mock email if not provided
                    avatar_url: profile.avatar_url || '',
                    password: '',
                    confirmPassword: ''
                });
            } catch (err: unknown) {
                console.error('Error fetching user data:', err);
                const errorMessage = err instanceof Error
                    ? err.message
                    : (err as {
                    response?: { data?: { message?: string } }
                })?.response?.data?.message || 'Failed to load user data. Please try again.';
                setError(errorMessage);
                toast.error(errorMessage);
            } finally {
                setIsLoading(false);
            }
        };

        fetchUserData();
    }, [toast]);

    /**
     * Handles the user edit form submission.
     * Processes form data, calls the API to update the user profile, and handles success/error states.
     *
     * @param {UserFormData} values - The form values from the user edit form
     * @param {FormikHelpers<UserFormData>} formikHelpers - Formik helper functions
     * @returns {Promise<void>} A promise that resolves when the submission process completes
     */
    const handleSubmit = useCallback(async (
        values: UserFormData,
        {setSubmitting}: FormikHelpers<UserFormData>
    ) => {
        try {
            setError(null);

            // Only include password in the request if it's being changed
            const profileData: ProfileData = {
                name: values.name,
                avatar_url: values.avatar_url
            };

            if (values.password) {
                profileData.password = values.password;
            }

            // Use updateUserInformation from UserProvider to update both backend and context state
            await updateUserInformation(profileData);

            navigate('/'); // Redirect to home page
        } catch (err: unknown) {
            console.error('Update error:', err);
            const errorMessage = err instanceof Error
                ? err.message
                : (err as {
                response?: { data?: { message?: string } }
            })?.response?.data?.message || 'Update failed. Please try again.';
            setError(errorMessage);
            toast.error(errorMessage);
        } finally {
            setSubmitting(false);
        }
    }, [navigate, toast, updateUserInformation]);

    return {
        initialValues,
        isLoading,
        error,
        handleSubmit
    };
};
