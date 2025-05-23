import {useState, useEffect, type JSX} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import {Formik, Form, Field, ErrorMessage, type FormikHelpers} from 'formik';
import {apiGetProfile, apiUpdateProfile} from '../../services/ProfileService.ts';
import type {ProfileData} from '../../services/ProfileService.ts';
import {
    userEditValidationSchema as validationSchema,
    type UserFormData,
    userEditEmptyValues as emptyValues
} from '../../validations/userSchemas';
import {Loader, PageHeader} from '../../components/UI';
import {useToast} from "../../hooks/context/useToast.ts";

const UserEditPage = (): JSX.Element => {
    const [initialValues, setInitialValues] = useState<UserFormData>(emptyValues);
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const navigate = useNavigate();
    const {userId} = useParams<{ userId: string }>();
    const toast = useToast();

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

            toast.success('Profile updated successfully!');
            navigate('/'); // Redirect to home page
        } catch (err: unknown) {
            console.error('Update error:', err);
            const errorMessage = err instanceof Error
                ? err.message
                : (err as {
                response?: { data?: { message?: string } }
            })?.response?.data?.message || 'Update failed. Please try again.';
            setError(errorMessage);
            toast.error(errorMessage);
        } finally {
            setSubmitting(false);
        }
    };

    if (isLoading) {
        return <Loader text="Loading user data..." fullScreen={true}/>;
    }

    return (
        <div>
            <PageHeader title="Edit Profile"/>

            <div className="max-w-2xl mx-auto bg-gray-900 border border-gray-800 rounded-2xl p-6 shadow-lg">
                {error && (
                    <div className="p-4 mb-6 text-red-400 bg-red-900/20 rounded-lg border border-red-800/50 flex items-center">
                        <svg className="w-5 h-5 mr-2 text-red-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zm-1 9a1 1 0 01-1-1v-4a1 1 0 112 0v4a1 1 0 01-1 1z" clipRule="evenodd"></path>
                        </svg>
                        {error}
                    </div>
                )}

                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                    enableReinitialize
                >
                    {({isSubmitting, values}) => (
                        <Form className="space-y-6">
                            <div className="relative">
                                <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">Username</label>
                                <Field
                                    type="text"
                                    id="name"
                                    name="name"
                                    disabled={isSubmitting}
                                    className="w-full p-3 bg-gray-800 border border-gray-700 rounded-md focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 text-white placeholder-gray-500 transition-colors"
                                />
                                <ErrorMessage name="name">
                                    {(msg) => (
                                        <div className="mt-1 text-red-400 text-xs">{msg}</div>
                                    )}
                                </ErrorMessage>
                            </div>

                            <div className="relative">
                                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">Email</label>
                                <Field
                                    type="email"
                                    id="email"
                                    name="email"
                                    disabled={isSubmitting}
                                    className="w-full p-3 bg-gray-800 border border-gray-700 rounded-md focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 text-white placeholder-gray-500 transition-colors"
                                />
                                <ErrorMessage name="email">
                                    {(msg) => (
                                        <div className="mt-1 text-red-400 text-xs">{msg}</div>
                                    )}
                                </ErrorMessage>
                            </div>

                            <div className="relative">
                                <label htmlFor="avatar_url" className="block text-sm font-medium text-gray-300 mb-2">Avatar URL</label>
                                <Field
                                    type="text"
                                    id="avatar_url"
                                    name="avatar_url"
                                    disabled={isSubmitting}
                                    placeholder="https://example.com/avatar.jpg"
                                    className="w-full p-3 bg-gray-800 border border-gray-700 rounded-md focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 text-white placeholder-gray-500 transition-colors"
                                />
                                <ErrorMessage name="avatar_url">
                                    {(msg) => (
                                        <div className="mt-1 text-red-400 text-xs">{msg}</div>
                                    )}
                                </ErrorMessage>
                            </div>

                            <div className="pt-6 border-t border-gray-800">
                                <h3 className="text-lg font-medium text-white mb-4">Change Password</h3>

                                <div className="relative mb-4">
                                    <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">New Password (leave blank to keep current)</label>
                                    <Field
                                        type="password"
                                        id="password"
                                        name="password"
                                        disabled={isSubmitting}
                                        className="w-full p-3 bg-gray-800 border border-gray-700 rounded-md focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 text-white placeholder-gray-500 transition-colors"
                                    />
                                    <ErrorMessage name="password">
                                        {(msg) => (
                                            <div className="mt-1 text-red-400 text-xs">{msg}</div>
                                        )}
                                    </ErrorMessage>
                                </div>

                                <div className="relative">
                                    <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-300 mb-2">Confirm New Password</label>
                                    <Field
                                        type="password"
                                        id="confirmPassword"
                                        name="confirmPassword"
                                        disabled={isSubmitting || !values.password}
                                        className="w-full p-3 bg-gray-800 border border-gray-700 rounded-md focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 text-white placeholder-gray-500 transition-colors disabled:bg-gray-900 disabled:border-gray-800 disabled:text-gray-600"
                                    />
                                    <ErrorMessage name="confirmPassword">
                                        {(msg) => (
                                            <div className="mt-1 text-red-400 text-xs">{msg}</div>
                                        )}
                                    </ErrorMessage>
                                </div>
                            </div>

                            <div className="pt-6">
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full px-4 py-3 bg-blue-500 hover:bg-blue-600 text-white font-bold rounded-full transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {isSubmitting ? (
                                        <div className="flex items-center justify-center">
                                            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            Updating...
                                        </div>
                                    ) : 'Update Profile'}
                                </button>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
};

export default UserEditPage;
