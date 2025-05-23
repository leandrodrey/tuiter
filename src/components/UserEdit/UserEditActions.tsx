import {type JSX} from 'react';
import {SubmitButton} from '../UI';

interface UserEditActionsProps {
    isSubmitting: boolean;
}

const UserEditActions = ({isSubmitting}: UserEditActionsProps): JSX.Element => {
    return (
        <div className="pt-6">
            <SubmitButton
                isSubmitting={isSubmitting}
                loadingText="Updating..."
            >
                Update Profile
            </SubmitButton>
        </div>
    );
};

export default UserEditActions;
