import {
    useState,
    useEffect,
    useCallback,
    type ReactNode
} from "react";
import {setHttpAuthToken} from '../utils/authUtils';
import {
    USER_TOKEN_KEY,
    USER_DATA_KEY,
} from '../constants/authConstants.ts';
import {AuthContext, initialAuthState} from "./AuthContext.ts";
import type {AuthContextType} from "../types/userTypes.ts";
import {apiLogin, type UserData} from '../services/UserService';
import {useToast} from "../hooks/context/useToast.ts";

setHttpAuthToken(initialAuthState.userToken);

export const AuthProvider = ({children}: { children: ReactNode }) => {
    const [isLoadingAuth, setIsLoadingAuth] = useState<boolean>(initialAuthState.isLoadingAuth);
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(initialAuthState.isAuthenticated);
    const [userToken, setUserTokenState] = useState<string | null>(initialAuthState.userToken);
    const toast = useToast();

    const logout = useCallback((): void => {
        setUserTokenState(null);
        setIsAuthenticated(false);

        localStorage.removeItem(USER_TOKEN_KEY);
        // UserProvider will handle removing user data from localStorage
        setHttpAuthToken(null);
        setIsLoadingAuth(false);
    }, [setUserTokenState, setIsAuthenticated, setIsLoadingAuth]);

    const login = (token: string): void => {
        setUserTokenState(token);
        setIsAuthenticated(true);

        localStorage.setItem(USER_TOKEN_KEY, token);
        setHttpAuthToken(token);
        setIsLoadingAuth(false);
    };

    const handleLoginSubmit = async (
        values: { email: string; password: string },
        formikHelpers: { setSubmitting: (isSubmitting: boolean) => void; resetForm: () => void }
    ): Promise<void> => {
        const {setSubmitting, resetForm} = formikHelpers;
        try {
            const response = await apiLogin(values as Omit<UserData, 'name'>);
            const token = response.token;

            // Store basic user data in localStorage for UserProvider to use
            localStorage.setItem(USER_DATA_KEY, JSON.stringify({
                name: response.name,
                email: response.email,
            }));

            login(token);

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

    useEffect(() => {
        if (!userToken) {
            setIsLoadingAuth(false);
        }
    }, [userToken]);

    // Context value
    const contextValue: AuthContextType = {
        isLoadingAuth,
        isAuthenticated,
        userToken,
        login,
        logout,
        handleLoginSubmit,
    };

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    );
};
