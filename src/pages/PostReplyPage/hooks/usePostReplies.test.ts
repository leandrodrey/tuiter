import {renderHook, act} from '@testing-library/react';
import {describe, it, expect, vi, beforeEach} from 'vitest';
import {usePostReplies} from './usePostReplies';
import {apiGetTuitReplies, apiAddReplyToTuit} from '../../../services/TuitsService';
import {useNavigate, useParams} from 'react-router-dom';
import {useToast} from '../../../hooks/context/useToast';
import {useUser} from '../../../hooks/context/useUser';
import {usePostInteractions} from '../../../hooks/post-feed/usePostInteractions';
import {loadDraft, saveDraft, clearDraft} from '../../../utils/draftUtils';
import {replyInitialValues} from '../../../validations/postSchemas';

// Mock dependencies
vi.mock('react-router-dom', () => ({
    useNavigate: vi.fn(),
    useParams: vi.fn()
}));

vi.mock('../../../services/TuitsService', () => ({
    apiGetTuitReplies: vi.fn(),
    apiAddReplyToTuit: vi.fn()
}));

vi.mock('../../../hooks/context/useToast', () => ({
    useToast: vi.fn()
}));

vi.mock('../../../hooks/context/useUser', () => ({
    useUser: vi.fn()
}));

vi.mock('../../../hooks/post-feed/usePostInteractions', () => ({
    usePostInteractions: vi.fn()
}));

vi.mock('../../../utils/draftUtils', () => ({
    loadDraft: vi.fn(),
    saveDraft: vi.fn(),
    clearDraft: vi.fn()
}));

