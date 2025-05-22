import {createContext} from "react";
import {
    USER_TOKEN_KEY,
    USER_DATA_KEY,
} from '../constants/authConstants.ts';
import type {AuthContextType, AuthState, UserInformation} from "../types/userTypes.ts";

const initialToken = localStorage.getItem(USER_TOKEN_KEY);
const initialUserData = JSON.parse(localStorage.getItem(USER_DATA_KEY) || 'null') as UserInformation | null;

export const initialAuthState: AuthState = {
    isLoadingAuth: true,
    isAuthenticated: !!initialToken,
    userToken: initialToken,
    userInformation: initialUserData,
};

export const AuthContext = createContext<AuthContextType | undefined>(undefined);
