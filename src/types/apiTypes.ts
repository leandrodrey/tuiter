// API-related interfaces

// --- Tuit API ---
export interface TuitData {
    message: string;

    [key: string]: string | unknown;
}

export interface TuitResponse {
    id: string;
    message: string;
    user_id: string;
    created_at: string;
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
