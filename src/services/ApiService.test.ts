import {describe, it, expect, vi, beforeEach, afterEach} from 'vitest';
import ApiService from './ApiService';
import AxiosBase from './axios/AxiosBase';

// Mock AxiosBase
vi.mock('./axios/AxiosBase', () => ({
    default: vi.fn(),
}));

describe('ApiService', () => {
    beforeEach(() => {
        vi.resetAllMocks();
    });

    afterEach(() => {
        vi.clearAllMocks();
    });

    describe('fetchDataWithAxios', () => {
        it('should resolve with response data on successful request', async () => {
            // Arrange
            const mockResponse = {
                data: {id: 1, name: 'Test'},
            };

            // Mock AxiosBase to return a successful response
            (AxiosBase as unknown as vi.Mock).mockResolvedValueOnce(mockResponse);

            const requestConfig = {
                url: '/test',
                method: 'get',
            };

            // Act
            const result = await ApiService.fetchDataWithAxios(requestConfig);

            // Assert
            expect(AxiosBase).toHaveBeenCalledWith(requestConfig);
            expect(result).toEqual(mockResponse.data);
        });

        it('should reject with error on failed request', async () => {
            // Arrange
            const mockError = new Error('Network Error');

            // Mock AxiosBase to return a rejected promise
            (AxiosBase as unknown as vi.Mock).mockRejectedValueOnce(mockError);

            const requestConfig = {
                url: '/test',
                method: 'get',
            };

            // Act & Assert
            await expect(ApiService.fetchDataWithAxios(requestConfig)).rejects.toEqual(mockError);
            expect(AxiosBase).toHaveBeenCalledWith(requestConfig);
        });

        it('should pass request data correctly', async () => {
            // Arrange
            const mockResponse = {
                data: {success: true},
            };

            // Mock AxiosBase to return a successful response
            (AxiosBase as unknown as vi.Mock).mockResolvedValueOnce(mockResponse);

            const requestData = {name: 'Test User', email: 'test@example.com'};
            const requestConfig = {
                url: '/users',
                method: 'post',
                data: requestData,
            };

            // Act
            await ApiService.fetchDataWithAxios(requestConfig);

            // Assert
            expect(AxiosBase).toHaveBeenCalledWith(expect.objectContaining({
                url: '/users',
                method: 'post',
                data: requestData,
            }));
        });
    });
});
