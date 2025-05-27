import {describe, it, expect, vi, beforeEach, afterEach} from 'vitest';
import {isUserInFavorites} from './favoriteUtils';
import {FAVORITE_USERS_KEY} from '../constants/storageConstants';

// Mock localStorage
const mockGetItem = vi.fn();

// Save original methods
const originalGetItem = Storage.prototype.getItem;

describe('favoriteUtils', () => {
    beforeEach(() => {
        // Mock localStorage methods
        Storage.prototype.getItem = mockGetItem;
    });

    afterEach(() => {
        // Restore original methods
        Storage.prototype.getItem = originalGetItem;

        // Clear all mocks
        vi.clearAllMocks();
    });

    describe('isUserInFavorites', () => {
        it('should return true when user is in favorites (without userEmail)', () => {
            // Mock localStorage.getItem to return favorites that include the author
            const favorites = [
                {author: 'user1', avatarUrl: 'https://example.com/avatar1.jpg'},
                {author: 'user2', avatarUrl: 'https://example.com/avatar2.jpg'}
            ];

            mockGetItem.mockReturnValue(JSON.stringify(favorites));

            const result = isUserInFavorites('user1');

            // Verify localStorage.getItem was called with the correct key
            expect(mockGetItem).toHaveBeenCalledWith(FAVORITE_USERS_KEY);
            expect(result).toBe(true);
        });

        it('should return false when user is not in favorites (without userEmail)', () => {
            // Mock localStorage.getItem to return favorites that don't include the author
            const favorites = [
                {author: 'user1', avatarUrl: 'https://example.com/avatar1.jpg'},
                {author: 'user2', avatarUrl: 'https://example.com/avatar2.jpg'}
            ];

            mockGetItem.mockReturnValue(JSON.stringify(favorites));

            const result = isUserInFavorites('user3');

            // Verify localStorage.getItem was called with the correct key
            expect(mockGetItem).toHaveBeenCalledWith(FAVORITE_USERS_KEY);
            expect(result).toBe(false);
        });

        it('should return true when user is in favorites (with userEmail)', () => {
            // Mock localStorage.getItem to return favorites that include the author
            const favorites = [
                {author: 'user1', avatarUrl: 'https://example.com/avatar1.jpg'},
                {author: 'user2', avatarUrl: 'https://example.com/avatar2.jpg'}
            ];

            mockGetItem.mockReturnValue(JSON.stringify(favorites));

            const userEmail = 'test@example.com';
            const result = isUserInFavorites('user1', userEmail);

            // Verify localStorage.getItem was called with the correct key
            expect(mockGetItem).toHaveBeenCalledWith(`${FAVORITE_USERS_KEY}_${userEmail}`);
            expect(result).toBe(true);
        });

        it('should return false when user is not in favorites (with userEmail)', () => {
            // Mock localStorage.getItem to return favorites that don't include the author
            const favorites = [
                {author: 'user1', avatarUrl: 'https://example.com/avatar1.jpg'},
                {author: 'user2', avatarUrl: 'https://example.com/avatar2.jpg'}
            ];

            mockGetItem.mockReturnValue(JSON.stringify(favorites));

            const userEmail = 'test@example.com';
            const result = isUserInFavorites('user3', userEmail);

            // Verify localStorage.getItem was called with the correct key
            expect(mockGetItem).toHaveBeenCalledWith(`${FAVORITE_USERS_KEY}_${userEmail}`);
            expect(result).toBe(false);
        });

        it('should return false when localStorage returns null', () => {
            // Mock localStorage.getItem to return null
            mockGetItem.mockReturnValue(null);

            const result = isUserInFavorites('user1');

            expect(result).toBe(false);
        });

        it('should return false when localStorage returns empty array', () => {
            // Mock localStorage.getItem to return empty array
            mockGetItem.mockReturnValue('[]');

            const result = isUserInFavorites('user1');

            expect(result).toBe(false);
        });
    });
});
