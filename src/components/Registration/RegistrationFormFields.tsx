import {type JSX} from 'react';
import {Field, ErrorMessage} from 'formik';

interface RegistrationFormFieldsProps {
    isSubmitting: boolean;
}

const RegistrationFormFields = ({isSubmitting}: RegistrationFormFieldsProps): JSX.Element => {
    return (
        <>
            <div className="relative">
                <label htmlFor="username" className="block text-sm font-medium text-gray-300 mb-2">Username</label>
                <Field
                    type="text"
                    id="username"
                    name="username"
                    disabled={isSubmitting}
                    className="w-full p-3 bg-gray-800 border border-gray-700 rounded-md focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 text-white placeholder-gray-500 transition-colors"
                />
                <ErrorMessage name="username">
                    {(msg) => (
                        <div className="mt-1 text-red-400 text-xs">{msg}</div>
                    )}
                </ErrorMessage>
            </div>

            <div className="relative">
                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">Email</label>
                <Field
                    type="email"
                    id="email"
                    name="email"
                    disabled={isSubmitting}
                    className="w-full p-3 bg-gray-800 border border-gray-700 rounded-md focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 text-white placeholder-gray-500 transition-colors"
                />
                <ErrorMessage name="email">
                    {(msg) => (
                        <div className="mt-1 text-red-400 text-xs">{msg}</div>
                    )}
                </ErrorMessage>
            </div>

            <div className="relative">
                <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">Password</label>
                <Field
                    type="password"
                    id="password"
                    name="password"
                    disabled={isSubmitting}
                    className="w-full p-3 bg-gray-800 border border-gray-700 rounded-md focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 text-white placeholder-gray-500 transition-colors"
                />
                <ErrorMessage name="password">
                    {(msg) => (
                        <div className="mt-1 text-red-400 text-xs">{msg}</div>
                    )}
                </ErrorMessage>
            </div>

            <div className="relative">
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-300 mb-2">Confirm Password</label>
                <Field
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    disabled={isSubmitting}
                    className="w-full p-3 bg-gray-800 border border-gray-700 rounded-md focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 text-white placeholder-gray-500 transition-colors"
                />
                <ErrorMessage name="confirmPassword">
                    {(msg) => (
                        <div className="mt-1 text-red-400 text-xs">{msg}</div>
                    )}
                </ErrorMessage>
            </div>

            <div className="relative">
                <label htmlFor="avatar_url" className="block text-sm font-medium text-gray-300 mb-2">Avatar URL (optional)</label>
                <Field
                    type="text"
                    id="avatar_url"
                    name="avatar_url"
                    disabled={isSubmitting}
                    placeholder="https://example.com/avatar.jpg"
                    className="w-full p-3 bg-gray-800 border border-gray-700 rounded-md focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 text-white placeholder-gray-500 transition-colors"
                />
                <ErrorMessage name="avatar_url">
                    {(msg) => (
                        <div className="mt-1 text-red-400 text-xs">{msg}</div>
                    )}
                </ErrorMessage>
            </div>
        </>
    );
};

export default RegistrationFormFields;
