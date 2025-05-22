import {DRAFT_STORAGE_KEY} from '../constants/storageConstants';
import type {PostFormData} from '../types/formTypes';

/**
 * Loads a post draft from localStorage
 * @returns The draft message or null if no draft exists
 */
export const loadDraft = (): string | null => {
    return localStorage.getItem(DRAFT_STORAGE_KEY);
};

/**
 * Saves a post draft to localStorage
 * @param values The form values containing the message to save
 */
export const saveDraft = (values: PostFormData): void => {
    localStorage.setItem(DRAFT_STORAGE_KEY, values.message);
};

/**
 * Clears a post draft from localStorage
 */
export const clearDraft = (): void => {
    localStorage.removeItem(DRAFT_STORAGE_KEY);
};
