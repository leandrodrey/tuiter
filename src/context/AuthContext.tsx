import {createContext, useState, useContext, useEffect} from "react";

// Constants for local storage keys
export const USER_TOKEN_KEY = "user_token";
export const USER_DATA_KEY = "user_data";

// Initial auth state
const initialAuthState = {
    isLoadingAuth: true,
    isAuthenticated: false,
    userToken: localStorage.getItem(USER_TOKEN_KEY) || null,
    userInformation: JSON.parse(localStorage.getItem(USER_DATA_KEY) || 'null')
};

// Create the context
const AuthContext = createContext(initialAuthState);

// Custom hook to use the auth context
const useAuthContext = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuthContext must be used within an AuthProvider');
    }
    return context;
};

// Auth provider component
const AuthProvider = ({children}) => {
    const [isLoadingAuth, setIsLoadingAuth] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem(USER_TOKEN_KEY));
    const [userToken, setUserToken] = useState(initialAuthState.userToken);
    const [userInformation, setUserInformation] = useState(initialAuthState.userInformation);

    // Function to check if user is logged in
    const isLoggedIn = () => {
        return !!userToken;
    };

    // Function to get user information
    const getUserInformation = async () => {
        if (!userToken) return null;

        setIsLoadingAuth(true);
        try {
            // This would be replaced with an actual API call to get user data
            // For now, we'll just use what's in local storage
            const userData = userInformation || { name: "User", email: "user@example.com" };
            setUserInformation(userData);
            return userData;
        } catch (error) {
            console.error("Error loading user information:", error);
            return null;
        } finally {
            setIsLoadingAuth(false);
        }
    };

    // Function to login user
    const login = (token, userData) => {
        localStorage.setItem(USER_TOKEN_KEY, token);
        localStorage.setItem(USER_DATA_KEY, JSON.stringify(userData));
        setUserToken(token);
        setUserInformation(userData);
        setIsAuthenticated(true);
    };

    // Function to logout user
    const logout = () => {
        localStorage.removeItem(USER_TOKEN_KEY);
        localStorage.removeItem(USER_DATA_KEY);
        setUserToken(null);
        setUserInformation(null);
        setIsAuthenticated(false);
    };

    // Load initial data
    useEffect(() => {
        const loadInitialData = async () => {
            if (userToken && !userInformation) {
                await getUserInformation();
            } else {
                setIsLoadingAuth(false);
            }
        };
        loadInitialData();
    }, []);

    // Context value
    const contextValue = {
        isLoadingAuth,
        isAuthenticated,
        userToken,
        userInformation,
        isLoggedIn,
        getUserInformation,
        login,
        logout
    };

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    );
};

export {AuthContext, AuthProvider, useAuthContext};
