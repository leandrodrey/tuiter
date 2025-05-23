import {useContext} from 'react';
import type {UserContextType} from "../../types/userTypes.ts";
import {UserContext} from "../../context/UserContext.ts";

/**
 * Custom hook to access the user context.
 * Provides access to user information and user-related functions.
 * Must be used within a UserProvider component.
 *
 * @returns {UserContextType} The user context value
 * @throws {Error} If used outside of a UserProvider
 */
export const useUser = (): UserContextType => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error('useUser must be used within a UserProvider');
    }
    return context;
};
