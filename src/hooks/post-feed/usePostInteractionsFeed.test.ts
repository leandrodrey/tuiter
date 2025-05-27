import {renderHook, act} from '@testing-library/react';
import {describe, it, expect, vi, beforeEach} from 'vitest';
import {usePostInteractionsFeed} from './usePostInteractionsFeed';
import {apiAddLikeToTuit, apiRemoveLikeFromTuit} from '../../services/TuitsService';
import {useToast} from '../context/useToast';
import {useUser} from '../context/useUser';
import {FAVORITE_USERS_KEY} from '../../constants/storageConstants';
import type {Post} from '../../types/postTypes';

// Mock dependencies
vi.mock('../../services/TuitsService', () => ({
    apiAddLikeToTuit: vi.fn(),
    apiRemoveLikeFromTuit: vi.fn()
}));

vi.mock('../context/useToast', () => ({
    useToast: vi.fn()
}));

vi.mock('../context/useUser', () => ({
    useUser: vi.fn()
}));

describe('usePostInteractionsFeed', () => {
    // Mock posts
    const mockPosts: Post[] = [
        {
            id: 1,
            author: 'user1',
            avatar_url: 'https://example.com/avatar1.jpg',
            message: 'Post 1',
            date: '2023-01-01T00:00:00Z',
            likes: 5,
            liked: false,
            parent_id: 0,
            replies_count: 0
        },
        {
            id: 2,
            author: 'user2',
            avatar_url: 'https://example.com/avatar2.jpg',
            message: 'Post 2',
            date: '2023-01-02T00:00:00Z',
            likes: 3,
            liked: true,
            parent_id: 0,
            replies_count: 0
        }
    ];

    // Mock setPosts function
    const mockSetPosts = vi.fn();

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
        email: 'test@example.com',
        avatar_url: 'https://example.com/avatar.jpg'
    };

    // Mock localStorage
    const localStorageMock = (() => {
        let store: Record<string, string> = {};
        return {
            getItem: vi.fn((key: string) => store[key] || null),
            setItem: vi.fn((key: string, value: string) => {
                store[key] = value;
            }),
            clear: vi.fn(() => {
                store = {};
            })
        };
    })();

    // Replace global localStorage with mock
    Object.defineProperty(window, 'localStorage', {
        value: localStorageMock
    });

    beforeEach(() => {
        vi.clearAllMocks();

        // Setup mocks
        (useToast as vi.Mock).mockReturnValue(toast);
        (useUser as vi.Mock).mockReturnValue({userInformation});

        // Clear localStorage mock
        localStorageMock.clear();
    });

    it('should handle liking a post', async () => {
        // Setup
        (apiAddLikeToTuit as vi.Mock).mockResolvedValueOnce({});

        // Render the hook
        const {result} = renderHook(() => usePostInteractionsFeed(mockPosts, mockSetPosts));

        // Execute the like action
        await act(async () => {
            await result.current.handleLikePost(1);
        });

        // Verify API was called
        expect(apiAddLikeToTuit).toHaveBeenCalledWith(1);

        // Verify setPosts was called with the correct function
        expect(mockSetPosts).toHaveBeenCalled();

        // Get the updater function passed to setPosts
        const updaterFn = mockSetPosts.mock.calls[0][0];

        // Test the updater function
        const updatedPosts = updaterFn(mockPosts);

        // Verify the post was updated correctly
        expect(updatedPosts[0].liked).toBe(true);
        expect(updatedPosts[0].likes).toBe(6);
        expect(updatedPosts[1]).toEqual(mockPosts[1]); // Other post unchanged
    });

    it('should handle unliking a post', async () => {
        // Setup
        (apiRemoveLikeFromTuit as vi.Mock).mockResolvedValueOnce({});

        // Render the hook
        const {result} = renderHook(() => usePostInteractionsFeed(mockPosts, mockSetPosts));

        // Execute the unlike action on a post that is already liked
        await act(async () => {
            await result.current.handleLikePost(2);
        });

        // Verify API was called
        expect(apiRemoveLikeFromTuit).toHaveBeenCalledWith(2);

        // Verify setPosts was called with the correct function
        expect(mockSetPosts).toHaveBeenCalled();

        // Get the updater function passed to setPosts
        const updaterFn = mockSetPosts.mock.calls[0][0];

        // Test the updater function
        const updatedPosts = updaterFn(mockPosts);

        // Verify the post was updated correctly
        expect(updatedPosts[1].liked).toBe(false);
        expect(updatedPosts[1].likes).toBe(2);
        expect(updatedPosts[0]).toEqual(mockPosts[0]); // Other post unchanged
    });

    it('should handle error when liking a post', async () => {
        // Setup
        const error = new Error('API error');
        (apiAddLikeToTuit as vi.Mock).mockRejectedValueOnce(error);

        // Spy on console.error
        const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

        // Render the hook
        const {result} = renderHook(() => usePostInteractionsFeed(mockPosts, mockSetPosts));

        // Execute the like action
        await act(async () => {
            await result.current.handleLikePost(1);
        });

        // Verify API was called
        expect(apiAddLikeToTuit).toHaveBeenCalledWith(1);

        // Verify error was logged
        expect(consoleErrorSpy).toHaveBeenCalledWith('Error toggling like on post:', error);

        // Verify setPosts was not called
        expect(mockSetPosts).not.toHaveBeenCalled();

        // Restore console.error
        consoleErrorSpy.mockRestore();
    });

    it('should handle post not found when liking', async () => {
        // Spy on console.error
        const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

        // Render the hook
        const {result} = renderHook(() => usePostInteractionsFeed(mockPosts, mockSetPosts));

        // Execute the like action with a non-existent post ID
        await act(async () => {
            await result.current.handleLikePost(999);
        });

        // Verify error was logged
        expect(consoleErrorSpy).toHaveBeenCalledWith('Post with ID 999 not found');

        // Verify API was not called
        expect(apiAddLikeToTuit).not.toHaveBeenCalled();
        expect(apiRemoveLikeFromTuit).not.toHaveBeenCalled();

        // Verify setPosts was not called
        expect(mockSetPosts).not.toHaveBeenCalled();

        // Restore console.error
        consoleErrorSpy.mockRestore();
    });

    it('should add a user to favorites', () => {
        // Render the hook
        const {result} = renderHook(() => usePostInteractionsFeed(mockPosts, mockSetPosts));

        // Execute the add to favorites action
        act(() => {
            result.current.handleAddToFavorites('user1', 'https://example.com/avatar1.jpg');
        });

        // Verify localStorage was called with the correct key
        const expectedKey = `${FAVORITE_USERS_KEY}_${userInformation.email}`;
        expect(localStorageMock.getItem).toHaveBeenCalledWith(expectedKey);
        expect(localStorageMock.setItem).toHaveBeenCalledWith(
            expectedKey,
            JSON.stringify([{author: 'user1', avatar_url: 'https://example.com/avatar1.jpg'}])
        );

        // Verify success toast was shown
        expect(toast.success).toHaveBeenCalledWith('user1 added to favorites!');
    });

    it('should not add a user to favorites if already in favorites', () => {
        // Setup existing favorites
        const existingFavorites = [{author: 'user1', avatar_url: 'https://example.com/avatar1.jpg'}];
        localStorageMock.getItem.mockReturnValueOnce(JSON.stringify(existingFavorites));

        // Render the hook
        const {result} = renderHook(() => usePostInteractionsFeed(mockPosts, mockSetPosts));

        // Execute the add to favorites action
        act(() => {
            result.current.handleAddToFavorites('user1', 'https://example.com/avatar1.jpg');
        });

        // Verify localStorage was called with the correct key
        const expectedKey = `${FAVORITE_USERS_KEY}_${userInformation.email}`;
        expect(localStorageMock.getItem).toHaveBeenCalledWith(expectedKey);

        // Verify localStorage.setItem was not called (no changes)
        expect(localStorageMock.setItem).not.toHaveBeenCalled();

        // Verify info toast was shown
        expect(toast.info).toHaveBeenCalledWith('user1 is already in your favorites!');
    });

    it('should use default key when user information is not available', () => {
        // Setup missing user information
        (useUser as vi.Mock).mockReturnValueOnce({userInformation: null});

        // Render the hook
        const {result} = renderHook(() => usePostInteractionsFeed(mockPosts, mockSetPosts));

        // Execute the add to favorites action
        act(() => {
            result.current.handleAddToFavorites('user1', 'https://example.com/avatar1.jpg');
        });

        // Verify localStorage was called with the default key
        expect(localStorageMock.getItem).toHaveBeenCalledWith(FAVORITE_USERS_KEY);
        expect(localStorageMock.setItem).toHaveBeenCalledWith(
            FAVORITE_USERS_KEY,
            JSON.stringify([{author: 'user1', avatar_url: 'https://example.com/avatar1.jpg'}])
        );
    });
});
