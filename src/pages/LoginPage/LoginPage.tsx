import {type JSX, useEffect} from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import LoginForm from '../../components/LoginForm/LoginForm.tsx';
import {useAuthContext} from "../../hooks/context/useAuthContext.ts";

const LoginPage = (): JSX.Element => {
    const {isAuthenticated} = useAuthContext();
    const location = useLocation();
    const navigate = useNavigate();

    const from = location.state?.from?.pathname || '/';

    useEffect(() => {
        if (isAuthenticated) {
            navigate(from, {replace: true});
        }
    }, [isAuthenticated, navigate, from]);

    return (
        <div className="min-h-[calc(100vh-200px)] flex items-center justify-center px-4 py-12">
            <div className="w-full max-w-md">
                <LoginForm/>
            </div>
        </div>
    );
};

export default LoginPage;
