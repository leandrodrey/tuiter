import React from 'react';
import {Navigate, useLocation} from 'react-router-dom';
import {useAuthContext} from '../hooks/useAuthContext.ts';

interface AuthGuardProps {
    children: React.ReactNode;
}

const AuthGuard: React.FC<AuthGuardProps> = ({children}) => {
    const {isAuthenticated} = useAuthContext();
    const location = useLocation();

    if (!isAuthenticated) {
        // Redirect to login page
        return <Navigate to="/login" state={{from: location}} replace/>;
    }

    return <>{children}</>;
};

export default AuthGuard;
