import {createContext} from "react";
import {USER_DATA_KEY} from '../constants/authConstants.ts';
import type {UserContextType, UserState, UserInformation} from "../types/userTypes.ts";

/**
 * Initial user data loaded from localStorage if available.
 */
const initialUserData = JSON.parse(localStorage.getItem(USER_DATA_KEY) || 'null') as UserInformation | null;

/**
 * Initial state for the user context.
 * Sets loading to false and initializes user information from localStorage.
 */
export const initialUserState: UserState = {
    isLoadingUser: false,
    userInformation: initialUserData,
};

/**
 * React context for user-related state and operations.
 * Provides user information and functions to manage user data.
 */
export const UserContext = createContext<UserContextType | undefined>(undefined);
