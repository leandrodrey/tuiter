import {type JSX, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import {useToast} from "../../hooks/context/useToast.ts";
import {useAuthContext} from "../../hooks/context/useAuthContext.ts";
import {useUserRegistration} from "./hooks/useUserRegistration.ts";
import RegistrationForm from '../../components/Registration/RegistrationForm';
import {Loader, PageHeader} from '../../components/UI';

/**
 * Page component for user registration.
 * Displays a registration form and handles form submission via the useUserRegistration hook.
 * Redirects authenticated users to the home page.
 *
 * @returns {JSX.Element} The rendered registration page
 */
const UserRegistrationPage = (): JSX.Element => {
    const navigate = useNavigate();
    const toast = useToast();
    const {isAuthenticated} = useAuthContext();
    const {initialValues, isLoading, error, handleSubmit} = useUserRegistration(navigate, toast);

    useEffect(() => {
        if (isAuthenticated) {
            navigate('/', {replace: true});
        }
    }, [isAuthenticated, navigate]);

    if (isLoading) {
        return <Loader text="Processing registration..." fullScreen={true}/>;
    }

    return (
        <div>
            <PageHeader title="Create an Account" subtitle="It's free and always will be."/>
            <div className="max-w-2xl mx-auto">
                <RegistrationForm
                    initialValues={initialValues}
                    onSubmit={handleSubmit}
                    error={error}
                />
            </div>
        </div>
    );
};

export default UserRegistrationPage;
