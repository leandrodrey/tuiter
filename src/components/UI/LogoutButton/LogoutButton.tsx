import {type JSX} from 'react';

interface LogoutButtonProps {
    onLogout: () => void;
    className?: string;
    size?: 'sm' | 'md' | 'lg';
    color?: 'default' | 'red';
}

/**
 * Button component for logging out.
 * Shows a logout icon and handles the logout action.
 *
 * @param {LogoutButtonProps} props - Component props
 * @returns {JSX.Element} The logout button component
 */
const LogoutButton = ({
    onLogout,
    className = '',
    size = 'md',
    color = 'default'
}: LogoutButtonProps): JSX.Element => {
    const sizeClasses = {
        sm: 'h-4 w-4',
        md: 'h-5 w-5',
        lg: 'h-6 w-6'
    };

    const colorClasses = {
        default: 'text-gray-400 hover:text-white',
        red: 'text-red-400 hover:text-red-700'
    };

    return (
        <button
            onClick={onLogout}
            className={`${colorClasses[color]} transition-colors cursor-pointer ${className}`}
            aria-label="Logout"
            title="Logout"
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                className={sizeClasses[size]}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
                role="img"
            >
                <title>Logout icon</title>
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                />
            </svg>
        </button>
    );
};

export default LogoutButton;
