import {type JSX, useEffect} from 'react';
import {type Location, type NavigateFunction, useLocation, useNavigate} from 'react-router-dom';
import LoginForm from '../../components/LoginForm/LoginForm.tsx';
import {useAuthContext} from "../../hooks/context/useAuthContext.ts";
import {
    loginValidationSchema as validationSchema,
    loginInitialValues as initialValues
} from '../../validations/userSchemas';
import {TuiterLogo} from "../../components/UI";

const LoginPage = (): JSX.Element => {
    const {isAuthenticated, handleLoginSubmit} = useAuthContext();
    const location: Location = useLocation();
    const navigate: NavigateFunction = useNavigate();

    const from = location.state?.from?.pathname || '/';

    useEffect(() => {
        if (isAuthenticated) {
            navigate(from, {replace: true});
        }
    }, [isAuthenticated, navigate, from]);

    return (
        <div className="min-h-[calc(100vh-200px)] flex items-center justify-center px-4 py-12">
            <div className="w-full max-w-md">
                {!isAuthenticated && (
                    <div className="min-h-1/2 bg-gray-900 border border-gray-900 rounded-2xl w-full max-w-sm sm:max-w-md mx-auto">
                        <div className="px-3 sm:px-4 py-6 sm:py-8 flex items-center space-y-3 sm:space-y-4 font-semibold text-gray-500 flex-col">
                            <TuiterLogo className="h-10 w-10 sm:h-12 sm:w-12 text-white"/>
                            <h1 className="text-white text-xl sm:text-2xl text-center">Iniciar sesión en tuiter</h1>
                            <LoginForm
                                initialValues={initialValues}
                                validationSchema={validationSchema}
                                onSubmit={handleLoginSubmit}
                            />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default LoginPage;
