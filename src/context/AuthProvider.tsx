import {
    useState,
    useEffect,
    useCallback,
    type ReactNode, type JSX
} from "react";
import {setHttpAuthToken} from '../utils/authUtils';
import {
    USER_TOKEN_KEY,
} from '../constants/authConstants.ts';
import {AuthContext, initialAuthState} from "./AuthContext.ts";
import type {AuthContextType} from "../types/userTypes.ts";
import {apiLogin, type UserData} from '../services/UserService';
import {useToast} from "../hooks/context/useToast.ts";

setHttpAuthToken(initialAuthState.userToken);

/**
 * Authentication Provider component that manages authentication state and operations.
 * Provides login, logout functionality and authentication state to child components.
 * @param {Object} props - Component props
 * @param {ReactNode} props.children - Child components that will have access to auth context
 * @returns {JSX.Element} Provider component with auth context
 */
export const AuthProvider = ({children}: { children: ReactNode }): JSX.Element => {
    const [isLoadingAuth, setIsLoadingAuth] = useState<boolean>(initialAuthState.isLoadingAuth);
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(initialAuthState.isAuthenticated);
    const [userToken, setUserTokenState] = useState<string | null>(initialAuthState.userToken);
    const toast = useToast();

    /**
     * Handles user logout by clearing authentication state and token.
     * Removes the auth token from localStorage and resets the auth header.
     */
    const logout = useCallback((): void => {
        setUserTokenState(null);
        setIsAuthenticated(false);

        localStorage.removeItem(USER_TOKEN_KEY);
        setHttpAuthToken(null);
        setIsLoadingAuth(false);
    }, [setUserTokenState, setIsAuthenticated, setIsLoadingAuth]);

    /**
     * Sets the authentication token and updates the authentication state.
     * Stores the auth token in localStorage and sets the auth header.
     * @param {string} token - The authentication token to store
     */
    const setAuthToken = (token: string): void => {
        setUserTokenState(token);
        setIsAuthenticated(true);

        localStorage.setItem(USER_TOKEN_KEY, token);
        setHttpAuthToken(token);
        setIsLoadingAuth(false);
    };

    /**
     * Handles the login form submission process.
     * Attempts to authenticate the user with the provided credentials.
     * On success, updates the authentication state with the token.
     * On failure, displays an error message.
     *
     * @param {Object} values - The form values containing login credentials
     * @param {string} values.email - User's email address
     * @param {string} values.password - User's password
     * @param {Object} formikHelpers - Formik helper functions
     * @param {Function} formikHelpers.setSubmitting - Function to update form submission state
     * @param {Function} formikHelpers.resetForm - Function to reset the form
     * @returns {Promise<void>} A promise that resolves when the login process completes
     */
    const handleLogin = async (
        values: { email: string; password: string },
        formikHelpers: { setSubmitting: (isSubmitting: boolean) => void; resetForm: () => void }
    ): Promise<void> => {
        const {setSubmitting, resetForm} = formikHelpers;
        try {
            const response = await apiLogin(values as Omit<UserData, 'name'>);
            const token = response.token;

            setAuthToken(token);

            toast.success(`Welcome back, ${response.name}!`);
            resetForm();
        } catch (err: unknown) {
            console.error('Login error:', err);
            const errorMessage = err instanceof Error
                ? err.message
                : (err as {
                response?: { data?: { message?: string } }
            })?.response?.data?.message || 'Login failed. Please try again.';
            toast.error(errorMessage);
        } finally {
            setSubmitting(false);
        }
    };

    /**
     * Effect to update loading state when token changes.
     * Sets loading to false when there's no token.
     */
    useEffect(() => {
        if (!userToken) {
            setIsLoadingAuth(false);
        }
    }, [userToken]);

    /**
     * The authentication context value provided to consumers.
     * Contains all authentication state and functions.
     */
    const contextValue: AuthContextType = {
        isLoadingAuth,
        isAuthenticated,
        userToken,
        login: setAuthToken,
        logout,
        handleLoginSubmit: handleLogin,
    };

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    );
};
