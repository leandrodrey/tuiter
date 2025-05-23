import {useContext} from 'react';
import type {UserContextType} from "../../types/userTypes.ts";
import {UserContext} from "../../context/UserContext.ts";

export const useUser = (): UserContextType => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error('useUser must be used within a UserProvider');
    }
    return context;
};
