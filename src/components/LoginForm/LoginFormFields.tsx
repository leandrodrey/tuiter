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

const LoginFormFields = ({onSubmit}: LoginFormFieldsProps): JSX.Element => {
    return (
        <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700 p-6 shadow-sm">
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmit}
            >
                {({isSubmitting}) => (
                    <Form className="space-y-5">
                        <div className="space-y-2">
                            <div className="relative">
                                <Field
                                    type="email"
                                    id="email"
                                    name="email"
                                    placeholder="Email"
                                    disabled={isSubmitting}
                                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition duration-200 ease-in-out"
                                />
                            </div>
                            <ErrorMessage name="email" component="div" className="text-red-500 text-sm mt-1"/>
                        </div>

                        <div className="space-y-2">
                            <div className="relative">
                                <Field
                                    type="password"
                                    id="password"
                                    name="password"
                                    placeholder="Password"
                                    disabled={isSubmitting}
                                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition duration-200 ease-in-out"
                                />
                            </div>
                            <ErrorMessage name="password" component="div" className="text-red-500 text-sm mt-1"/>
                        </div>

                        <div className="pt-2">
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-4 rounded-md transition duration-200 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isSubmitting ? 'Signing in...' : 'Sign in'}
                            </button>
                        </div>

                        <div className="flex justify-between text-sm pt-2">
                            <a href="#" className="text-blue-500 hover:underline">Forgot password?</a>
                            <a href="/users/register" className="text-blue-500 hover:underline">Sign up for Tuiter</a>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default LoginFormFields;
