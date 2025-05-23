import {type JSX} from 'react';

interface UserIconProps {
    className?: string;
}

/**
 * User icon component for navigation.
 * Displays a user profile icon.
 *
 * @param {UserIconProps} props - Component props
 * @returns {JSX.Element} The user icon component
 */
const UserIcon = ({className = ''}: UserIconProps): JSX.Element => {
    return (
        <svg
            className={className}
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
            role="img"
        >
            <title>User icon</title>
            <path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
        </svg>
    );
};

export default UserIcon;
