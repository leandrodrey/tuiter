import {type JSX} from 'react';
import {Field, ErrorMessage, useFormikContext} from 'formik';

/**
 * Login form fields component
 * Displays email and password fields
 *
 * @returns {JSX.Element} The login form fields component
 */
const LoginFormFields = (): JSX.Element => {
    const {isSubmitting} = useFormikContext();

    return (
        <>
            <div className="relative">
                <Field
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Correo electrónico"
                    disabled={isSubmitting}
                    className="w-full p-2 sm:p-3 text-sm sm:text-base bg-gray-900 rounded-md border border-gray-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30 text-white placeholder-gray-500 transition-colors"
                />
                <ErrorMessage name="email">
                    {(msg) => (
                        <div className="absolute -bottom-5 left-0 text-red-500 text-xs">{msg}</div>
                    )}
                </ErrorMessage>
            </div>

            <div className="relative mt-2">
                <Field
                    type="password"
                    id="password"
                    name="password"
                    placeholder="Contraseña"
                    disabled={isSubmitting}
                    className="w-full p-2 sm:p-3 text-sm sm:text-base bg-gray-900 rounded-md border border-gray-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30 text-white placeholder-gray-500 transition-colors"
                />
                <ErrorMessage name="password">
                    {(msg) => (
                        <div className="absolute -bottom-5 left-0 text-red-500 text-xs">{msg}</div>
                    )}
                </ErrorMessage>
            </div>
        </>
    );
};

export default LoginFormFields;
