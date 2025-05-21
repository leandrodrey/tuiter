import ApiService from './ApiService';

export interface ProfileData {
    name?: string;
    avatar_url?: string;
    password?: string;

    [key: string]: string | undefined | unknown;
}

export interface ProfileResponse {
    id: string;
    name: string;
    avatar_url?: string;
}

// --- Get Profile ---
/**
 * Calls the API endpoint to get the user's profile.
 * @returns A promise that resolves with the user profile response from the API.
 */
export async function apiGetProfile() {
    return ApiService.fetchDataWithAxios<ProfileResponse>({
        url: '/me/profile',
        method: 'get'
    });
}

// --- Update Profile ---
/**
 * Calls the API endpoint to update the user's profile.
 * @param data The payload containing profile data (name, avatar_url, password).
 * @returns A promise that resolves with the profile update response from the API.
 */
export async function apiUpdateProfile(data: ProfileData) {
    return ApiService.fetchDataWithAxios<ProfileResponse>({
        url: '/me/profile',
        method: 'put',
        data
    });
}
