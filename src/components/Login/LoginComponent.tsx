import React, {useState} from 'react';
import {Formik, Form, Field, ErrorMessage} from 'formik';
import * as Yup from 'yup';
import {apiLogin} from '../../services/UserService';
import {useAuthContext} from '../../context/AuthContext';
import './LoginComponent.css';

// Define validation schema using Yup
const validationSchema = Yup.object({
    email: Yup.string()
        .email('Email is invalid')
        .required('Email is required'),
    password: Yup.string()
        .required('Password is required'),
});

interface LoginFormData {
    email: string;
    password: string;
}

const LoginComponent: React.FC = () => {
    const { isAuthenticated, userInformation, login, logout } = useAuthContext();
    const [error, setError] = useState<string | null>(null);
    const [isLoginFormVisible, setIsLoginFormVisible] = useState(false);

    const initialValues: LoginFormData = {
        email: '',
        password: '',
    };

    const handleSubmit = async (values: LoginFormData, {setSubmitting, resetForm}: any) => {
        try {
            setError(null);
            const response = await apiLogin(values);

            // Get the token from the response (assuming it's in the response)
            // In a real app, the token might be in response.token or response.data.token
            const token = response.id || 'mock_token'; // Use a mock token if not available

            // Store the user data and token in the context
            login(token, {
                name: response.name,
                email: response.email
            });

            setIsLoginFormVisible(false);
            resetForm();
        } catch (err: any) {
            console.error('Login error:', err);
            setError(err.response?.data?.message || 'Login failed. Please try again.');
        } finally {
            setSubmitting(false);
        }
    };

    const handleLogout = () => {
        logout();
    };

    const toggleLoginForm = () => {
        setIsLoginFormVisible(!isLoginFormVisible);
        setError(null);
    };

    return (
        <div className="login-container">
            {isAuthenticated ? (
                <div className="user-info">
                    <span>Welcome, {userInformation?.name}!</span>
                    <button onClick={handleLogout} className="logout-button">Logout</button>
                </div>
            ) : (
                <>
                    <button onClick={toggleLoginForm} className="login-toggle-button">
                        {isLoginFormVisible ? 'Cancel' : 'Login'}
                    </button>

                    {isLoginFormVisible && (
                        <div className="login-form-container">
                            {error && <div className="error-message">{error}</div>}

                            <Formik
                                initialValues={initialValues}
                                validationSchema={validationSchema}
                                onSubmit={handleSubmit}
                            >
                                {({isSubmitting}) => (
                                    <Form className="login-form">
                                        <div className="form-group">
                                            <label htmlFor="email">Email</label>
                                            <Field
                                                type="email"
                                                id="email"
                                                name="email"
                                                disabled={isSubmitting}
                                            />
                                            <ErrorMessage name="email" component="div" className="error-message"/>
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="password">Password</label>
                                            <Field
                                                type="password"
                                                id="password"
                                                name="password"
                                                disabled={isSubmitting}
                                            />
                                            <ErrorMessage name="password" component="div" className="error-message"/>
                                        </div>

                                        <button
                                            type="submit"
                                            disabled={isSubmitting}
                                            className="submit-button"
                                        >
                                            {isSubmitting ? 'Logging in...' : 'Login'}
                                        </button>
                                    </Form>
                                )}
                            </Formik>
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default LoginComponent;
