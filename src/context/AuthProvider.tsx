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
import type {AuthContextType, UserInformation} from "../types/userTypes.ts";
import {apiLogin, type UserData} from '../services/UserService';
import {useToast} from "../hooks/context/useToast.ts";

setHttpAuthToken(initialAuthState.userToken);

export const AuthProvider = ({children}: { children: ReactNode }) => {
    const [isLoadingAuth, setIsLoadingAuth] = useState<boolean>(initialAuthState.isLoadingAuth);
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(initialAuthState.isAuthenticated);
    const [userToken, setUserTokenState] = useState<string | null>(initialAuthState.userToken);
    const [userInformation, setUserInformationState] = useState<UserInformation | null>(initialAuthState.userInformation);
    const toast = useToast();

    const logout = useCallback((): void => {
        setUserTokenState(null);
        setUserInformationState(null);
        setIsAuthenticated(false);

        localStorage.removeItem(USER_TOKEN_KEY);
        localStorage.removeItem(USER_DATA_KEY);
        setHttpAuthToken(null);
        setIsLoadingAuth(false);
    }, [setUserTokenState, setUserInformationState, setIsAuthenticated, setIsLoadingAuth]);

    const getUserInformationAPI = useCallback(async (): Promise<UserInformation | null> => {
        if (!userToken) {
            console.warn("No user token available to fetch user information.");
            return null;
        }

        setIsLoadingAuth(true);
        try {
            const {apiGetProfile} = await import('../services/ProfileService');
            const profileData = await apiGetProfile();

            const userData: UserInformation = {
                name: profileData.name,
                ...(profileData.avatar_url && {avatar_url: profileData.avatar_url})
            };

            setUserInformationState(userData);
            localStorage.setItem(USER_DATA_KEY, JSON.stringify(userData));
            return userData;
        } catch (error) {
            console.error("Error loading user information from API:", error);

            interface ApiError {
                response?: {
                    status?: number;
                };
            }

            if ((error as ApiError)?.response?.status === 401) {
                logout();
            }
            return null;
        } finally {
            setIsLoadingAuth(false);
        }
    }, [userToken, logout, setIsLoadingAuth, setUserInformationState]);

    const login = (token: string, userData: UserInformation): void => {
        setUserTokenState(token);
        setUserInformationState(userData);
        setIsAuthenticated(true);

        localStorage.setItem(USER_TOKEN_KEY, token);
        localStorage.setItem(USER_DATA_KEY, JSON.stringify(userData));
        setHttpAuthToken(token);
        setIsLoadingAuth(false);
    };

    const handleLoginSubmit = async (
        values: { email: string; password: string },
        formikHelpers: { setSubmitting: (isSubmitting: boolean) => void; resetForm: () => void }
    ): Promise<void> => {
        const { setSubmitting, resetForm } = formikHelpers;
        try {
            const response = await apiLogin(values as Omit<UserData, 'name'>);
            const token = response.token;

            // First set basic user info from login response
            login(token, {
                name: response.name,
                email: response.email,
            });

            // Then fetch complete user info
            await getUserInformationAPI();

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
        const loadInitialData = async () => {
            if (userToken && !userInformation) {
                await getUserInformationAPI();
            } else {
                setIsLoadingAuth(false);
            }
        };

        loadInitialData();
    }, [getUserInformationAPI, userInformation, userToken]);

    // Context value
    const contextValue: AuthContextType = {
        isLoadingAuth,
        isAuthenticated,
        userToken,
        userInformation,
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
