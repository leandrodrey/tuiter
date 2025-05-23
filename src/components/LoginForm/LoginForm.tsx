import {type JSX} from 'react';
import {useAuthContext} from '../../hooks/context/useAuthContext.ts';
import './LoginForm.css';
import LoginFormFields from './LoginFormFields';
import {TuiterLogo} from '../UI';

/**
 * Component that renders a login form or a message if the user is already authenticated.
 * Uses the authentication context to handle login submission and check authentication status.
 * @returns A login form or a message indicating the user is logged in
 */
const LoginForm = (): JSX.Element => {
    const {isAuthenticated, handleLoginSubmit} = useAuthContext();

    return (
        <div className="flex justify-center w-full">
            {isAuthenticated ? (
                <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 text-gray-600 dark:text-gray-300 text-center">
                    <p>You are logged in</p>
                </div>
            ) : (
                <div className="min-h-1/2 bg-gray-900 border border-gray-900 rounded-2xl w-full max-w-sm sm:max-w-md mx-auto">
                    <div className="px-3 sm:px-4 py-6 sm:py-8 flex items-center space-y-3 sm:space-y-4 font-semibold text-gray-500 flex-col">
                        <TuiterLogo className="h-10 w-10 sm:h-12 sm:w-12 text-white" />
                        <h1 className="text-white text-xl sm:text-2xl text-center">Iniciar sesión en tuiter</h1>
                        <LoginFormFields onSubmit={handleLoginSubmit}/>
                    </div>
                </div>
            )}
        </div>
    );
};

export default LoginForm;
