import {type JSX} from 'react';
import Spinner from '../../components/UI/Spinner';

interface RegistrationActionsProps {
    isSubmitting: boolean;
}

const RegistrationActions = ({isSubmitting}: RegistrationActionsProps): JSX.Element => {
    return (
        <div className="pt-4">
            <button
                type="submit"
                disabled={isSubmitting}
                className="w-full px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
                {isSubmitting ? (
                    <span className="flex items-center justify-center">
                        <Spinner size="sm" color="white" />
                        <span className="ml-2">Registering...</span>
                    </span>
                ) : 'Register'}
            </button>
        </div>
    );
};

export default RegistrationActions;
