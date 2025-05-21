import ApiService from './ApiService';

export interface UserData {
  name?: string;
  email: string;
  password: string;
  [key: string]: string | undefined;
}

export interface UserResponse {
  id: string;
  name: string;
  email: string;
}

// --- Create User ---
/**
 * Calls the API endpoint to create a new user.
 * @param data The payload containing user data (name, email, password).
 * @returns A promise that resolves with the user creation response from the API.
 */
export async function apiCreateUser(data: UserData) {
  return ApiService.fetchDataWithAxios<UserResponse>({
    url: '/users',
    method: 'post',
    data,
    headers: {
      'Application-Token': import.meta.env.VITE_AUTH_TOKEN || ''
    }
  });
}

// --- Login ---
/**
 * Calls the API endpoint to login a user.
 * @param data The payload containing user credentials (email, password).
 * @returns A promise that resolves with the login response from the API.
 */
export async function apiLogin(data: Omit<UserData, 'name'>) {
  return ApiService.fetchDataWithAxios<UserResponse>({
    url: '/login',
    method: 'post',
    data,
    headers: {
      'Application-Token': import.meta.env.VITE_AUTH_TOKEN || ''
    }
  });
}
