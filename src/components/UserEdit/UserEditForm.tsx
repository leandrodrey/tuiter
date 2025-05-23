import {type JSX} from 'react';
import {Formik, Form, type FormikHelpers} from 'formik';
import {
    userEditValidationSchema as validationSchema
} from '../../validations/userSchemas';
import type {UserFormData} from "../../types/formTypes.ts";
import UserEditFormFields from './UserEditFormFields';
import UserEditActions from './UserEditActions';

interface UserEditFormProps {
    initialValues: UserFormData;
    onSubmit: (values: UserFormData, formikHelpers: FormikHelpers<UserFormData>) => Promise<void>;
    error: string | null;
}

const UserEditForm = ({initialValues, onSubmit, error}: UserEditFormProps): JSX.Element => {
    return (
        <div className="max-w-2xl mx-auto bg-gray-900 border border-gray-800 rounded-2xl p-6 shadow-lg">
            {error && (
                <div className="p-4 mb-6 text-red-400 bg-red-900/20 rounded-lg border border-red-800/50 flex items-center">
                    <svg className="w-5 h-5 mr-2 text-red-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zm-1 9a1 1 0 01-1-1v-4a1 1 0 112 0v4a1 1 0 01-1 1z" clipRule="evenodd"></path>
                    </svg>
                    {error}
                </div>
            )}
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmit}
                enableReinitialize
            >
                {({isSubmitting, values}) => (
                    <Form className="space-y-6">
                        <UserEditFormFields isSubmitting={isSubmitting} values={values}/>
                        <UserEditActions isSubmitting={isSubmitting}/>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default UserEditForm;
