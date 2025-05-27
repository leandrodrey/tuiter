import {renderHook, act} from '@testing-library/react';
import {describe, it, expect, vi, beforeEach} from 'vitest';
import {usePostCreation} from './usePostCreation';
import type {PostFormData} from '../../types/formTypes';

// Mock the hooks and services
vi.mock('react-router-dom', () => ({
    useNavigate: () => mockNavigate
}));

vi.mock('../context/useToast', () => ({
    useToast: () => mockToast
}));

vi.mock('../context/useUser', () => ({
    useUser: () => ({
        userInformation: mockUserInformation
    })
}));

vi.mock('../../services/TuitsService', () => ({
    apiCreateTuit: (...args) => mockApiCreateTuit(...args)
}));

vi.mock('../../utils/draftUtils', () => ({
    loadDraft: (...args) => mockLoadDraft(...args),
    saveDraft: (...args) => mockSaveDraft(...args),
    clearDraft: (...args) => mockClearDraft(...args)
}));

// Mock dependencies
const mockNavigate = vi.fn();
const mockToast = {
    success: vi.fn(),
    error: vi.fn(),
    info: vi.fn()
};
const mockUserInformation = {
    id: 1,
    name: 'Test User',
    email: 'test@example.com'
};
const mockApiCreateTuit = vi.fn();
const mockLoadDraft = vi.fn();
const mockSaveDraft = vi.fn();
const mockClearDraft = vi.fn();

// Mock the empty values
vi.mock('../../validations/postSchemas', () => ({
    createPostEmptyValues: {message: ''}
}));

describe('usePostCreation', () => {
    const testMessage = 'Test message';
    const testFormData: PostFormData = {message: testMessage};

    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('initializes with empty values when no draft exists', () => {
        // Mock loadDraft to return null (no draft)
        mockLoadDraft.mockReturnValue(null);

        // Render the hook
        const {result} = renderHook(() => usePostCreation());

        // Check initial values
        expect(result.current.initialValues).toEqual({message: ''});
        expect(mockLoadDraft).toHaveBeenCalledWith(mockUserInformation);
    });

    it('initializes with draft values when a draft exists', () => {
        // Mock loadDraft to return a draft message
        mockLoadDraft.mockReturnValue(testMessage);

        // Render the hook
        const {result} = renderHook(() => usePostCreation());

        // Check initial values
        expect(result.current.initialValues).toEqual({message: testMessage});
        expect(mockLoadDraft).toHaveBeenCalledWith(mockUserInformation);
    });

    it('saves draft when handleSaveDraft is called', () => {
        // Render the hook
        const {result} = renderHook(() => usePostCreation());

        // Call handleSaveDraft
        act(() => {
            result.current.handleSaveDraft(testFormData);
        });

        // Check if saveDraft was called with the correct arguments
        expect(mockSaveDraft).toHaveBeenCalledWith(testFormData, mockUserInformation);
        expect(mockToast.success).toHaveBeenCalledWith('Draft saved successfully!');
    });

    it('clears draft when handleClearDraft is called', () => {
        // Create a mock resetForm function
        const mockResetForm = vi.fn();

        // Render the hook
        const {result} = renderHook(() => usePostCreation());

        // Call handleClearDraft
        act(() => {
            result.current.handleClearDraft(mockResetForm);
        });

        // Check if clearDraft was called with the correct arguments
        expect(mockClearDraft).toHaveBeenCalledWith(mockUserInformation);
        expect(mockResetForm).toHaveBeenCalledWith({values: {message: ''}});
        expect(mockToast.info).toHaveBeenCalledWith('Draft cleared!');
    });

    it('submits the form successfully', async () => {
        // Mock apiCreateTuit to resolve successfully
        mockApiCreateTuit.mockResolvedValue({});

        // Create mock formik helpers
        const formikHelpers = {
            setSubmitting: vi.fn(),
            resetForm: vi.fn()
        };

        // Render the hook
        const {result} = renderHook(() => usePostCreation());

        // Call handleSubmit
        await act(async () => {
            await result.current.handleSubmit(testFormData, formikHelpers);
        });

        // Check if apiCreateTuit was called with the correct arguments
        expect(mockApiCreateTuit).toHaveBeenCalledWith({message: testMessage});

        // Check if the draft was cleared
        expect(mockClearDraft).toHaveBeenCalledWith(mockUserInformation);

        // Check if the form was reset
        expect(formikHelpers.resetForm).toHaveBeenCalled();

        // Check if the success toast was shown
        expect(mockToast.success).toHaveBeenCalledWith('Post created successfully!');

        // Check if navigation occurred
        expect(mockNavigate).toHaveBeenCalledWith('/');

        // Check if setSubmitting was called with false
        expect(formikHelpers.setSubmitting).toHaveBeenCalledWith(false);
    });

    it('handles submission errors', async () => {
        // Mock console.error to prevent output during test
        const originalConsoleError = console.error;
        console.error = vi.fn();

        // Mock apiCreateTuit to reject with an error
        const testError = new Error('Test error');
        mockApiCreateTuit.mockRejectedValue(testError);

        // Create mock formik helpers
        const formikHelpers = {
            setSubmitting: vi.fn(),
            resetForm: vi.fn()
        };

        // Render the hook
        const {result} = renderHook(() => usePostCreation());

        // Call handleSubmit
        await act(async () => {
            await result.current.handleSubmit(testFormData, formikHelpers);
        });

        // Check if apiCreateTuit was called
        expect(mockApiCreateTuit).toHaveBeenCalledWith({message: testMessage});

        // Check if the error toast was shown
        expect(mockToast.error).toHaveBeenCalledWith('Test error');

        // Check if setSubmitting was called with false
        expect(formikHelpers.setSubmitting).toHaveBeenCalledWith(false);

        // Check if the draft was not cleared
        expect(mockClearDraft).not.toHaveBeenCalled();

        // Check if the form was not reset
        expect(formikHelpers.resetForm).not.toHaveBeenCalled();

        // Check if navigation did not occur
        expect(mockNavigate).not.toHaveBeenCalled();

        // Restore console.error
        console.error = originalConsoleError;
    });

    it('handles submission errors with response data', async () => {
        // Mock console.error to prevent output during test
        const originalConsoleError = console.error;
        console.error = vi.fn();

        // Mock apiCreateTuit to reject with an error object containing response data
        const testErrorWithResponse = {
            response: {
                data: {
                    message: 'API error message'
                }
            }
        };
        mockApiCreateTuit.mockRejectedValue(testErrorWithResponse);

        // Create mock formik helpers
        const formikHelpers = {
            setSubmitting: vi.fn(),
            resetForm: vi.fn()
        };

        // Render the hook
        const {result} = renderHook(() => usePostCreation());

        // Call handleSubmit
        await act(async () => {
            await result.current.handleSubmit(testFormData, formikHelpers);
        });

        // Check if the error toast was shown with the correct message
        expect(mockToast.error).toHaveBeenCalledWith('API error message');

        // Restore console.error
        console.error = originalConsoleError;
    });
});
