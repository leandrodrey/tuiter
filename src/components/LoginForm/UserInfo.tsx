import {type JSX} from 'react';
import type {UserInformation} from "../../types/userTypes";
import {useLogout} from "../../hooks/context/useLogout";
import {Avatar, LogoutButton} from '../UI';

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
    // Use the custom hook for logout functionality with the provided onLogout function
    const handleLogout = useLogout(onLogout);

    return (
        <div className="flex items-center space-x-2 relative">
            <Avatar
                username={userInformation?.name || 'User'}
                avatarUrl={userInformation?.avatar_url}
                size="sm"
                className="border border-gray-200 dark:border-gray-700"
            />
            <div className="relative">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300 cursor-pointer">
                    {userInformation?.name}
                </span>
            </div>
            <LogoutButton
                onLogout={handleLogout}
                color="red"
                size="md"
                className="p-2"
            />
        </div>
    );
};

export default UserInfo;
