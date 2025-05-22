import {type JSX} from 'react';
import {useNavigate} from 'react-router-dom';
import {Formik, Form, Field, ErrorMessage, type FormikHelpers} from 'formik';
import {apiCreateUser, type UserData} from '../../services/UserService.ts';
import {useToast} from "../../hooks/useToast.ts";
import {registrationValidationSchema as validationSchema, type RegistrationFormData, registrationInitialValues as initialValues} from '../../validations/userSchemas';

const UserRegistrationPage = (): JSX.Element => {
    const navigate = useNavigate();
    const toast = useToast();

    const handleSubmit = async (
        values: RegistrationFormData,
        {setSubmitting}: FormikHelpers<RegistrationFormData>
    ) => {
        try {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const {confirmPassword, username, ...rest} = values;

            const userData: UserData = {
                name: username,
                ...rest
            };

            await apiCreateUser(userData);

            toast.success('Registration successful! Please log in.');
            navigate('/login');
        } catch (err: unknown) {
            console.error('Registration error:', err);
            const errorMessage = err instanceof Error
                ? err.message
                : (err as {
                response?: { data?: { message?: string } }
            })?.response?.data?.message || 'Registration failed. Please try again.';
            toast.error(errorMessage);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="registration-container">
            <h1>Create an Account</h1>

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
