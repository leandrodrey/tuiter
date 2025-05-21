import {
    useState,
    useEffect,
    type ReactNode, createContext
} from "react";
import {setHttpAuthToken} from '../utils/authUtils';
import {
    USER_TOKEN_KEY,
    USER_DATA_KEY,
    type UserInformation,
    type AuthState,
    type AuthContextType
} from '../constants/authConstants.ts';

const initialToken = localStorage.getItem(USER_TOKEN_KEY);
const initialUserData = JSON.parse(localStorage.getItem(USER_DATA_KEY) || 'null') as UserInformation | null;

setHttpAuthToken(initialToken);

const initialAuthState: AuthState = {
    isLoadingAuth: true,
    isAuthenticated: !!initialToken,
    userToken: initialToken,
    userInformation: initialUserData,
};

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({children}: { children: ReactNode }) => {
    const [isLoadingAuth, setIsLoadingAuth] = useState<boolean>(initialAuthState.isLoadingAuth);
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(initialAuthState.isAuthenticated);
    const [userToken, setUserTokenState] = useState<string | null>(initialAuthState.userToken);
    const [userInformation, setUserInformationState] = useState<UserInformation | null>(initialAuthState.userInformation);

    // Obtiene la información del usuario desde la API
    const getUserInformationAPI = async (): Promise<UserInformation | null> => {
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
            if ((error as any)?.response?.status === 401) {
                logout();
            }
            return null;
        } finally {
            setIsLoadingAuth(false);
        }
    };

    const login = (token: string, userData: UserInformation): void => {
        setUserTokenState(token);
        setUserInformationState(userData);
        setIsAuthenticated(true);

        localStorage.setItem(USER_TOKEN_KEY, token);
        localStorage.setItem(USER_DATA_KEY, JSON.stringify(userData));
        setHttpAuthToken(token);
        setIsLoadingAuth(false);
    };

    const logout = (): void => {
        setUserTokenState(null);
        setUserInformationState(null);
        setIsAuthenticated(false);

        localStorage.removeItem(USER_TOKEN_KEY);
        localStorage.removeItem(USER_DATA_KEY);
        setHttpAuthToken(null);
        setIsLoadingAuth(false);
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
    }, []);

    // Context value
    const contextValue: AuthContextType = {
        isLoadingAuth,
        isAuthenticated,
        userToken,
        userInformation,
        login,
        logout,
    };

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    );
};
