// --- Constants ---
export const USER_TOKEN_KEY = "user_token";
export const USER_DATA_KEY = "user_data";

// --- Types ---
export interface UserInformation {
    name?: string;
    email?: string;
    // Add other user properties as needed
    [key: string]: string | number | boolean | null | undefined; // Specific types for additional properties
}

export interface AuthState {
    isLoadingAuth: boolean;
    isAuthenticated: boolean;
    userToken: string | null;
    userInformation: UserInformation | null;
}

export interface AuthContextType extends AuthState {
    isLoggedIn: () => boolean;
    getUserInformationAPI: () => Promise<UserInformation | null>;
    login: (token: string, userData: UserInformation) => void;
    logout: () => void;
}
