/**
 * API-related interfaces for the application
 */

/**
 * Tuit API interfaces
 */

/**
 * Data required to create a new tuit
 * @interface TuitData
 */
export interface TuitData {
    /** The message content of the tuit */
    message: string;

    /** Additional properties that might be included */
    [key: string]: string | unknown;
}

/**
 * Response structure for a tuit from the API
 * @interface TuitResponse
 */
export interface TuitResponse {
    /** Unique identifier for the tuit */
    id: number;
    /** The message content of the tuit */
    message: string;
    /** Username of the tuit author */
    author: string;
    /** URL to the author's avatar image */
    avatar_url: string;
    /** Date when the tuit was created */
    date: string;
    /** Whether the current user has liked this tuit */
    liked: boolean;
    /** Number of likes the tuit has received */
    likes: number;
    /** ID of the parent tuit if this is a reply, 0 if it's a top-level tuit */
    parent_id: number;
    /** Number of replies to this tuit */
    replies_count?: number;
}

/**
 * Feed API interfaces
 */

/**
 * Parameters for fetching the feed
 * @interface FeedParams
 */
export interface FeedParams {
    /** Page number for pagination */
    page?: number;
    /** Whether to include only parent tuits (not replies) */
    only_parents?: boolean;
}

/**
 * Profile API interfaces
 */

/**
 * Data for updating a user profile
 * @interface ProfileData
 */
export interface ProfileData {
    /** User's display name */
    name?: string;
    /** URL to the user's avatar image */
    avatar_url?: string;
    /** User's password (for updates) */
    password?: string;
    /** Additional properties that might be included */
    [key: string]: string | number | boolean | null | undefined;
}

/**
 * Response structure for a user profile from the API
 * @interface ProfileResponse
 */
export interface ProfileResponse {
    /** Unique identifier for the user */
    id: string;
    /** User's display name */
    name: string;
    /** URL to the user's avatar image */
    avatar_url?: string;
    /** User's email address */
    email?: string;
}

/**
 * User API interfaces
 */

/**
 * Data required to create a new user
 * @interface UserData
 */
export interface UserData {
    /** User's display name */
    name: string;
    /** User's email address */
    email: string;
    /** User's password */
    password: string;
    /** URL to the user's avatar image */
    avatar_url?: string;

    /** Additional properties that might be included */
    [key: string]: string | number | boolean | null | undefined;
}

/**
 * Response structure for a user from the API
 * @interface UserResponse
 */
export interface UserResponse {
    /** Unique identifier for the user */
    id: string;
    /** User's display name */
    name: string;
    /** User's email address */
    email: string;
    /** Authentication token for the user */
    token: string;
}

/**
 * Generic API Response interfaces
 */

/**
 * Generic success response from the API
 * @interface SuccessResponse
 */
export interface SuccessResponse {
    /** Whether the operation was successful */
    success: boolean;
}

/**
 * API Error structure
 * @interface ApiError
 */
export interface ApiError {
    /** Response object from the API */
    response?: {
        /** HTTP status code */
        status?: number;
        /** Response data */
        data?: {
            /** Error message */
            message?: string
        }
    };
}
