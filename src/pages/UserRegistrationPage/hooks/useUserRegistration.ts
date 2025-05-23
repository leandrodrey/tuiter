import {useCallback, useState} from 'react';
import type {NavigateFunction} from 'react-router-dom';
import {type FormikHelpers} from 'formik';
import {apiCreateUser} from '../../../services/UserService.ts';
import type {UserData} from '../../../types/apiTypes.ts';
import type {ToastContextType} from '../../../context/ToastContext.ts';
import type {RegistrationFormData} from "../../../types/formTypes.ts";
import {registrationInitialValues} from '../../../validations/userSchemas.ts';

interface UserRegistrationHookResult {
    initialValues: RegistrationFormData;
    isLoading: boolean;
    error: string | null;
    handleSubmit: (values: RegistrationFormData, formikHelpers: FormikHelpers<RegistrationFormData>) => Promise<void>;
}

/**
 * Custom hook for handling user registration form submission.
 * Encapsulates the logic for creating a new user account.
 *
 * @param {NavigateFunction} navigate - React Router's navigate function for redirection
 * @param {ToastContextType} toast - Toast context for displaying notifications
 * @returns {UserRegistrationHookResult} Object containing initialValues, isLoading, error, and handleSubmit function
 */
export const useUserRegistration = (
    navigate: NavigateFunction,
    toast: ToastContextType
): UserRegistrationHookResult => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    /**
     * Handles the registration form submission.
     * Processes form data, calls the API to create a user, and handles success/error states.
     *
     * @param {RegistrationFormData} values - The form values from the registration form
     * @param {FormikHelpers<RegistrationFormData>} formikHelpers - Formik helper functions
     * @returns {Promise<void>} A promise that resolves when the submission process completes
     */
    const handleSubmit = useCallback(async (
        values: RegistrationFormData,
        {setSubmitting}: FormikHelpers<RegistrationFormData>
    ) => {
        try {
            setIsLoading(true);
            setError(null);
            const {confirmPassword, username, ...rest} = values;

            // Explicitly include avatar_url to ensure it's sent to the API
            const userData: UserData = {
                name: username,
                email: rest.email,
                password: rest.password,
                avatar_url: rest.avatar_url
            };

            await apiCreateUser(userData);

            toast.success('Registration successful! Please log in.');
            navigate('/login');
        } catch (err: unknown) {
            console.error('Registration error:', err);
            const errorMessage = err instanceof Error
                ? err.message
                : (err as {
                response?: { data?: { message?: string } }
            })?.response?.data?.message || 'Registration failed. Please try again.';
            setError(errorMessage);
            toast.error(errorMessage);
        } finally {
            setIsLoading(false);
            setSubmitting(false);
        }
    }, [navigate, toast]);

    return {
        initialValues: registrationInitialValues,
        isLoading,
        error,
        handleSubmit
    };
};
