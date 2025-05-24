import {type JSX} from 'react';
import LoginFormFields from './LoginFormFields/LoginFormFields.tsx';
import {SubmitButton, RegistrationLink} from '../UI';
import {Formik, Form, type FormikHelpers} from 'formik';
import type {LoginFormData} from "../../types/formTypes.ts";
import type {ObjectSchema} from "yup";

interface LoginFormProps {
    initialValues: LoginFormData;
    validationSchema: ObjectSchema<LoginFormData>;
    onSubmit: (values: LoginFormData, formikHelpers: FormikHelpers<LoginFormData>) => Promise<void>;
}

/**
 * Component that renders a login form or a message if the user is already authenticated.
 * Uses Formik for form state management and validation.
 *
 * @param {LoginFormProps} props - Component props
 * @returns {JSX.Element} A login form or a message indicating the user is logged in
 */
const LoginForm = ({
    initialValues,
    validationSchema,
    onSubmit,
}: LoginFormProps): JSX.Element => {
    return (
        <div className="flex justify-center w-full">
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmit}
            >
                {({isSubmitting}) => (
                    <Form className="w-full flex flex-col space-y-4 sm:space-y-5">
                        <LoginFormFields/>

                        <SubmitButton
                            isSubmitting={isSubmitting}
                            loadingText="Iniciando sesión..."
                        >
                            Iniciar sesión
                        </SubmitButton>

                        <RegistrationLink/>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default LoginForm;
