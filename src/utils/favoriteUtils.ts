import {FAVORITE_USERS_KEY} from '../constants/storageConstants';

/**
 * Checks if a user is already in the favorites list
 * @param author The username to check
 * @param userEmail The email of the current user (for user-specific favorites)
 * @returns True if the user is already in favorites, false otherwise
 */
export const isUserInFavorites = (author: string, userEmail?: string): boolean => {
    // Create a user-specific key if an email is provided
    const storageKey = userEmail
        ? `${FAVORITE_USERS_KEY}_${userEmail}`
        : FAVORITE_USERS_KEY;

    // Get existing favorites from localStorage
    const existingFavorites = JSON.parse(localStorage.getItem(storageKey) || '[]');

    // Check if the author is already in favorites
    return existingFavorites.some(
        (favorite: { author: string }) => favorite.author === author
    );
};
