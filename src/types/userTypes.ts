// User-related interfaces

// Basic user information
export interface UserInformation {
    name?: string;
    email?: string;

    [key: string]: string | number | boolean | null | undefined;
}

// Authentication state
export interface AuthState {
    isLoadingAuth: boolean;
    isAuthenticated: boolean;
    userToken: string | null;
    userInformation: UserInformation | null;
}

// Authentication context
export interface AuthContextType extends AuthState {
    login: (token: string, userData: UserInformation) => void;
    logout: () => void;
}

// Favorite user
export interface FavoriteUser {
    author: string;
    avatar_url: string;
}
