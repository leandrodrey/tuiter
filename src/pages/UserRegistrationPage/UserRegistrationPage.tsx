import {type JSX, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import {useToast} from "../../hooks/context/useToast.ts";
import {useAuthContext} from "../../hooks/context/useAuthContext.ts";
import {useUserRegistration} from "../../hooks/user-registration/useUserRegistration";
import RegistrationForm from '../../components/Registration/RegistrationForm';
import {PageHeader} from '../../components/UI';

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

    useEffect(() => {
        if (isAuthenticated) {
            navigate('/', {replace: true});
        }
    }, [isAuthenticated, navigate]);

    const handleSubmit = useUserRegistration(navigate, toast);

    return (
        <div>
            <PageHeader title="Create an Account" subtitle="It's free and always will be."/>
            <RegistrationForm onSubmit={handleSubmit}/>
        </div>
    );
};

export default UserRegistrationPage;
