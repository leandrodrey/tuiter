import {type JSX} from 'react';
import {Field, ErrorMessage} from 'formik';

interface RegistrationFormFieldsProps {
    isSubmitting: boolean;
}

const RegistrationFormFields = ({isSubmitting}: RegistrationFormFieldsProps): JSX.Element => {
    return (
        <>
            <div className="relative">
                <Field
                    type="text"
                    id="username"
                    name="username"
                    placeholder="Username"
                    disabled={isSubmitting}
                    className="w-full p-2 sm:p-3 text-sm sm:text-base bg-gray-900 rounded-md border border-gray-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30 text-white placeholder-gray-500 transition-colors"
                />
                <ErrorMessage name="username">
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
                    type="password"
                    id="password"
                    name="password"
                    placeholder="Password"
                    disabled={isSubmitting}
                    className="w-full p-2 sm:p-3 text-sm sm:text-base bg-gray-900 rounded-md border border-gray-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30 text-white placeholder-gray-500 transition-colors"
                />
                <ErrorMessage name="password">
                    {(msg) => (
                        <div className="absolute -bottom-5 left-0 text-red-500 text-xs">{msg}</div>
                    )}
                </ErrorMessage>
            </div>

            <div className="relative">
                <Field
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    placeholder="Confirm Password"
                    disabled={isSubmitting}
                    className="w-full p-2 sm:p-3 text-sm sm:text-base bg-gray-900 rounded-md border border-gray-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30 text-white placeholder-gray-500 transition-colors"
                />
                <ErrorMessage name="confirmPassword">
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
                    placeholder="Avatar URL (optional)"
                    disabled={isSubmitting}
                    className="w-full p-2 sm:p-3 text-sm sm:text-base bg-gray-900 rounded-md border border-gray-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30 text-white placeholder-gray-500 transition-colors"
                />
                <ErrorMessage name="avatar_url">
                    {(msg) => (
                        <div className="absolute -bottom-5 left-0 text-red-500 text-xs">{msg}</div>
                    )}
                </ErrorMessage>
            </div>
        </>
    );
};

export default RegistrationFormFields;
