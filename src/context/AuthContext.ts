import {createContext} from "react";
import {
    USER_TOKEN_KEY,
} from '../constants/authConstants.ts';
import type {AuthContextType, AuthState} from "../types/userTypes.ts";

const initialToken = localStorage.getItem(USER_TOKEN_KEY);

export const initialAuthState: AuthState = {
    isLoadingAuth: true,
    isAuthenticated: !!initialToken,
    userToken: initialToken,
};

export const AuthContext = createContext<AuthContextType | undefined>(undefined);
