import {type JSX} from 'react';
import {Field, ErrorMessage} from 'formik';
import type {UserFormData} from "../../types/formTypes.ts";

interface UserEditFormFieldsProps {
    isSubmitting: boolean;
    values: UserFormData;
}

const UserEditFormFields = ({isSubmitting, values}: UserEditFormFieldsProps): JSX.Element => {
    return (
        <>
            <div className="relative">
                <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">Username</label>
                <Field
                    type="text"
                    id="name"
                    name="name"
                    disabled={isSubmitting}
                    className="w-full p-3 bg-gray-800 border border-gray-700 rounded-md focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 text-white placeholder-gray-500 transition-colors"
                />
                <ErrorMessage name="name">
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
                <label htmlFor="avatar_url" className="block text-sm font-medium text-gray-300 mb-2">Avatar URL</label>
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

            <div className="pt-6 border-t border-gray-800">
                <h3 className="text-lg font-medium text-white mb-4">Change Password</h3>

                <div className="relative mb-4">
                    <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">New Password (leave blank to keep current)</label>
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
                    <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-300 mb-2">Confirm New Password</label>
                    <Field
                        type="password"
                        id="confirmPassword"
                        name="confirmPassword"
                        disabled={isSubmitting || !values.password}
                        className="w-full p-3 bg-gray-800 border border-gray-700 rounded-md focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 text-white placeholder-gray-500 transition-colors disabled:bg-gray-900 disabled:border-gray-800 disabled:text-gray-600"
                    />
                    <ErrorMessage name="confirmPassword">
                        {(msg) => (
                            <div className="mt-1 text-red-400 text-xs">{msg}</div>
                        )}
                    </ErrorMessage>
                </div>
            </div>
        </>
    );
};

export default UserEditFormFields;
