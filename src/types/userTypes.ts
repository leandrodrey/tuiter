// User-related interfaces

// Basic user information
export interface UserInformation {
    name?: string;
    email?: string;
    avatar_url?: string;

    [key: string]: string | number | boolean | null | undefined;
}

// Authentication state
export interface AuthState {
    isLoadingAuth: boolean;
    isAuthenticated: boolean;
    userToken: string | null;
}

// Authentication context
export interface AuthContextType extends AuthState {
    login: (token: string) => void;
    logout: () => void;
    handleLoginSubmit: (values: { email: string; password: string }, formikHelpers: { setSubmitting: (isSubmitting: boolean) => void; resetForm: () => void }) => Promise<void>;
}

// User state
export interface UserState {
    isLoadingUser: boolean;
    userInformation: UserInformation | null;
}

// User context
export interface UserContextType extends UserState {
    getUserInformation: () => Promise<UserInformation | null>;
    updateUserInformation: (userData: Partial<UserInformation>) => Promise<UserInformation | null>;
}

// Favorite user
export interface FavoriteUser {
    author: string;
    avatar_url: string;
}
