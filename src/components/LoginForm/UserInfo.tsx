import {type JSX, useState} from 'react';
import {useToast} from "../../hooks/context/useToast.ts";
import type {UserInformation} from "../../types/userTypes";
import {Avatar, UserDropdown} from '../UI';

/**
 * Props for the UserInfo component
 * @interface UserInfoProps
 * @property {UserInformation | null} userInformation - The user information to display
 * @property {() => void} onLogout - Function to call when the user logs out
 */
interface UserInfoProps {
    userInformation: UserInformation | null;
    onLogout: () => void;
}

/**
 * Component that displays user information and provides user-related actions.
 * Shows the user's avatar, name, and a logout button.
 * Displays a dropdown menu with additional options when hovering over the username.
 *
 * @param {UserInfoProps} props - Component props
 * @returns {JSX.Element} The user information component
 */
const UserInfo = ({userInformation, onLogout}: UserInfoProps): JSX.Element => {
    const toast = useToast();
    const [isDropdownVisible, setIsDropdownVisible] = useState(false);

    /**
     * Handles the logout action.
     * Calls the onLogout function and displays a success message.
     */
    const handleLogout = () => {
        onLogout();
        toast.info('You have been logged out successfully');
    };

    return (
        <div className="flex items-center space-x-2 relative">
            <Avatar
                username={userInformation?.name || 'User'}
                avatarUrl={userInformation?.avatar_url}
                size="sm"
                className="border border-gray-200 dark:border-gray-700"
            />
            <div
                className="relative"
                onMouseEnter={() => setIsDropdownVisible(true)}
                onMouseLeave={() => setIsDropdownVisible(false)}
            >
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300 cursor-pointer">
                    {userInformation?.name}
                </span>
                <UserDropdown isVisible={isDropdownVisible} />
            </div>
            <button
                onClick={handleLogout}
                className="p-2 text-red-400 hover:text-red-700 transition-colors cursor-pointer"
                aria-label="Logout"
                title="Logout"
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
            </button>
        </div>
    );
};

export default UserInfo;
