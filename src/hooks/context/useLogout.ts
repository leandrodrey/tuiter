import {useCallback} from 'react';
import {useAuthContext} from './useAuthContext';
import {useToast} from './useToast';

/**
 * Custom hook for handling logout functionality with toast notification.
 * Combines the logout function from AuthContext with a toast message.
 *
 * @param {() => void} [customLogout] - Optional custom logout function to call instead of the default
 * @returns {() => void} A function that handles logout and displays a toast message
 */
export const useLogout = (customLogout?: () => void): () => void => {
    const {logout} = useAuthContext();
    const toast = useToast();

    /**
     * Handles the logout action.
     * Calls either the custom logout function or the default logout function from AuthContext,
     * and displays a success message.
     */
    const handleLogout = useCallback(() => {
        if (customLogout) {
            customLogout();
        } else {
            logout();
        }
        toast.info('You have been logged out successfully');
    }, [customLogout, logout, toast]);

    return handleLogout;
};
