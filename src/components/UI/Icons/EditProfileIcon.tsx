import {type JSX} from 'react';

interface EditProfileIconProps {
    className?: string;
}

/**
 * Edit profile icon component for navigation.
 * Displays a pencil/edit icon.
 *
 * @param {EditProfileIconProps} props - Component props
 * @returns {JSX.Element} The edit profile icon component
 */
const EditProfileIcon = ({className = ''}: EditProfileIconProps): JSX.Element => {
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
            <title>Edit profile icon</title>
            <path d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
        </svg>
    );
};

export default EditProfileIcon;
