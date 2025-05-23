import {type JSX} from 'react';
import Spinner from '../UI/Loader/Spinner.tsx';

interface RegistrationActionsProps {
    isSubmitting: boolean;
}

const RegistrationActions = ({isSubmitting}: RegistrationActionsProps): JSX.Element => {
    return (
        <button
            type="submit"
            disabled={isSubmitting}
            className="w-full p-2 sm:p-3 mt-3 sm:mt-4 bg-blue-500 hover:bg-blue-600 rounded-full font-bold text-sm sm:text-base text-white border border-transparent transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
            {isSubmitting ? (
                <div className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-2 h-3 w-3 sm:h-4 sm:w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Registering...
                </div>
            ) : 'Register'}
        </button>
    );
};

export default RegistrationActions;
