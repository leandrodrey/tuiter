import ApiService from './ApiService';
import type { UserData, UserResponse } from '../types/apiTypes';

/**
 * Calls the API endpoint to create a new user.
 * @param data The payload containing user data (name, email, password).
 * @returns A promise that resolves with the user creation response from the API.
 */
export async function apiCreateUser(data: UserData) {
    return ApiService.fetchDataWithAxios<UserResponse>({
        url: '/users',
        method: 'post',
        data
    });
}

/**
 * Calls the API endpoint to login a user.
 * @param data The payload containing user credentials (email, password).
 * @returns A promise that resolves with the login response from the API.
 */
export async function apiLogin(data: Omit<UserData, 'name'>) {
    return ApiService.fetchDataWithAxios<UserResponse>({
        url: '/login',
        method: 'post',
        data
    });
}
