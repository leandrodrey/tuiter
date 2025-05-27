import {renderHook, act} from '@testing-library/react';
import {describe, it, expect, vi, beforeEach, afterEach} from 'vitest';
import {usePostReplies} from './usePostReplies';
import type {Post} from '../../types/postTypes';

// Mock the API function
const mockApiGetTuitReplies = vi.fn();

vi.mock('../../services/TuitsService', () => ({
    apiGetTuitReplies: (...args) => mockApiGetTuitReplies(...args)
}));

// Mock console.error to prevent output during tests
const originalConsoleError = console.error;

describe('usePostReplies', () => {
    // Sample post data for testing
    const testPostId = 1;

    const sampleReplies: Post[] = [
        {
            id: 2,
            parent_id: 1,
            message: 'Reply 1',
            author: 'user1',
            created_at: '2023-01-01T01:00:00Z',
            likes: 3,
            liked: false,
            replies_count: 0
        },
        {
            id: 3,
            parent_id: 1,
            message: 'Reply 2',
            author: 'user2',
            created_at: '2023-01-01T02:00:00Z',
            likes: 1,
            liked: true,
            replies_count: 0
        }
    ];

    beforeEach(() => {
        vi.clearAllMocks();
        console.error = vi.fn();
    });

    afterEach(() => {
        console.error = originalConsoleError;
    });

    it('initializes with showReplies=false when no initial replies are provided', () => {
        // Render the hook with no initial replies
        const {result} = renderHook(() => usePostReplies(testPostId));

        // Check initial state
        expect(result.current.showReplies).toBe(false);
        expect(result.current.replies).toEqual([]);
        expect(result.current.loadingReplies).toBe(false);
    });

    it('initializes with showReplies=true when initial replies are provided', () => {
        // Render the hook with initial replies
        const {result} = renderHook(() => usePostReplies(testPostId, sampleReplies));

        // Check initial state
        expect(result.current.showReplies).toBe(true);
        expect(result.current.replies).toEqual(sampleReplies);
        expect(result.current.loadingReplies).toBe(false);
    });

    it('toggles replies visibility when replies are already loaded', async () => {
        // Render the hook with initial replies
        const {result} = renderHook(() => usePostReplies(testPostId, sampleReplies));

        // Initial state should show replies
        expect(result.current.showReplies).toBe(true);

        // Toggle replies (hide them)
        await act(async () => {
            await result.current.handleToggleReplies();
        });

        // Replies should be hidden
        expect(result.current.showReplies).toBe(false);

        // Toggle replies again (show them)
        await act(async () => {
            await result.current.handleToggleReplies();
        });

        // Replies should be visible again
        expect(result.current.showReplies).toBe(true);

        // API should not have been called since replies were already loaded
        expect(mockApiGetTuitReplies).not.toHaveBeenCalled();
    });

    it('fetches replies when they are not loaded', async () => {
        // Mock API to return sample replies
        mockApiGetTuitReplies.mockResolvedValue(sampleReplies);

        // Render the hook with no initial replies
        const {result} = renderHook(() => usePostReplies(testPostId));

        // Initial state should not show replies
        expect(result.current.showReplies).toBe(false);
        expect(result.current.replies).toEqual([]);

        // Toggle replies (should fetch and show them)
        await act(async () => {
            await result.current.handleToggleReplies();
        });

        // API should have been called with the correct post ID
        expect(mockApiGetTuitReplies).toHaveBeenCalledWith(testPostId);

        // Replies should be visible and loaded
        expect(result.current.showReplies).toBe(true);
        expect(result.current.replies).toEqual(sampleReplies);
        expect(result.current.loadingReplies).toBe(false);
    });

    it('handles errors when fetching replies', async () => {
        // Mock API to throw an error
        const testError = new Error('API error');
        mockApiGetTuitReplies.mockRejectedValue(testError);

        // Render the hook with no initial replies
        const {result} = renderHook(() => usePostReplies(testPostId));

        // Toggle replies (should attempt to fetch them)
        await act(async () => {
            await result.current.handleToggleReplies();
        });

        // API should have been called
        expect(mockApiGetTuitReplies).toHaveBeenCalledWith(testPostId);

        // Error should have been logged
        expect(console.error).toHaveBeenCalledWith('Error fetching replies:', testError);

        // Replies should not be visible and loading should be false
        expect(result.current.showReplies).toBe(false);
        expect(result.current.replies).toEqual([]);
        expect(result.current.loadingReplies).toBe(false);
    });

    it('allows specifying a different post ID when toggling replies', async () => {
        // Mock API to return sample replies
        mockApiGetTuitReplies.mockResolvedValue(sampleReplies);

        // Render the hook with no initial replies
        const {result} = renderHook(() => usePostReplies(testPostId));

        // Toggle replies for a different post ID
        const differentPostId = 999;
        await act(async () => {
            await result.current.handleToggleReplies(differentPostId);
        });

        // API should have been called with the different post ID
        expect(mockApiGetTuitReplies).toHaveBeenCalledWith(differentPostId);

        // Replies should be visible and loaded
        expect(result.current.showReplies).toBe(true);
        expect(result.current.replies).toEqual(sampleReplies);
    });

    it('sets loadingReplies to true while fetching replies', async () => {
        // Create a promise that we can resolve manually
        let resolvePromise;
        const promise = new Promise<Post[]>((resolve) => {
            resolvePromise = () => resolve(sampleReplies);
        });

        // Mock API to return the promise
        mockApiGetTuitReplies.mockReturnValue(promise);

        // Render the hook with no initial replies
        const {result} = renderHook(() => usePostReplies(testPostId));

        // Start toggling replies (should set loadingReplies to true)
        let togglePromise;
        act(() => {
            togglePromise = result.current.handleToggleReplies();
        });

        // Check that loadingReplies is true
        expect(result.current.loadingReplies).toBe(true);

        // Resolve the API promise
        await act(async () => {
            resolvePromise();
            await togglePromise;
        });

        // Check that loadingReplies is false and replies are loaded
        expect(result.current.loadingReplies).toBe(false);
        expect(result.current.replies).toEqual(sampleReplies);
        expect(result.current.showReplies).toBe(true);
    });
});
