import {useState, type JSX} from 'react';
import {type FormikHelpers} from 'formik';
import {apiLogin, type UserData} from '../../services/UserService';
import {useAuthContext} from '../../hooks/context/useAuthContext.ts';
import './LoginForm.css';
import {useToast} from "../../hooks/context/useToast.ts";
import type {LoginFormData} from "../../types/formTypes.ts";
import UserInfo from './UserInfo';
import LoginFormFields from './LoginFormFields';
import LoginToggleButton from './LoginToggleButton';

const LoginForm = (): JSX.Element => {
    const {isAuthenticated, userInformation, login, logout} = useAuthContext();
    const toast = useToast();
    const [isLoginFormVisible, setIsLoginFormVisible] = useState(false);

    const handleSubmit = async (values: LoginFormData, {setSubmitting, resetForm}: FormikHelpers<LoginFormData>) => {
        try {
            const response = await apiLogin(values as Omit<UserData, 'name'>);
            const token = response.token;
            login(token, {
                name: response.name,
                email: response.email
            });
            toast.success(`Welcome back, ${response.name}!`);
            setIsLoginFormVisible(false);
            resetForm();
        } catch (err: unknown) {
            console.error('Login error:', err);
            const errorMessage = err instanceof Error
                ? err.message
                : (err as {
                response?: { data?: { message?: string } }
            })?.response?.data?.message || 'Login failed. Please try again.';
            toast.error(errorMessage);
        } finally {
            setSubmitting(false);
        }
    };
    const toggleLoginForm = () => {
        setIsLoginFormVisible(!isLoginFormVisible);
    };

    return (
        <div className="login-container">
            {isAuthenticated ? (
                <UserInfo
                    userInformation={userInformation}
                    onLogout={logout}
                />
            ) : (
                <>
                    <LoginToggleButton
                        isLoginFormVisible={isLoginFormVisible}
                        onToggle={toggleLoginForm}
                    />

                    {isLoginFormVisible && (
                        <LoginFormFields onSubmit={handleSubmit}/>
                    )}
                </>
            )}
        </div>
    );
};

export default LoginForm;