describe('usePostReplies', () => {
    // Mock navigate and params
    const navigate = vi.fn();
    const mockPostId = '123';

    // Mock toast
    const toast = {
        success: vi.fn(),
        error: vi.fn(),
        info: vi.fn(),
        warning: vi.fn()
    };

    // Mock user information
    const userInformation = {
        id: 1,
        name: 'Test User',
        avatar_url: 'https://example.com/avatar.jpg'
    };

    // Mock handleLikePost function
    const handleLikePost = vi.fn();

    // Mock replies data
    const mockReplies = [
        {
            id: 1,
            author: 'user1',
            avatar_url: 'https://example.com/avatar1.jpg',
            message: 'Reply 1',
            date: '2023-01-01T00:00:00Z',
            likes: 5,
            liked: false,
            parent_id: 123,
            replies_count: 0
        },
        {
            id: 2,
            author: 'user2',
            avatar_url: 'https://example.com/avatar2.jpg',
            message: 'Reply 2',
            date: '2023-01-02T00:00:00Z',
            likes: 3,
            liked: true,
            parent_id: 123,
            replies_count: 0
        }
    ];

    // Test form values
    const testValues = {
        message: 'Test reply message'
    };

    // Mock formik helpers
    const formikHelpers = {
        setSubmitting: vi.fn(),
        resetForm: vi.fn()
    };

    beforeEach(() => {
        vi.clearAllMocks();

        // Setup mocks
        (useNavigate as vi.Mock).mockReturnValue(navigate);
        (useParams as vi.Mock).mockReturnValue({postId: mockPostId});
        (useToast as vi.Mock).mockReturnValue(toast);
        (useUser as vi.Mock).mockReturnValue({userInformation});
        (usePostInteractions as vi.Mock).mockReturnValue({handleLikePost});
        (apiGetTuitReplies as vi.Mock).mockResolvedValue(mockReplies);
        (loadDraft as vi.Mock).mockReturnValue(null);
    });

    it('should fetch replies on mount', async () => {
        const {result} = renderHook(() => usePostReplies());

        // Initial state should show loading
        expect(result.current.isLoading).toBe(true);

        // Wait for the replies to be fetched
        await act(async () => {
            await new Promise(resolve => setTimeout(resolve, 0));
        });

        // Check if API was called with correct post ID
        expect(apiGetTuitReplies).toHaveBeenCalledWith(123);

        // Check if replies were set correctly
        expect(result.current.replies).toEqual(mockReplies);

        // Check if loading state was updated
        expect(result.current.isLoading).toBe(false);
        expect(result.current.error).toBeNull();
    });

    it('should handle missing post ID', async () => {
        // Mock missing post ID
        (useParams as vi.Mock).mockReturnValue({postId: undefined});

        const {result} = renderHook(() => usePostReplies());

        // Wait for the error to be handled
        await act(async () => {
            await new Promise(resolve => setTimeout(resolve, 0));
        });

        // Check if error state was set
        expect(result.current.error).toBe('Post ID is missing');
        expect(result.current.isLoading).toBe(false);

        // Check that API was not called
        expect(apiGetTuitReplies).not.toHaveBeenCalled();
    });

    it('should handle fetch error', async () => {
        // Mock API error
        const errorMessage = 'Failed to fetch replies';
        (apiGetTuitReplies as vi.Mock).mockRejectedValueOnce(new Error(errorMessage));

        const {result} = renderHook(() => usePostReplies());

        // Wait for the error to be handled
        await act(async () => {
            await new Promise(resolve => setTimeout(resolve, 0));
        });

        // Check if error state was set
        expect(result.current.error).toBe('Failed to load the post or replies. Please try again.');
        expect(result.current.isLoading).toBe(false);
    });

    it('should handle successful reply submission', async () => {
        // Mock successful reply submission
        const newReply = {
            id: 3,
            author: 'Test User',
            avatar_url: 'https://example.com/avatar.jpg',
            message: testValues.message,
            date: '2023-01-03T00:00:00Z',
            likes: 0,
            liked: false,
            parent_id: 123,
            replies_count: 0
        };
        (apiAddReplyToTuit as vi.Mock).mockResolvedValueOnce(newReply);

        const {result} = renderHook(() => usePostReplies());

        // Wait for the replies to be fetched
        await act(async () => {
            await new Promise(resolve => setTimeout(resolve, 0));
        });

        // Submit the reply
        await act(async () => {
            await result.current.handleSubmit(testValues, formikHelpers);
        });

        // Check if API was called with correct data
        expect(apiAddReplyToTuit).toHaveBeenCalledWith(123, {message: testValues.message});

        // Check if success toast was shown
        expect(toast.success).toHaveBeenCalledWith('Reply posted successfully!');

        // Check if navigation occurred
        expect(navigate).toHaveBeenCalledWith('/feed');

        // Check if form was reset
        expect(formikHelpers.resetForm).toHaveBeenCalled();

        // Check if formik's setSubmitting was called
        expect(formikHelpers.setSubmitting).toHaveBeenCalledWith(false);

        // Check if replies were updated
        expect(result.current.replies).toEqual([newReply, ...mockReplies]);
    });

    it('should handle reply submission error', async () => {
        // Mock API error
        const errorMessage = 'Failed to post reply';
        (apiAddReplyToTuit as vi.Mock).mockRejectedValueOnce(new Error(errorMessage));

        const {result} = renderHook(() => usePostReplies());

        // Wait for the replies to be fetched
        await act(async () => {
            await new Promise(resolve => setTimeout(resolve, 0));
        });

        // Submit the reply
        await act(async () => {
            await result.current.handleSubmit(testValues, formikHelpers);
        });

        // Check if error state was set
        expect(result.current.error).toBe(errorMessage);

        // Check if formik's setSubmitting was called
        expect(formikHelpers.setSubmitting).toHaveBeenCalledWith(false);

        // Check that navigation was not called
        expect(navigate).not.toHaveBeenCalled();
    });

    it('should handle saving draft', async () => {
        const {result} = renderHook(() => usePostReplies());

        // Wait for the replies to be fetched
        await act(async () => {
            await new Promise(resolve => setTimeout(resolve, 0));
        });

        // Save draft
        act(() => {
            result.current.handleSaveDraft(testValues);
        });

        // Check if saveDraft was called with correct data
        expect(saveDraft).toHaveBeenCalledWith(testValues, userInformation);

        // Check if success toast was shown
        expect(toast.success).toHaveBeenCalledWith('Draft saved successfully!');
    });

    it('should handle clearing draft', async () => {
        const {result} = renderHook(() => usePostReplies());

        // Wait for the replies to be fetched
        await act(async () => {
            await new Promise(resolve => setTimeout(resolve, 0));
        });

        // Clear draft
        act(() => {
            result.current.handleClearDraft(formikHelpers.resetForm);
        });

        // Check if clearDraft was called with correct data
        expect(clearDraft).toHaveBeenCalledWith(userInformation);

        // Check if resetForm was called with initial values
        expect(formikHelpers.resetForm).toHaveBeenCalledWith({values: replyInitialValues});

        // Check if info toast was shown
        expect(toast.info).toHaveBeenCalledWith('Draft cleared!');
    });

    it('should load saved draft on mount', async () => {
        // Mock saved draft
        const savedDraft = 'Saved draft message';
        (loadDraft as vi.Mock).mockReturnValueOnce(savedDraft);

        renderHook(() => usePostReplies());

        // Check if loadDraft was called
        expect(loadDraft).toHaveBeenCalledWith(userInformation);

        // Check if initial values were updated with saved draft
        expect(replyInitialValues.message).toBe(savedDraft);
    });

    it('should expose handleLikePost from usePostInteractions', async () => {
        const {result} = renderHook(() => usePostReplies());

        // Wait for the replies to be fetched
        await act(async () => {
            await new Promise(resolve => setTimeout(resolve, 0));
        });

        // Check if handleLikePost is exposed
        expect(result.current.handleLikePost).toBe(handleLikePost);
    });
});
