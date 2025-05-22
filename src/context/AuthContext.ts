import {createContext} from "react";
import {
    USER_TOKEN_KEY,
    USER_DATA_KEY,
    type UserInformation,
    type AuthState,
    type AuthContextType
} from '../constants/authConstants.ts';

const initialToken = localStorage.getItem(USER_TOKEN_KEY);
const initialUserData = JSON.parse(localStorage.getItem(USER_DATA_KEY) || 'null') as UserInformation | null;

export const initialAuthState: AuthState = {
    isLoadingAuth: true,
    isAuthenticated: !!initialToken,
    userToken: initialToken,
    userInformation: initialUserData,
};

export const AuthContext = createContext<AuthContextType | undefined>(undefined);
