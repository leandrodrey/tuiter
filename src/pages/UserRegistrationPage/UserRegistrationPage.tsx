import {type JSX} from 'react';
import {useNavigate} from 'react-router-dom';
import {type FormikHelpers} from 'formik';
import {apiCreateUser, type UserData} from '../../services/UserService.ts';
import {useToast} from "../../hooks/context/useToast.ts";
import type {RegistrationFormData} from "../../types/formTypes.ts";
import RegistrationForm from '../../components/Registration/RegistrationForm';

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
        <div>
            <h1 className="text-3xl font-bold text-center mb-8 text-gray-900 dark:text-white">Create an Account</h1>
            <RegistrationForm onSubmit={handleSubmit} />
        </div>
    );
};

export default UserRegistrationPage;
