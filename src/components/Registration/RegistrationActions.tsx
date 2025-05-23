import {type JSX} from 'react';
import {SubmitButton} from '../UI';

interface RegistrationActionsProps {
    isSubmitting: boolean;
}

const RegistrationActions = ({isSubmitting}: RegistrationActionsProps): JSX.Element => {
    return (
        <div className="pt-6">
            <SubmitButton
                isSubmitting={isSubmitting}
                loadingText="Registering..."
            >
                Register
            </SubmitButton>
        </div>
    );
};

export default RegistrationActions;
