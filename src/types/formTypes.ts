/**
 * Form-related interfaces for handling user input in the application
 */

/**
 * Data structure for the login form
 * @interface LoginFormData
 */
export interface LoginFormData {
    /** User's email address */
    email: string;
    /** User's password */
    password: string;

    /** Additional form fields that might be included */
    [key: string]: string;
}

/**
 * Data structure for the user registration form
 * @interface RegistrationFormData
 */
export interface RegistrationFormData {
    /** User's chosen username */
    username: string;
    /** User's email address */
    email: string;
    /** User's chosen password */
    password: string;
    /** Password confirmation to ensure correct entry */
    confirmPassword: string;
    /** Optional URL to the user's avatar image */
    avatar_url?: string;
}

/**
 * Data structure for the user edit form
 * @interface UserFormData
 */
export interface UserFormData {
    /** User's display name */
    name: string;
    /** User's email address */
    email: string;
    /** Optional URL to the user's avatar image */
    avatar_url?: string;
    /** Optional new password (only when changing password) */
    password?: string;
    /** Optional password confirmation (only when changing password) */
    confirmPassword?: string;
}

/**
 * Data structure for creating a new post
 * @interface PostFormData
 */
export interface PostFormData {
    /** The message content of the post */
    message: string;
}

/**
 * Data structure for creating a reply to an existing post
 * @interface ReplyFormData
 */
export interface ReplyFormData {
    /** The message content of the reply */
    message: string;
}
