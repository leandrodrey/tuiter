// --- Constants ---
export const USER_TOKEN_KEY = "user_token";
export const USER_DATA_KEY = "user_data";

// --- Types ---
export interface UserInformation {
    name?: string;
    email?: string;
    [key: string]: string | number | boolean | null | undefined;
}

export interface AuthState {
    isLoadingAuth: boolean;
    isAuthenticated: boolean;
    userToken: string | null;
    userInformation: UserInformation | null;
}

export interface AuthContextType extends AuthState {
    login: (token: string, userData: UserInformation) => void;
    logout: () => void;
}
