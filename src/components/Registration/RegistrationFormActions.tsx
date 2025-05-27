import {type JSX} from 'react';
import {SubmitButton} from '../UI';

/**
 * Props for the RegistrationFormActions component
 * @interface RegistrationFormActionsProps
 * @property {boolean} isSubmitting - Whether the form is currently submitting
 */
interface RegistrationFormActionsProps {
    isSubmitting: boolean;
}

/**
 * Component that renders the submit button for the registration form.
 * Handles the loading state and text of the button based on form submission status.
 *
 * @param {RegistrationFormActionsProps} props - Component props
 * @returns {JSX.Element} The registration form actions component
 */
const RegistrationFormActions = ({isSubmitting}: RegistrationFormActionsProps): JSX.Element => {
    return (
        <div>
            <SubmitButton
                isSubmitting={isSubmitting}
                loadingText="Registering..."
            >
                Register
            </SubmitButton>
        </div>
    );
};

export default RegistrationFormActions;
