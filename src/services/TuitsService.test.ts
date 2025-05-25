import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import {
  apiCreateTuit,
  apiGetTuit,
  apiAddLikeToTuit,
  apiRemoveLikeFromTuit,
  apiGetTuitReplies,
  apiAddReplyToTuit
} from './TuitsService';
import ApiService from './ApiService';
import type { TuitResponse, TuitData, SuccessResponse } from '../types/apiTypes';

// Mock ApiService
vi.mock('./ApiService', () => ({
  default: {
    fetchDataWithAxios: vi.fn(),
  },
}));

describe('TuitsService', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe('apiCreateTuit', () => {
    it('should call ApiService.fetchDataWithAxios with correct parameters', async () => {
      // Arrange
      const mockResponse: TuitResponse = {
        id: 1,
        message: 'Test message',
        author: 'Test Author',
        avatar_url: 'https://example.com/avatar.jpg',
        date: '2023-05-23T12:00:00Z',
        liked: false,
        likes: 0,
        parent_id: 0
      };

      const tuitData: TuitData = {
        message: 'Test message'
      };

      (ApiService.fetchDataWithAxios as vi.Mock).mockResolvedValueOnce(mockResponse);

      // Act
      const result = await apiCreateTuit(tuitData);

      // Assert
      expect(ApiService.fetchDataWithAxios).toHaveBeenCalledWith({
        url: '/me/tuits',
        method: 'post',
        data: tuitData,
        params: {}
      });
      expect(result).toEqual(mockResponse);
    });

    it('should handle API errors correctly', async () => {
      // Arrange
      const mockError = new Error('API Error');
      const tuitData: TuitData = {
        message: 'Test message'
      };

      (ApiService.fetchDataWithAxios as vi.Mock).mockRejectedValueOnce(mockError);

      // Act & Assert
      await expect(apiCreateTuit(tuitData)).rejects.toThrow('API Error');
      expect(ApiService.fetchDataWithAxios).toHaveBeenCalled();
    });
  });

  describe('apiGetTuit', () => {
    it('should call ApiService.fetchDataWithAxios with correct parameters', async () => {
      // Arrange
      const mockResponse: TuitResponse = {
        id: 1,
        message: 'Test message',
        author: 'Test Author',
        avatar_url: 'https://example.com/avatar.jpg',
        date: '2023-05-23T12:00:00Z',
        liked: false,
        likes: 0,
        parent_id: 0
      };

      const tuitId = 1;

      (ApiService.fetchDataWithAxios as vi.Mock).mockResolvedValueOnce(mockResponse);

      // Act
      const result = await apiGetTuit(tuitId);

      // Assert
      expect(ApiService.fetchDataWithAxios).toHaveBeenCalledWith({
        url: `/me/tuits/${tuitId}`,
        method: 'get',
        params: {}
      });
      expect(result).toEqual(mockResponse);
    });

    it('should handle API errors correctly', async () => {
      // Arrange
      const mockError = new Error('API Error');
      const tuitId = 1;

      (ApiService.fetchDataWithAxios as vi.Mock).mockRejectedValueOnce(mockError);

      // Act & Assert
      await expect(apiGetTuit(tuitId)).rejects.toThrow('API Error');
      expect(ApiService.fetchDataWithAxios).toHaveBeenCalled();
    });
  });

  describe('apiAddLikeToTuit', () => {
    it('should call ApiService.fetchDataWithAxios with correct parameters', async () => {
      // Arrange
      const mockResponse: SuccessResponse = {
        success: true
      };

      const tuitId = 1;

      (ApiService.fetchDataWithAxios as vi.Mock).mockResolvedValueOnce(mockResponse);

      // Act
      const result = await apiAddLikeToTuit(tuitId);

      // Assert
      expect(ApiService.fetchDataWithAxios).toHaveBeenCalledWith({
        url: `/me/tuits/${tuitId}/likes`,
        method: 'post',
        params: {}
      });
      expect(result).toEqual(mockResponse);
    });

    it('should handle API errors correctly', async () => {
      // Arrange
      const mockError = new Error('API Error');
      const tuitId = 1;

      (ApiService.fetchDataWithAxios as vi.Mock).mockRejectedValueOnce(mockError);

      // Act & Assert
      await expect(apiAddLikeToTuit(tuitId)).rejects.toThrow('API Error');
      expect(ApiService.fetchDataWithAxios).toHaveBeenCalled();
    });
  });

  describe('apiRemoveLikeFromTuit', () => {
    it('should call ApiService.fetchDataWithAxios with correct parameters', async () => {
      // Arrange
      const mockResponse: SuccessResponse = {
        success: true
      };

      const tuitId = 1;

      (ApiService.fetchDataWithAxios as vi.Mock).mockResolvedValueOnce(mockResponse);

      // Act
      const result = await apiRemoveLikeFromTuit(tuitId);

      // Assert
      expect(ApiService.fetchDataWithAxios).toHaveBeenCalledWith({
        url: `/me/tuits/${tuitId}/likes`,
        method: 'delete',
        params: {}
      });
      expect(result).toEqual(mockResponse);
    });

    it('should handle API errors correctly', async () => {
      // Arrange
      const mockError = new Error('API Error');
      const tuitId = 1;

      (ApiService.fetchDataWithAxios as vi.Mock).mockRejectedValueOnce(mockError);

      // Act & Assert
      await expect(apiRemoveLikeFromTuit(tuitId)).rejects.toThrow('API Error');
      expect(ApiService.fetchDataWithAxios).toHaveBeenCalled();
    });
  });

  describe('apiGetTuitReplies', () => {
    it('should call ApiService.fetchDataWithAxios with correct parameters', async () => {
      // Arrange
      const mockResponse: TuitResponse[] = [
        {
          id: 2,
          message: 'Reply message',
          author: 'Reply Author',
          avatar_url: 'https://example.com/avatar2.jpg',
          date: '2023-05-23T13:00:00Z',
          liked: false,
          likes: 0,
          parent_id: 1
        }
      ];

      const tuitId = 1;

      (ApiService.fetchDataWithAxios as vi.Mock).mockResolvedValueOnce(mockResponse);

      // Act
      const result = await apiGetTuitReplies(tuitId);

      // Assert
      expect(ApiService.fetchDataWithAxios).toHaveBeenCalledWith({
        url: `/me/tuits/${tuitId}/replies`,
        method: 'get',
        params: {}
      });
      expect(result).toEqual(mockResponse);
    });

    it('should handle API errors correctly', async () => {
      // Arrange
      const mockError = new Error('API Error');
      const tuitId = 1;

      (ApiService.fetchDataWithAxios as vi.Mock).mockRejectedValueOnce(mockError);

      // Act & Assert
      await expect(apiGetTuitReplies(tuitId)).rejects.toThrow('API Error');
      expect(ApiService.fetchDataWithAxios).toHaveBeenCalled();
    });
  });

  describe('apiAddReplyToTuit', () => {
    it('should call ApiService.fetchDataWithAxios with correct parameters', async () => {
      // Arrange
      const mockResponse: TuitResponse = {
        id: 2,
        message: 'Reply message',
        author: 'Reply Author',
        avatar_url: 'https://example.com/avatar2.jpg',
        date: '2023-05-23T13:00:00Z',
        liked: false,
        likes: 0,
        parent_id: 1
      };

      const tuitId = 1;
      const replyData: TuitData = {
        message: 'Reply message'
      };

      (ApiService.fetchDataWithAxios as vi.Mock).mockResolvedValueOnce(mockResponse);

      // Act
      const result = await apiAddReplyToTuit(tuitId, replyData);

      // Assert
      expect(ApiService.fetchDataWithAxios).toHaveBeenCalledWith({
        url: `/me/tuits/${tuitId}/replies`,
        method: 'post',
        data: replyData,
        params: {}
      });
      expect(result).toEqual(mockResponse);
    });

    it('should handle API errors correctly', async () => {
      // Arrange
      const mockError = new Error('API Error');
      const tuitId = 1;
      const replyData: TuitData = {
        message: 'Reply message'
      };

      (ApiService.fetchDataWithAxios as vi.Mock).mockRejectedValueOnce(mockError);

      // Act & Assert
      await expect(apiAddReplyToTuit(tuitId, replyData)).rejects.toThrow('API Error');
      expect(ApiService.fetchDataWithAxios).toHaveBeenCalled();
    });
  });
});
