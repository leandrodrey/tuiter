// API-related interfaces

// --- Tuit API ---
export interface TuitData {
    message: string;

    [key: string]: string | unknown;
}

export interface TuitResponse {
    id: number;
    message: string;
    author: string;
    avatar_url: string;
    date: string;
    liked: boolean;
    likes: number;
    parent_id: number;
    replies_count?: number;
}

// --- Feed API ---
export interface FeedParams {
    page?: number;
    only_parents?: boolean;
}

// --- Profile API ---
export interface ProfileData {
    name?: string;
    avatar_url?: string;
    password?: string;

    [key: string]: string | number | boolean | null | undefined;
}

export interface ProfileResponse {
    id: string;
    name: string;
    avatar_url?: string;
    email?: string;
}

// --- User API ---
export interface UserData {
    name: string;
    email: string;
    password: string;
    avatar_url?: string;

    [key: string]: string | number | boolean | null | undefined;
}

export interface UserResponse {
    id: string;
    name: string;
    email: string;
    token: string;
}

// --- Generic API Responses ---
export interface SuccessResponse {
    success: boolean;
}

// --- API Error ---
export interface ApiError {
    response?: {
        status?: number;
        data?: {
            message?: string
        }
    };
}
