import {type JSX} from 'react';
import {SubmitButton} from '../UI';

interface RegistrationActionsProps {
    isSubmitting: boolean;
}

const RegistrationActions = ({isSubmitting}: RegistrationActionsProps): JSX.Element => {
    return (
        <div className="pt-4">
            <SubmitButton
                isSubmitting={isSubmitting}
                loadingText="Registering..."
                className="rounded-md"
            >
                Register
            </SubmitButton>
        </div>
    );
};

export default RegistrationActions;
