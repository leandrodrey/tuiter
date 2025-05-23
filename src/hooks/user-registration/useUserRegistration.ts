import {useCallback} from 'react';
import type {NavigateFunction} from 'react-router-dom';
import {type FormikHelpers} from 'formik';
import {apiCreateUser, type UserData} from '../../services/UserService.ts';
import type {ToastContextType} from '../../context/ToastContext.ts';
import type {RegistrationFormData} from "../../types/formTypes.ts";

/**
 * Custom hook for handling user registration form submission.
 * Encapsulates the logic for creating a new user account.
 *
 * @param {NavigateFunction} navigate - React Router's navigate function for redirection
 * @param {ToastContextType} toast - Toast context for displaying notifications
 * @returns {Function} handleSubmit function for registration form submission
 */
export const useUserRegistration = (
    navigate: NavigateFunction,
    toast: ToastContextType
) => {
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
            const {confirmPassword, username, ...rest} = values;

            const userData: UserData = {
                name: username,
                ...rest
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
            toast.error(errorMessage);
        } finally {
            setSubmitting(false);
        }
    }, [navigate, toast]);

    return handleSubmit;
};
