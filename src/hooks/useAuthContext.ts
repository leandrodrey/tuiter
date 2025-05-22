import {useContext} from 'react';
import {AuthContext} from '../context/authContextCore';
import type {AuthContextType} from '../constants/authConstants';

export const useAuthContext = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuthContext must be used within an AuthProvider');
    }
    return context;
};
