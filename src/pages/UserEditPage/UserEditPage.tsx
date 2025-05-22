import {useState, useEffect, type JSX} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import {Formik, Form, Field, ErrorMessage, type FormikHelpers} from 'formik';
import {apiGetProfile, apiUpdateProfile} from '../../services/ProfileService.ts';
import type {ProfileData} from '../../services/ProfileService.ts';
import {userEditValidationSchema as validationSchema, type UserFormData, userEditEmptyValues as emptyValues} from '../../validations/userSchemas';

const UserEditPage = (): JSX.Element => {
    const [initialValues, setInitialValues] = useState<UserFormData>(emptyValues);
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const navigate = useNavigate();
    const {userId} = useParams<{ userId: string }>();

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                setIsLoading(true);

                const profile = await apiGetProfile();

                // In a real app, you'd get the email from the profile response
                // For now, we'll mock it
                setInitialValues({
                    name: profile.name,
                    email: `user_${profile.id}@example.com`, // Mock email
                    avatar_url: profile.avatar_url || '',
                    password: '',
                    confirmPassword: ''
                });
            } catch (err: unknown) {
                console.error('Error fetching user data:', err);
                const errorMessage = err instanceof Error
                    ? err.message
                    : (err as {
                    response?: { data?: { message?: string } }
                })?.response?.data?.message || 'Failed to load user data. Please try again.';
                setError(errorMessage);
            } finally {
                setIsLoading(false);
            }
        };

        fetchUserData();
    }, [userId]);

    const handleSubmit = async (values: UserFormData, {setSubmitting}: FormikHelpers<UserFormData>) => {
        try {
            setError(null);

            // Only include password in the request if it's being changed
            const profileData: ProfileData = {
                name: values.name,
                avatar_url: values.avatar_url
            };

            if (values.password) {
                profileData.password = values.password;
            }

            await apiUpdateProfile(profileData);

            alert('Profile updated successfully!');
            navigate('/profile'); // Redirect to profile page
        } catch (err: unknown) {
            console.error('Update error:', err);
            const errorMessage = err instanceof Error
                ? err.message
                : (err as {
                response?: { data?: { message?: string } }
            })?.response?.data?.message || 'Update failed. Please try again.';
            setError(errorMessage);
        } finally {
            setSubmitting(false);
        }
    };

    if (isLoading) {
        return <div>Loading user data...</div>;
    }

    return (
        <div className="edit-profile-container">
            <h1>Edit Profile</h1>

            {error && (
                <div className="error-message general">{error}</div>
            )}

            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
                enableReinitialize
            >
                {({isSubmitting, values}) => (
                    <Form>
                        <div className="form-group">
                            <label htmlFor="name">Username</label>
                            <Field
                                type="text"
                                id="name"
                                name="name"
                                disabled={isSubmitting}
                            />
                            <ErrorMessage name="name" component="div" className="error-message"/>
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
                            <label htmlFor="avatar_url">Avatar URL</label>
                            <Field
                                type="text"
                                id="avatar_url"
                                name="avatar_url"
                                disabled={isSubmitting}
                                placeholder="https://example.com/avatar.jpg"
                            />
                            <ErrorMessage name="avatar_url" component="div" className="error-message"/>
                        </div>

                        <div className="form-group">
                            <label htmlFor="password">New Password (leave blank to keep current)</label>
                            <Field
                                type="password"
                                id="password"
                                name="password"
                                disabled={isSubmitting}
                            />
                            <ErrorMessage name="password" component="div" className="error-message"/>
                        </div>

                        <div className="form-group">
                            <label htmlFor="confirmPassword">Confirm New Password</label>
                            <Field
                                type="password"
                                id="confirmPassword"
                                name="confirmPassword"
                                disabled={isSubmitting || !values.password}
                            />
                            <ErrorMessage name="confirmPassword" component="div" className="error-message"/>
                        </div>

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="submit-button"
                        >
                            {isSubmitting ? 'Updating...' : 'Update Profile'}
                        </button>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default UserEditPage;
