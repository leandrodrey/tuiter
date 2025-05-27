import {describe, it, expect, vi, beforeEach, afterEach} from 'vitest';
import {apiCreateUser, apiLogin} from './UserService';
import ApiService from './ApiService';
import type {UserData, UserResponse} from '../types/apiTypes';

// Mock ApiService
vi.mock('./ApiService', () => ({
    default: {
        fetchDataWithAxios: vi.fn(),
    },
}));

describe('UserService', () => {
    beforeEach(() => {
        vi.resetAllMocks();
    });

    afterEach(() => {
        vi.clearAllMocks();
    });

    describe('apiCreateUser', () => {
        it('should call ApiService.fetchDataWithAxios with correct parameters', async () => {
            // Arrange
            const mockResponse: UserResponse = {
                id: '123',
                name: 'Test User',
                email: 'test@example.com',
                token: 'test-token-123'
            };

            const userData: UserData = {
                name: 'Test User',
                email: 'test@example.com',
                password: 'password123'
            };

            (ApiService.fetchDataWithAxios as vi.Mock).mockResolvedValueOnce(mockResponse);

            // Act
            const result = await apiCreateUser(userData);

            // Assert
            expect(ApiService.fetchDataWithAxios).toHaveBeenCalledWith({
                url: '/users',
                method: 'post',
                data: userData
            });
            expect(result).toEqual(mockResponse);
        });

        it('should handle optional avatar_url field', async () => {
            // Arrange
            const mockResponse: UserResponse = {
                id: '123',
                name: 'Test User',
                email: 'test@example.com',
                token: 'test-token-123'
            };

            const userData: UserData = {
                name: 'Test User',
                email: 'test@example.com',
                password: 'password123',
                avatar_url: 'https://example.com/avatar.jpg'
            };

            (ApiService.fetchDataWithAxios as vi.Mock).mockResolvedValueOnce(mockResponse);

            // Act
            await apiCreateUser(userData);

            // Assert
            expect(ApiService.fetchDataWithAxios).toHaveBeenCalledWith({
                url: '/users',
                method: 'post',
                data: userData
            });
        });

        it('should handle API errors correctly', async () => {
            // Arrange
            const mockError = new Error('API Error');
            const userData: UserData = {
                name: 'Test User',
                email: 'test@example.com',
                password: 'password123'
            };

            (ApiService.fetchDataWithAxios as vi.Mock).mockRejectedValueOnce(mockError);

            // Act & Assert
            await expect(apiCreateUser(userData)).rejects.toThrow('API Error');
            expect(ApiService.fetchDataWithAxios).toHaveBeenCalled();
        });
    });

    describe('apiLogin', () => {
        it('should call ApiService.fetchDataWithAxios with correct parameters', async () => {
            // Arrange
            const mockResponse: UserResponse = {
                id: '123',
                name: 'Test User',
                email: 'test@example.com',
                token: 'test-token-123'
            };

            const loginData = {
                email: 'test@example.com',
                password: 'password123'
            };

            (ApiService.fetchDataWithAxios as vi.Mock).mockResolvedValueOnce(mockResponse);

            // Act
            const result = await apiLogin(loginData);

            // Assert
            expect(ApiService.fetchDataWithAxios).toHaveBeenCalledWith({
                url: '/login',
                method: 'post',
                data: loginData
            });
            expect(result).toEqual(mockResponse);
        });

        it('should handle API errors correctly', async () => {
            // Arrange
            const mockError = new Error('API Error');
            const loginData = {
                email: 'test@example.com',
                password: 'password123'
            };

            (ApiService.fetchDataWithAxios as vi.Mock).mockRejectedValueOnce(mockError);

            // Act & Assert
            await expect(apiLogin(loginData)).rejects.toThrow('API Error');
            expect(ApiService.fetchDataWithAxios).toHaveBeenCalled();
        });
    });
});
