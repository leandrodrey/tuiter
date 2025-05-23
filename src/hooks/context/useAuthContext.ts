import {useContext} from 'react';
import type {AuthContextType} from "../../types/userTypes.ts";
import {AuthContext} from "../../context/AuthContext.ts";

/**
 * Custom hook to access the authentication context.
 * Provides access to authentication state and auth-related functions.
 * Must be used within an AuthProvider component.
 *
 * @returns {AuthContextType} The authentication context value
 * @throws {Error} If used outside of an AuthProvider
 */
export const useAuthContext = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuthContext must be used within an AuthProvider');
    }
    return context;
};
