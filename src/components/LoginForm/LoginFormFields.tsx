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
        <div className="login-form-container">
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmit}
            >
                {({isSubmitting}) => (
                    <Form className="login-form">
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <Field
                                type="email"
                                id="email"
                                name="email"
                                disabled={isSubmitting}
                            />
                            <ErrorMessage name="email" component="div" className="error-message"/>
                        </div>

                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <Field
                                type="password"
                                id="password"
                                name="password"
                                disabled={isSubmitting}
                            />
                            <ErrorMessage name="password" component="div" className="error-message"/>
                        </div>

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="submit-button"
                        >
                            {isSubmitting ? 'Logging in...' : 'Login'}
                        </button>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default LoginFormFields;
