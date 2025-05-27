import {renderHook, act} from '@testing-library/react';
import {describe, it, expect, vi, beforeEach} from 'vitest';
import {useUserEdit} from './useUserEdit';
import {apiGetProfile} from '../../../services/ProfileService';
import {useUser} from '../../../hooks/context/useUser';

// Mock dependencies
vi.mock('../../../services/ProfileService', () => ({
    apiGetProfile: vi.fn()
}));

vi.mock('../../../hooks/context/useUser', () => ({
    useUser: vi.fn()
}));

describe('useUserEdit', () => {
    // Mock navigate and toast
    const navigate = vi.fn();
    const toast = {
        success: vi.fn(),
        error: vi.fn(),
        info: vi.fn(),
        warning: vi.fn()
    };

    // Mock updateUserInformation function
    const updateUserInformation = vi.fn();

    // Mock profile data
    const mockProfile = {
        id: 1,
        name: 'Test User',
        email: 'test@example.com',
        avatar_url: 'https://example.com/avatar.jpg'
    };

    // Test form values
    const testValues = {
        name: 'Updated User',
        email: 'test@example.com',
        avatar_url: 'https://example.com/new-avatar.jpg',
        password: 'NewPassword123!',
        confirmPassword: 'NewPassword123!'
    };

    // Mock formik helpers
    const formikHelpers = {
        setSubmitting: vi.fn(),
        resetForm: vi.fn()
    };

    beforeEach(() => {
        vi.clearAllMocks();

        // Setup useUser mock
        (useUser as vi.Mock).mockReturnValue({
            updateUserInformation
        });

        // Setup apiGetProfile mock
        (apiGetProfile as vi.Mock).mockResolvedValue(mockProfile);
    });

    it('should fetch user data on mount', async () => {
        const {result} = renderHook(() => useUserEdit(navigate, toast));

        // Initial state should show loading
        expect(result.current.isLoading).toBe(true);

        // Wait for the profile to be fetched
        await act(async () => {
            await new Promise(resolve => setTimeout(resolve, 0));
        });

        // Check if API was called
        expect(apiGetProfile).toHaveBeenCalled();

        // Check if initial values were set correctly
        expect(result.current.initialValues).toEqual({
            name: mockProfile.name,
            email: mockProfile.email,
            avatar_url: mockProfile.avatar_url,
            password: '',
            confirmPassword: ''
        });

        // Check if loading state was updated
        expect(result.current.isLoading).toBe(false);
        expect(result.current.error).toBeNull();
    });

    it('should handle profile fetch error', async () => {
        // Mock API error
        const errorMessage = 'Failed to fetch profile';
        (apiGetProfile as vi.Mock).mockRejectedValueOnce(new Error(errorMessage));

        const {result} = renderHook(() => useUserEdit(navigate, toast));

        // Wait for the error to be handled
        await act(async () => {
            await new Promise(resolve => setTimeout(resolve, 0));
        });

        // Check if error toast was shown
        expect(toast.error).toHaveBeenCalledWith(errorMessage);

        // Check if error state was set
        expect(result.current.error).toBe(errorMessage);

        // Check if loading state was updated
        expect(result.current.isLoading).toBe(false);
    });

    it('should handle successful profile update', async () => {
        // Mock successful update
        updateUserInformation.mockResolvedValueOnce({});

        const {result} = renderHook(() => useUserEdit(navigate, toast));

        // Wait for the profile to be fetched
        await act(async () => {
            await new Promise(resolve => setTimeout(resolve, 0));
        });

        // Submit the form
        await act(async () => {
            await result.current.handleSubmit(testValues, formikHelpers);
        });

        // Check if updateUserInformation was called with correct data
        expect(updateUserInformation).toHaveBeenCalledWith({
            name: testValues.name,
            avatar_url: testValues.avatar_url,
            password: testValues.password
        });

        // Check if navigation occurred
        expect(navigate).toHaveBeenCalledWith('/');

        // Check if formik's setSubmitting was called
        expect(formikHelpers.setSubmitting).toHaveBeenCalledWith(false);
    });

    it('should not include password in update if not provided', async () => {
        // Mock successful update
        updateUserInformation.mockResolvedValueOnce({});

        const {result} = renderHook(() => useUserEdit(navigate, toast));

        // Wait for the profile to be fetched
        await act(async () => {
            await new Promise(resolve => setTimeout(resolve, 0));
        });

        // Submit the form with empty password
        const valuesWithoutPassword = {
            ...testValues,
            password: '',
            confirmPassword: ''
        };

        await act(async () => {
            await result.current.handleSubmit(valuesWithoutPassword, formikHelpers);
        });

        // Check if updateUserInformation was called without password
        expect(updateUserInformation).toHaveBeenCalledWith({
            name: valuesWithoutPassword.name,
            avatar_url: valuesWithoutPassword.avatar_url
        });
    });

    it('should handle update error', async () => {
        // Mock update error
        const errorMessage = 'Update failed';
        updateUserInformation.mockRejectedValueOnce(new Error(errorMessage));

        const {result} = renderHook(() => useUserEdit(navigate, toast));

        // Wait for the profile to be fetched
        await act(async () => {
            await new Promise(resolve => setTimeout(resolve, 0));
        });

        // Submit the form
        await act(async () => {
            await result.current.handleSubmit(testValues, formikHelpers);
        });

        // Check if error toast was shown
        expect(toast.error).toHaveBeenCalledWith(errorMessage);

        // Check if error state was set
        expect(result.current.error).toBe(errorMessage);

        // Check if formik's setSubmitting was called
        expect(formikHelpers.setSubmitting).toHaveBeenCalledWith(false);

        // Check that navigation was not called
        expect(navigate).not.toHaveBeenCalled();
    });
});
