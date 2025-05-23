import {type JSX} from 'react';
import {Formik, Form, Field, ErrorMessage, type FormikHelpers} from 'formik';
import {
    loginValidationSchema as validationSchema,
    loginInitialValues as initialValues
} from '../../validations/userSchemas';
import type {LoginFormData} from "../../types/formTypes.ts";

interface LoginFormFieldsProps {
    onSubmit: (values: LoginFormData, formikHelpers: FormikHelpers<LoginFormData>) => Promise<void>;
}

/**
 * Login form fields component
 * Displays email and password fields, submit button, and registration link
 * Uses Formik for form handling and validation
 *
 * @param {Object} props - Component props
 * @param {Function} props.onSubmit - Function to call when the form is submitted
 * @returns {JSX.Element} The login form fields component
 */
const LoginFormFields = ({onSubmit}: LoginFormFieldsProps): JSX.Element => {
    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
        >
            {({isSubmitting}) => (
                <Form className="w-full flex flex-col space-y-4 sm:space-y-5">
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

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full p-2 sm:p-3 mt-3 sm:mt-4 bg-blue-500 hover:bg-blue-600 rounded-full font-bold text-sm sm:text-base text-white border border-transparent transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isSubmitting ? (
                            <div className="flex items-center justify-center">
                                <svg className="animate-spin -ml-1 mr-2 h-3 w-3 sm:h-4 sm:w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Iniciando sesión...
                            </div>
                        ) : 'Iniciar sesión'}
                    </button>

                    <div className="flex items-center justify-center mt-3 sm:mt-4">
                        <span className="text-gray-500 text-xs sm:text-sm">¿No tienes cuenta?</span>
                        <a className="font-semibold text-blue-500 ml-1 sm:ml-2 text-xs sm:text-sm hover:underline" href="/users/register">Regístrate</a>
                    </div>
                </Form>
            )}
        </Formik>
    );
};

export default LoginFormFields;
