import {DRAFT_STORAGE_KEY} from '../constants/storageConstants';
import type {PostFormData} from '../types/formTypes';
import type {UserInformation} from '../types/userTypes';

/**
 * Gets a user-specific storage key for drafts
 * @param userInfo The user information object
 * @returns A user-specific storage key or the default key if no user info is provided
 */
const getUserSpecificKey = (userInfo?: UserInformation | null): string => {
    if (!userInfo || !userInfo.email) {
        return DRAFT_STORAGE_KEY;
    }
    return `${DRAFT_STORAGE_KEY}_${userInfo.email}`;
};

/**
 * Loads a post-draft from localStorage
 * @param userInfo The user information object
 * @returns The draft message or null if no draft exists
 */
export const loadDraft = (userInfo?: UserInformation | null): string | null => {
    const key = getUserSpecificKey(userInfo);
    return localStorage.getItem(key);
};

/**
 * Saves a post-draft to localStorage
 * @param values The form values containing the message to save
 * @param userInfo The user information object
 */
export const saveDraft = (values: PostFormData, userInfo?: UserInformation | null): void => {
    const key = getUserSpecificKey(userInfo);
    localStorage.setItem(key, values.message.trim());
};

/**
 * Clears a post-draft from localStorage
 * @param userInfo The user information object
 */
export const clearDraft = (userInfo?: UserInformation | null): void => {
    const key = getUserSpecificKey(userInfo);
    localStorage.removeItem(key);
};
