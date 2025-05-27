import type {TuitResponse} from './apiTypes';

/**
 * Post type definitions for the application
 */

/**
 * Represents a post in the application
 *
 * This type directly uses TuitResponse since the API provides all needed fields
 * for displaying and interacting with posts.
 *
 * @see TuitResponse in apiTypes.ts for the complete structure
 */
export type Post = TuitResponse;
