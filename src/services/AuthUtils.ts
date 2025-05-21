import { USER_TOKEN_KEY } from '../context/AuthContext';

/**
 * Gets the authentication headers for API requests
 * @returns An object with the Authorization and Application-Token headers
 */
export function getAuthHeaders() {
  const token = localStorage.getItem(USER_TOKEN_KEY);
  return {
    'Authorization': token || '',
    'Application-Token': import.meta.env.VITE_AUTH_TOKEN || ''
  };
}
