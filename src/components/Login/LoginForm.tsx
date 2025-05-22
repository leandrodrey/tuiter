import {useState, type JSX} from 'react';
import {Formik, Form, Field, ErrorMessage, type FormikHelpers} from 'formik';
import {apiLogin, type UserData} from '../../services/UserService';
import {useAuthContext} from '../../hooks/useAuthContext.ts';
import './LoginForm.css';
import {useToast} from "../../hooks/useToast.ts";
import {loginValidationSchema as validationSchema, type LoginFormData, loginInitialValues as initialValues} from '../../validations/userSchemas';

const LoginForm = (): JSX.Element => {
    const {isAuthenticated, userInformation, login, logout} = useAuthContext();
    const toast = useToast();
    const [isLoginFormVisible, setIsLoginFormVisible] = useState(false);

    const handleSubmit = async (values: LoginFormData, {setSubmitting, resetForm}: FormikHelpers<LoginFormData>) => {
        try {
            const response = await apiLogin(values as Omit<UserData, 'name'>);

            const token = response.token;
            // Store the user data and token in the context
            login(token, {
                name: response.name,
                email: response.email
            });

            // Show success toast notification
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

            // Show error toast notification
            toast.error(errorMessage);
        } finally {
            setSubmitting(false);
        }
    };

    const handleLogout = () => {
        logout();
        toast.info('You have been logged out successfully');
    };

    const toggleLoginForm = () => {
        setIsLoginFormVisible(!isLoginFormVisible);
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

export default LoginForm;
