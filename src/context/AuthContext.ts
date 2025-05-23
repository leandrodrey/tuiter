import {createContext} from "react";
import {
    USER_TOKEN_KEY,
} from '../constants/authConstants.ts';
import type {AuthContextType, AuthState} from "../types/userTypes.ts";

/**
 * Initial token loaded from localStorage if available.
 */
const initialToken = localStorage.getItem(USER_TOKEN_KEY);

/**
 * Initial state for the authentication context.
 * Sets loading to true initially and determines authentication status based on token presence.
 */
export const initialAuthState: AuthState = {
    isLoadingAuth: true,
    isAuthenticated: !!initialToken,
    userToken: initialToken,
};

/**
 * React context for authentication-related state and operations.
 * Provides authentication status and functions to manage auth state.
 */
export const AuthContext = createContext<AuthContextType | undefined>(undefined);
