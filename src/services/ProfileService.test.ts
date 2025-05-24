import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { apiGetProfile, apiUpdateProfile } from './ProfileService';
import ApiService from './ApiService';
import type { ProfileResponse, ProfileData } from '../types/apiTypes';

// Mock ApiService
vi.mock('./ApiService', () => ({
  default: {
    fetchDataWithAxios: vi.fn(),
  },
}));

describe('ProfileService', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe('apiGetProfile', () => {
    it('should call ApiService.fetchDataWithAxios with correct parameters', async () => {
      // Arrange
      const mockResponse: ProfileResponse = {
        id: '123',
        name: 'Test User',
        avatar_url: 'https://example.com/avatar.jpg',
        email: 'test@example.com'
      };

      (ApiService.fetchDataWithAxios as vi.Mock).mockResolvedValueOnce(mockResponse);

      // Act
      const result = await apiGetProfile();

      // Assert
      expect(ApiService.fetchDataWithAxios).toHaveBeenCalledWith({
        url: '/me/profile',
        method: 'get'
      });
      expect(result).toEqual(mockResponse);
    });

    it('should handle API errors correctly', async () => {
      // Arrange
      const mockError = new Error('API Error');

      (ApiService.fetchDataWithAxios as vi.Mock).mockRejectedValueOnce(mockError);

      // Act & Assert
      await expect(apiGetProfile()).rejects.toThrow('API Error');
      expect(ApiService.fetchDataWithAxios).toHaveBeenCalled();
    });
  });

  describe('apiUpdateProfile', () => {
    it('should call ApiService.fetchDataWithAxios with correct parameters', async () => {
      // Arrange
      const mockResponse: ProfileResponse = {
        id: '123',
        name: 'Updated User',
        avatar_url: 'https://example.com/new-avatar.jpg',
        email: 'test@example.com'
      };

      const profileData: ProfileData = {
        name: 'Updated User',
        avatar_url: 'https://example.com/new-avatar.jpg'
      };

      (ApiService.fetchDataWithAxios as vi.Mock).mockResolvedValueOnce(mockResponse);

      // Act
      const result = await apiUpdateProfile(profileData);

      // Assert
      expect(ApiService.fetchDataWithAxios).toHaveBeenCalledWith({
        url: '/me/profile',
        method: 'put',
        data: profileData
      });
      expect(result).toEqual(mockResponse);
    });

    it('should handle password updates correctly', async () => {
      // Arrange
      const mockResponse: ProfileResponse = {
        id: '123',
        name: 'Test User',
        email: 'test@example.com'
      };

      const profileData: ProfileData = {
        password: 'newPassword123'
      };

      (ApiService.fetchDataWithAxios as vi.Mock).mockResolvedValueOnce(mockResponse);

      // Act
      await apiUpdateProfile(profileData);

      // Assert
      expect(ApiService.fetchDataWithAxios).toHaveBeenCalledWith({
        url: '/me/profile',
        method: 'put',
        data: profileData
      });
    });

    it('should handle API errors correctly', async () => {
      // Arrange
      const mockError = new Error('API Error');
      const profileData: ProfileData = {
        name: 'Updated User'
      };

      (ApiService.fetchDataWithAxios as vi.Mock).mockRejectedValueOnce(mockError);

      // Act & Assert
      await expect(apiUpdateProfile(profileData)).rejects.toThrow('API Error');
      expect(ApiService.fetchDataWithAxios).toHaveBeenCalled();
    });
  });
});
