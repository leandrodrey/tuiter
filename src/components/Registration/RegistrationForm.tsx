import {type JSX} from 'react';
import {Formik, Form, type FormikHelpers} from 'formik';
import {registrationValidationSchema as validationSchema, registrationInitialValues as initialValues} from '../../validations/userSchemas';
import type {RegistrationFormData} from "../../types/formTypes.ts";
import RegistrationFormFields from './RegistrationFormFields';
import RegistrationActions from './RegistrationActions';

interface RegistrationFormProps {
    onSubmit: (values: RegistrationFormData, formikHelpers: FormikHelpers<RegistrationFormData>) => Promise<void>;
}

const RegistrationForm = ({onSubmit}: RegistrationFormProps): JSX.Element => {
    return (
        <div className="max-w-2xl mx-auto bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6">
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmit}
            >
                {({isSubmitting}) => (
                    <Form className="space-y-4">
                        <RegistrationFormFields isSubmitting={isSubmitting} />
                        <RegistrationActions isSubmitting={isSubmitting} />
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default RegistrationForm;
