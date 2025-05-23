import {type JSX} from 'react';

/**
 * Component that renders a registration link with a prompt text.
 * Used to direct users to the registration page from the login form.
 *
 * @returns {JSX.Element} The registration link component
 */
const RegistrationLink = (): JSX.Element => {
    return (
        <div className="flex items-center justify-center mt-3 sm:mt-4">
            <span className="text-gray-500 text-xs sm:text-sm">¿No tienes cuenta?</span>
            <a className="font-semibold text-blue-500 ml-1 sm:ml-2 text-xs sm:text-sm hover:underline" href="/users/register">Regístrate</a>
        </div>
    );
};

export default RegistrationLink;
