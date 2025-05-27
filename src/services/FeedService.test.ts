import {describe, it, expect, vi, beforeEach, afterEach} from 'vitest';
import {apiGetFeed} from './FeedService';
import ApiService from './ApiService';
import type {TuitResponse} from '../types/apiTypes';

// Mock ApiService
vi.mock('./ApiService', () => ({
    default: {
        fetchDataWithAxios: vi.fn(),
    },
}));

describe('FeedService', () => {
    beforeEach(() => {
        vi.resetAllMocks();
    });

    afterEach(() => {
        vi.clearAllMocks();
    });

    describe('apiGetFeed', () => {
        it('should call ApiService.fetchDataWithAxios with correct parameters', async () => {
            // Arrange
            const mockResponse: TuitResponse[] = [
                {
                    id: 1,
                    message: 'Test message',
                    author: 'Test Author',
                    avatar_url: 'https://example.com/avatar.jpg',
                    date: '2023-05-23T12:00:00Z',
                    liked: false,
                    likes: 0,
                    parent_id: 0,
                    replies_count: 0
                }
            ];

            (ApiService.fetchDataWithAxios as vi.Mock).mockResolvedValueOnce(mockResponse);

            // Act
            const result = await apiGetFeed();

            // Assert
            expect(ApiService.fetchDataWithAxios).toHaveBeenCalledWith({
                url: '/me/feed',
                method: 'get',
                params: undefined
            });
            expect(result).toEqual(mockResponse);
        });

        it('should pass pagination parameters correctly', async () => {
            // Arrange
            const mockResponse: TuitResponse[] = [];
            const params = {page: 2, only_parents: true};

            (ApiService.fetchDataWithAxios as vi.Mock).mockResolvedValueOnce(mockResponse);

            // Act
            await apiGetFeed(params);

            // Assert
            expect(ApiService.fetchDataWithAxios).toHaveBeenCalledWith({
                url: '/me/feed',
                method: 'get',
                params
            });
        });

        it('should handle API errors correctly', async () => {
            // Arrange
            const mockError = new Error('API Error');

            (ApiService.fetchDataWithAxios as vi.Mock).mockRejectedValueOnce(mockError);

            // Act & Assert
            await expect(apiGetFeed()).rejects.toThrow('API Error');
            expect(ApiService.fetchDataWithAxios).toHaveBeenCalled();
        });
    });
});
