import {renderHook, act} from '@testing-library/react';
import {describe, it, expect, vi, beforeEach} from 'vitest';
import {useUserRegistration} from './useUserRegistration';
import {apiCreateUser} from '../../../services/UserService';
import {registrationInitialValues} from '../../../validations/userSchemas';

// Mock dependencies
vi.mock('../../../services/UserService', () => ({
    apiCreateUser: vi.fn()
}));

describe('useUserRegistration', () => {
    // Mock navigate and toast
    const navigate = vi.fn();
    const toast = {
        success: vi.fn(),
        error: vi.fn(),
        info: vi.fn(),
        warning: vi.fn()
    };

    // Test form values
    const testValues = {
        username: 'testuser',
        email: 'test@example.com',
        password: 'Password123!',
        confirmPassword: 'Password123!',
        avatar_url: 'https://example.com/avatar.jpg'
    };

    // Mock formik helpers
    const formikHelpers = {
        setSubmitting: vi.fn(),
        resetForm: vi.fn()
    };

    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('should return initial values', () => {
        const {result} = renderHook(() => useUserRegistration(navigate, toast));

        expect(result.current.initialValues).toEqual(registrationInitialValues);
        expect(result.current.isLoading).toBe(false);
        expect(result.current.error).toBeNull();
        expect(typeof result.current.handleSubmit).toBe('function');
    });

    it('should handle successful registration', async () => {
        // Mock successful API call
        (apiCreateUser as vi.Mock).mockResolvedValueOnce({});

        const {result} = renderHook(() => useUserRegistration(navigate, toast));

        await act(async () => {
            await result.current.handleSubmit(testValues, formikHelpers);
        });

        // Check if API was called with correct data
        expect(apiCreateUser).toHaveBeenCalledWith({
            name: testValues.username,
            email: testValues.email,
            password: testValues.password,
            avatar_url: testValues.avatar_url
        });

        // Check if success toast was shown
        expect(toast.success).toHaveBeenCalledWith('Registration successful! Please log in.');

        // Check if navigation occurred
        expect(navigate).toHaveBeenCalledWith('/login');

        // Check if loading state was handled correctly
        expect(result.current.isLoading).toBe(false);

        // Check if formik's setSubmitting was called
        expect(formikHelpers.setSubmitting).toHaveBeenCalledWith(false);
    });

    it('should handle registration error', async () => {
        // Mock API error
        const errorMessage = 'Registration failed';
        (apiCreateUser as vi.Mock).mockRejectedValueOnce(new Error(errorMessage));

        const {result} = renderHook(() => useUserRegistration(navigate, toast));

        await act(async () => {
            await result.current.handleSubmit(testValues, formikHelpers);
        });

        // Check if error toast was shown
        expect(toast.error).toHaveBeenCalledWith(errorMessage);

        // Check if error state was set
        expect(result.current.error).toBe(errorMessage);

        // Check if loading state was handled correctly
        expect(result.current.isLoading).toBe(false);

        // Check if formik's setSubmitting was called
        expect(formikHelpers.setSubmitting).toHaveBeenCalledWith(false);

        // Check that navigation was not called
        expect(navigate).not.toHaveBeenCalled();
    });

    it('should handle API error with response data', async () => {
        // Mock API error with response data
        const apiError = {
            response: {
                data: {
                    message: 'Email already exists'
                }
            }
        };
        (apiCreateUser as vi.Mock).mockRejectedValueOnce(apiError);

        const {result} = renderHook(() => useUserRegistration(navigate, toast));

        await act(async () => {
            await result.current.handleSubmit(testValues, formikHelpers);
        });

        // Check if error toast was shown with the correct message
        expect(toast.error).toHaveBeenCalledWith('Email already exists');

        // Check if error state was set correctly
        expect(result.current.error).toBe('Email already exists');
    });
});
