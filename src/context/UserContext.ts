import {createContext} from "react";
import {USER_DATA_KEY} from '../constants/authConstants.ts';
import type {UserContextType, UserState, UserInformation} from "../types/userTypes.ts";

const initialUserData = JSON.parse(localStorage.getItem(USER_DATA_KEY) || 'null') as UserInformation | null;

export const initialUserState: UserState = {
    isLoadingUser: false,
    userInformation: initialUserData,
};

export const UserContext = createContext<UserContextType | undefined>(undefined);
