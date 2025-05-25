import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { loadDraft, saveDraft, clearDraft } from './draftUtils';
import { DRAFT_STORAGE_KEY } from '../constants/storageConstants';
import type { PostFormData } from '../types/formTypes';
import type { UserInformation } from '../types/userTypes';

// Mock localStorage
const mockGetItem = vi.fn();
const mockSetItem = vi.fn();
const mockRemoveItem = vi.fn();

// Save original methods
const originalGetItem = Storage.prototype.getItem;
const originalSetItem = Storage.prototype.setItem;
const originalRemoveItem = Storage.prototype.removeItem;

describe('draftUtils', () => {
  beforeEach(() => {
    // Mock localStorage methods
    Storage.prototype.getItem = mockGetItem;
    Storage.prototype.setItem = mockSetItem;
    Storage.prototype.removeItem = mockRemoveItem;
  });

  afterEach(() => {
    // Restore original methods
    Storage.prototype.getItem = originalGetItem;
    Storage.prototype.setItem = originalSetItem;
    Storage.prototype.removeItem = originalRemoveItem;

    // Clear all mocks
    vi.clearAllMocks();
  });

  describe('loadDraft', () => {
    it('should load draft from localStorage with default key when no user info is provided', () => {
      // Mock localStorage.getItem to return a draft
      mockGetItem.mockReturnValue('Test draft message');

      const result = loadDraft();

      // Verify localStorage.getItem was called with the correct key
      expect(mockGetItem).toHaveBeenCalledWith(DRAFT_STORAGE_KEY);
      expect(result).toBe('Test draft message');
    });

    it('should load draft from localStorage with user-specific key when user info is provided', () => {
      // Mock localStorage.getItem to return a draft
      mockGetItem.mockReturnValue('User-specific draft message');

      const userInfo: UserInformation = {
        name: 'Test User',
        email: 'test@example.com',
        avatar_url: 'https://example.com/avatar.jpg'
      };

      const result = loadDraft(userInfo);

      // Verify localStorage.getItem was called with the correct key
      expect(mockGetItem).toHaveBeenCalledWith(`${DRAFT_STORAGE_KEY}_${userInfo.email}`);
      expect(result).toBe('User-specific draft message');
    });

    it('should return null when no draft exists', () => {
      // Mock localStorage.getItem to return null
      mockGetItem.mockReturnValue(null);

      const result = loadDraft();

      expect(result).toBeNull();
    });
  });

  describe('saveDraft', () => {
    it('should save draft to localStorage with default key when no user info is provided', () => {
      const formData: PostFormData = {
        message: '  Test draft message  ' // With extra spaces to test trim
      };

      saveDraft(formData);

      // Verify localStorage.setItem was called with the correct key and trimmed message
      expect(mockSetItem).toHaveBeenCalledWith(DRAFT_STORAGE_KEY, 'Test draft message');
    });

    it('should save draft to localStorage with user-specific key when user info is provided', () => {
      const formData: PostFormData = {
        message: 'User-specific draft message'
      };

      const userInfo: UserInformation = {
        name: 'Test User',
        email: 'test@example.com',
        avatar_url: 'https://example.com/avatar.jpg'
      };

      saveDraft(formData, userInfo);

      // Verify localStorage.setItem was called with the correct key
      expect(mockSetItem).toHaveBeenCalledWith(
        `${DRAFT_STORAGE_KEY}_${userInfo.email}`,
        'User-specific draft message'
      );
    });
  });

  describe('clearDraft', () => {
    it('should clear draft from localStorage with default key when no user info is provided', () => {
      clearDraft();

      // Verify localStorage.removeItem was called with the correct key
      expect(mockRemoveItem).toHaveBeenCalledWith(DRAFT_STORAGE_KEY);
    });

    it('should clear draft from localStorage with user-specific key when user info is provided', () => {
      const userInfo: UserInformation = {
        name: 'Test User',
        email: 'test@example.com',
        avatar_url: 'https://example.com/avatar.jpg'
      };

      clearDraft(userInfo);

      // Verify localStorage.removeItem was called with the correct key
      expect(mockRemoveItem).toHaveBeenCalledWith(`${DRAFT_STORAGE_KEY}_${userInfo.email}`);
    });
  });
});
