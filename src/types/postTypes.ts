import type {TuitResponse} from './apiTypes';

// Extended post with UI-specific properties
export interface Post extends TuitResponse {
    // Additional properties for UI display
    author?: string;
    avatar_url?: string;
    likes_count?: number;
    is_liked?: boolean;
}
