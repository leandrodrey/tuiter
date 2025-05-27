/**
 * User-related interfaces for managing user data and authentication
 */

/**
 * Basic user information structure
 * @interface UserInformation
 */
export interface UserInformation {
    /** User's display name */
    name?: string;
    /** User's email address */
    email?: string;
    /** URL to the user's avatar image */
    avatar_url?: string;

    /** Additional properties that might be included */
    [key: string]: string | number | boolean | null | undefined;
}

/**
 * Authentication state structure
 * @interface AuthState
 */
export interface AuthState {
    /** Whether authentication is currently in progress */
    isLoadingAuth: boolean;
    /** Whether the user is currently authenticated */
    isAuthenticated: boolean;
    /** The authentication token for the current user, or null if not authenticated */
    userToken: string | null;
}

/**
 * Authentication context with state and methods
 * @interface AuthContextType
 * @extends AuthState
 */
export interface AuthContextType extends AuthState {
    /**
     * Log in a user with the provided token
     * @param token - The authentication token
     */
    login: (token: string) => void;

    /**
     * Log out the current user
     */
    logout: () => void;

    /**
     * Handle login form submission
     * @param values - The login form values
     * @param formikHelpers - Formik helpers for form management
     * @returns A promise that resolves when the login process completes
     */
    handleLoginSubmit: (values: { email: string; password: string }, formikHelpers: {
        setSubmitting: (isSubmitting: boolean) => void;
        resetForm: () => void
    }) => Promise<void>;
}

/**
 * User state structure
 * @interface UserState
 */
export interface UserState {
    /** Whether user information is currently being loaded */
    isLoadingUser: boolean;
    /** The current user's information, or null if not available */
    userInformation: UserInformation | null;
}

/**
 * User context with state and methods
 * @interface UserContextType
 * @extends UserState
 */
export interface UserContextType extends UserState {
    /**
     * Fetch the current user's information
     * @returns A promise that resolves to the user information or null
     */
    getUserInformation: () => Promise<UserInformation | null>;

    /**
     * Update the current user's information
     * @param userData - Partial user data to update
     * @returns A promise that resolves to the updated user information or null
     */
    updateUserInformation: (userData: Partial<UserInformation>) => Promise<UserInformation | null>;
}

/**
 * Favorite user structure
 * @interface FavoriteUser
 */
export interface FavoriteUser {
    /** Username of the favorite user */
    author: string;
    /** URL to the favorite user's avatar image */
    avatar_url: string;
}
