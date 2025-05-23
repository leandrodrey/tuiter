import {useState, useEffect, type JSX} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import {Formik, Form, Field, ErrorMessage, type FormikHelpers} from 'formik';
import {apiGetProfile, apiUpdateProfile} from '../../services/ProfileService.ts';
import type {ProfileData} from '../../services/ProfileService.ts';
import {
    userEditValidationSchema as validationSchema,
    userEditEmptyValues as emptyValues
} from '../../validations/userSchemas';
import {Loader, PageHeader} from '../../components/UI';
import {useToast} from "../../hooks/context/useToast.ts";
import type {UserFormData} from "../../types/formTypes.ts";

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

            <div className="flex justify-center w-full">
                <div className="min-h-1/2 bg-gray-900 border border-gray-900 rounded-2xl w-full max-w-sm sm:max-w-md mx-auto">
                    <div className="px-3 sm:px-4 py-6 sm:py-8 flex items-center space-y-3 sm:space-y-4 font-semibold text-gray-500 flex-col">
                        <h1 className="text-white text-xl sm:text-2xl text-center">Edit Profile</h1>

                        {error && (
                            <div className="p-4 mb-2 text-red-400 bg-red-900/20 rounded-lg border border-red-800/50 flex items-center w-full">
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
                                <Form className="w-full flex flex-col space-y-4 sm:space-y-5">
                                    <div className="relative">
                                        <Field
                                            type="text"
                                            id="name"
                                            name="name"
                                            placeholder="Username"
                                            disabled={isSubmitting}
                                            className="w-full p-2 sm:p-3 text-sm sm:text-base bg-gray-900 rounded-md border border-gray-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30 text-white placeholder-gray-500 transition-colors"
                                        />
                                        <ErrorMessage name="name">
                                            {(msg) => (
                                                <div className="absolute -bottom-5 left-0 text-red-500 text-xs">{msg}</div>
                                            )}
                                        </ErrorMessage>
                                    </div>

                                    <div className="relative">
                                        <Field
                                            type="email"
                                            id="email"
                                            name="email"
                                            placeholder="Email"
                                            disabled={isSubmitting}
                                            className="w-full p-2 sm:p-3 text-sm sm:text-base bg-gray-900 rounded-md border border-gray-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30 text-white placeholder-gray-500 transition-colors"
                                        />
                                        <ErrorMessage name="email">
                                            {(msg) => (
                                                <div className="absolute -bottom-5 left-0 text-red-500 text-xs">{msg}</div>
                                            )}
                                        </ErrorMessage>
                                    </div>

                                    <div className="relative">
                                        <Field
                                            type="text"
                                            id="avatar_url"
                                            name="avatar_url"
                                            placeholder="Avatar URL"
                                            disabled={isSubmitting}
                                            className="w-full p-2 sm:p-3 text-sm sm:text-base bg-gray-900 rounded-md border border-gray-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30 text-white placeholder-gray-500 transition-colors"
                                        />
                                        <ErrorMessage name="avatar_url">
                                            {(msg) => (
                                                <div className="absolute -bottom-5 left-0 text-red-500 text-xs">{msg}</div>
                                            )}
                                        </ErrorMessage>
                                    </div>

                                    <div className="relative mt-4 pt-4 border-t border-gray-800">
                                        <h3 className="text-white text-lg mb-3">Change Password</h3>

                                        <div className="relative">
                                            <Field
                                                type="password"
                                                id="password"
                                                name="password"
                                                placeholder="New Password (leave blank to keep current)"
                                                disabled={isSubmitting}
                                                className="w-full p-2 sm:p-3 text-sm sm:text-base bg-gray-900 rounded-md border border-gray-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30 text-white placeholder-gray-500 transition-colors"
                                            />
                                            <ErrorMessage name="password">
                                                {(msg) => (
                                                    <div className="absolute -bottom-5 left-0 text-red-500 text-xs">{msg}</div>
                                                )}
                                            </ErrorMessage>
                                        </div>

                                        <div className="relative mt-6">
                                            <Field
                                                type="password"
                                                id="confirmPassword"
                                                name="confirmPassword"
                                                placeholder="Confirm New Password"
                                                disabled={isSubmitting || !values.password}
                                                className="w-full p-2 sm:p-3 text-sm sm:text-base bg-gray-900 rounded-md border border-gray-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30 text-white placeholder-gray-500 transition-colors disabled:bg-gray-900 disabled:border-gray-800 disabled:text-gray-600"
                                            />
                                            <ErrorMessage name="confirmPassword">
                                                {(msg) => (
                                                    <div className="absolute -bottom-5 left-0 text-red-500 text-xs">{msg}</div>
                                                )}
                                            </ErrorMessage>
                                        </div>
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="w-full p-2 sm:p-3 mt-6 bg-blue-500 hover:bg-blue-600 rounded-full font-bold text-sm sm:text-base text-white border border-transparent transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        {isSubmitting ? (
                                            <div className="flex items-center justify-center">
                                                <svg className="animate-spin -ml-1 mr-2 h-3 w-3 sm:h-4 sm:w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                </svg>
                                                Updating...
                                            </div>
                                        ) : 'Update Profile'}
                                    </button>
                                </Form>
                            )}
                        </Formik>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserEditPage;
