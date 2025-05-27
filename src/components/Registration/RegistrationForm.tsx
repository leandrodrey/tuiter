import {type JSX} from 'react';
import {Formik, Form, type FormikHelpers} from 'formik';
import {
    registrationValidationSchema as validationSchema,
    registrationInitialValues as initialValues
} from '../../validations/userSchemas';
import type {RegistrationFormData} from "../../types/formTypes.ts";
import RegistrationFormFields from './RegistrationFormFields';
import RegistrationFormActions from './RegistrationFormActions';

interface RegistrationFormProps {
    onSubmit: (values: RegistrationFormData, formikHelpers: FormikHelpers<RegistrationFormData>) => Promise<void>;
    error?: string | null;
    initialValues?: RegistrationFormData;
}

const RegistrationForm = ({onSubmit, error, initialValues: propInitialValues}: RegistrationFormProps): JSX.Element => {
    // Use provided initialValues or default ones
    const formInitialValues = propInitialValues || initialValues;

    return (
        <div className="max-w-2xl mx-auto bg-gray-900 border border-gray-800 rounded-2xl p-6 shadow-lg">
            {error && (
                <div className="mb-4 p-3 bg-red-900/30 border border-red-800 rounded-md text-red-200">
                    {error}
                </div>
            )}
            <Formik
                initialValues={formInitialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmit}
            >
                {({isSubmitting}) => (
                    <Form className="space-y-6">
                        <RegistrationFormFields isSubmitting={isSubmitting}/>
                        <RegistrationFormActions isSubmitting={isSubmitting}/>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default RegistrationForm;
