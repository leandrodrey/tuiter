import {type JSX, useEffect} from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import LoginForm from '../components/Login/LoginForm';
import {useAuthContext} from "../context/useAuthContext.ts";
import './LoginPage.css';

const LoginPage = (): JSX.Element => {
    const {isAuthenticated} = useAuthContext();
    const location = useLocation();
    const navigate = useNavigate();

    // Get the return URL from location state or default to home page
    const from = location.state?.from?.pathname || '/';

    // If user is already authenticated, redirect to the return URL
    useEffect(() => {
        if (isAuthenticated) {
            navigate(from, {replace: true});
        }
    }, [isAuthenticated, navigate, from]);

    return (
        <div className="login-page-container">
            <div className="login-page-content">
                <h1>Login to Tuiter</h1>
                <p>Please login to access your account and use all features.</p>

                <div className="login-form-wrapper">
                    <LoginForm/>
                </div>

                <div className="login-page-footer">
                    <p>Don't have an account? <a href="/users/register">Register here</a></p>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
