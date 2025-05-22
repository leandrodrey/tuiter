import {useContext} from 'react';
import type {AuthContextType} from '../constants/authConstants';
import {AuthContext} from "../context/AuthContext.ts";

export const useAuthContext = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuthContext must be used within an AuthProvider');
    }
    return context;
};
