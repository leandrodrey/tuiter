import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {Formik, Form, Field, ErrorMessage, type FormikHelpers} from 'formik';
import * as Yup from 'yup';
import {apiCreateUser, type UserData} from '../services/UserService';

interface RegistrationFormData {
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
    avatar_url?: string;
}

const validationSchema = Yup.object({
    username: Yup.string()
        .trim()
        .required('Username is required'),
    email: Yup.string()
        .email('Email is invalid')
        .required('Email is required'),
    password: Yup.string()
        .min(6, 'Password must be at least 6 characters')
        .required('Password is required'),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref('password')], 'Passwords do not match')
        .required('Confirm password is required'),
    avatar_url: Yup.string()
});

const UserRegistrationPage: React.FC = () => {
    const [generalError, setGeneralError] = useState<string | null>(null);
    const navigate = useNavigate();

    const initialValues: RegistrationFormData = {
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        avatar_url: '',
    };

    const handleSubmit = async (
        values: RegistrationFormData,
        {setSubmitting}: FormikHelpers<RegistrationFormData>
    ) => {
        try {
            setGeneralError(null);

            const {confirmPassword, username, ...rest} = values;

            const userData: UserData = {
                name: username,
                ...rest
            };

            await apiCreateUser(userData);

            alert('Registration successful! Please log in.');
            navigate('/login');
        } catch (err: any) {
            console.error('Registration error:', err);
            setGeneralError(err.response?.data?.message || 'Registration failed. Please try again.');
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="registration-container">
            <h1>Create an Account</h1>

            {generalError && (
                <div className="error-message general">{generalError}</div>
            )}

            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {({isSubmitting}) => (
                    <Form>
                        <div className="form-group">
                            <label htmlFor="username">Username</label>
                            <Field
                                type="text"
                                id="username"
                                name="username"
                                disabled={isSubmitting}
                            />
                            <ErrorMessage name="username" component="div" className="error-message"/>
                        </div>

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

                        <div className="form-group">
                            <label htmlFor="confirmPassword">Confirm Password</label>
                            <Field
                                type="password"
                                id="confirmPassword"
                                name="confirmPassword"
                                disabled={isSubmitting}
                            />
                            <ErrorMessage name="confirmPassword" component="div" className="error-message"/>
                        </div>

                        <div className="form-group">
                            <label htmlFor="avatar_url">Avatar URL (optional)</label>
                            <Field
                                type="text"
                                id="avatar_url"
                                name="avatar_url"
                                disabled={isSubmitting}
                                placeholder="https://example.com/avatar.jpg"
                            />
                            <ErrorMessage name="avatar_url" component="div" className="error-message"/>
                        </div>

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="submit-button"
                        >
                            {isSubmitting ? 'Registering...' : 'Register'}
                        </button>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default UserRegistrationPage;
