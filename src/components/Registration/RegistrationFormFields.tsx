import {type JSX} from 'react';
import {Field, ErrorMessage} from 'formik';

interface RegistrationFormFieldsProps {
    isSubmitting: boolean;
}

const RegistrationFormFields = ({isSubmitting}: RegistrationFormFieldsProps): JSX.Element => {
    return (
        <>
            <div>
                <label htmlFor="username" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Username</label>
                <Field
                    type="text"
                    id="username"
                    name="username"
                    disabled={isSubmitting}
                    className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                />
                <ErrorMessage name="username" component="div" className="mt-1 text-red-500 dark:text-red-400 text-sm"/>
            </div>

            <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email</label>
                <Field
                    type="email"
                    id="email"
                    name="email"
                    disabled={isSubmitting}
                    className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                />
                <ErrorMessage name="email" component="div" className="mt-1 text-red-500 dark:text-red-400 text-sm"/>
            </div>

            <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Password</label>
                <Field
                    type="password"
                    id="password"
                    name="password"
                    disabled={isSubmitting}
                    className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                />
                <ErrorMessage name="password" component="div" className="mt-1 text-red-500 dark:text-red-400 text-sm"/>
            </div>

            <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Confirm Password</label>
                <Field
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    disabled={isSubmitting}
                    className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                />
                <ErrorMessage name="confirmPassword" component="div" className="mt-1 text-red-500 dark:text-red-400 text-sm"/>
            </div>

            <div>
                <label htmlFor="avatar_url" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Avatar URL (optional)</label>
                <Field
                    type="text"
                    id="avatar_url"
                    name="avatar_url"
                    disabled={isSubmitting}
                    placeholder="https://example.com/avatar.jpg"
                    className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                />
                <ErrorMessage name="avatar_url" component="div" className="mt-1 text-red-500 dark:text-red-400 text-sm"/>
            </div>
        </>
    );
};

export default RegistrationFormFields;
