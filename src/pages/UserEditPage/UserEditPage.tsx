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

            <div className="max-w-2xl mx-auto bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6">
                {error && (
                    <div className="p-3 mb-4 text-red-500 dark:text-red-400 bg-red-50 dark:bg-red-900/10 rounded">{error}</div>
                )}

                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                    enableReinitialize
                >
                    {({isSubmitting, values}) => (
                        <Form className="space-y-4">
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Username</label>
                                <Field
                                    type="text"
                                    id="name"
                                    name="name"
                                    disabled={isSubmitting}
                                    className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                                />
                                <ErrorMessage name="name" component="div" className="mt-1 text-red-500 dark:text-red-400 text-sm"/>
                            </div>

                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email</label>
                                <Field
                                    type="email"
                                    id="email"
                                    name="email"
                                    disabled={isSubmitting}
                                    className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                                />
                                <ErrorMessage name="email" component="div" className="mt-1 text-red-500 dark:text-red-400 text-sm"/>
                            </div>

                            <div>
                                <label htmlFor="avatar_url" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Avatar URL</label>
                                <Field
                                    type="text"
                                    id="avatar_url"
                                    name="avatar_url"
                                    disabled={isSubmitting}
                                    placeholder="https://example.com/avatar.jpg"
                                    className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                                />
                                <ErrorMessage name="avatar_url" component="div" className="mt-1 text-red-500 dark:text-red-400 text-sm"/>
                            </div>

                            <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                                <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">New Password (leave blank to keep current)</label>
                                <Field
                                    type="password"
                                    id="password"
                                    name="password"
                                    disabled={isSubmitting}
                                    className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                                />
                                <ErrorMessage name="password" component="div" className="mt-1 text-red-500 dark:text-red-400 text-sm"/>
                            </div>

                            <div>
                                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Confirm New Password</label>
                                <Field
                                    type="password"
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    disabled={isSubmitting || !values.password}
                                    className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                                />
                                <ErrorMessage name="confirmPassword" component="div" className="mt-1 text-red-500 dark:text-red-400 text-sm"/>
                            </div>

                            <div className="pt-4">
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {isSubmitting ? 'Updating...' : 'Update Profile'}
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
