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

// --- API Error ---
export interface ApiError {
    response?: {
        status?: number;
        data?: {
            message?: string
        }
    };
}
