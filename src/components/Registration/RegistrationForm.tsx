import {type JSX} from 'react';
import {Formik, Form, type FormikHelpers} from 'formik';
import {
    registrationValidationSchema as validationSchema,
    registrationInitialValues as initialValues
} from '../../validations/userSchemas';
import type {RegistrationFormData} from "../../types/formTypes.ts";
import RegistrationFormFields from './RegistrationFormFields';
import RegistrationActions from './RegistrationActions';

interface RegistrationFormProps {
    onSubmit: (values: RegistrationFormData, formikHelpers: FormikHelpers<RegistrationFormData>) => Promise<void>;
}

const RegistrationForm = ({onSubmit}: RegistrationFormProps): JSX.Element => {
    return (
        <div className="flex justify-center w-full">
            <div className="min-h-1/2 bg-gray-900 border border-gray-900 rounded-2xl w-full max-w-sm sm:max-w-md mx-auto">
                <div className="px-3 sm:px-4 py-6 sm:py-8 flex items-center space-y-3 sm:space-y-4 font-semibold text-gray-500 flex-col">
                    <h1 className="text-white text-xl sm:text-2xl text-center">Create your account</h1>
                    <Formik
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={onSubmit}
                    >
                        {({isSubmitting}) => (
                            <Form className="w-full flex flex-col space-y-4 sm:space-y-5">
                                <RegistrationFormFields isSubmitting={isSubmitting}/>
                                <RegistrationActions isSubmitting={isSubmitting}/>
                            </Form>
                        )}
                    </Formik>
                </div>
            </div>
        </div>
    );
};

export default RegistrationForm;
