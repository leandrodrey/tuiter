// Form-related interfaces

// --- Login Form ---
export interface LoginFormData {
    email: string;
    password: string;

    [key: string]: string;
}

// --- User Registration Form ---
export interface RegistrationFormData {
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
    avatar_url?: string;
}

// --- User Edit Form ---
export interface UserFormData {
    name: string;
    email: string;
    avatar_url?: string;
    password?: string;
    confirmPassword?: string;
}

// --- Post Form ---
export interface PostFormData {
    message: string;
}

// --- Reply Form ---
export interface ReplyFormData {
    message: string;
}
