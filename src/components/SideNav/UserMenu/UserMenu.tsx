import {type JSX} from 'react';
import type {UserInformation} from "../../../types/userTypes.ts";
import {useLogout} from "../../../hooks/context/useLogout.ts";
import {Avatar, LogoutButton} from '../../UI';

interface UserMenuProps {
    userInformation: UserInformation | null;
    onLogout: () => void;
    isAuthenticated: boolean;
    collapsed?: boolean;
}

/**
 * UserMenu component that displays the user information and logout button.
 * Shows user avatar, name, and email when authenticated.
 *
 * @param {Object} props - Component props
 * @param {UserInformation | null} props.userInformation - User information
 * @param {Function} props.onLogout - Function to handle logout
 * @param {boolean} props.isAuthenticated - Whether the user is authenticated
 * @param {boolean} [props.collapsed=false] - Whether the sidebar is collapsed
 * @returns {JSX.Element | null} The user menu component or null if not authenticated
 */
const UserMenu = ({userInformation, onLogout, isAuthenticated, collapsed = false}: UserMenuProps): JSX.Element | null => {

    const handleLogout = useLogout(onLogout);

    if (!isAuthenticated) {
        return null;
    }

    return (
        <div className="absolute bottom-0 w-full p-4">
            <div className="flex items-center justify-between bg-gray-800 bg-opacity-50 rounded-lg p-2">
                <div className="flex items-center">
                    <Avatar
                        username={userInformation?.name || "User"}
                        avatarUrl={userInformation?.avatar_url}
                        size="sm"
                    />
                    {!collapsed && (
                        <div className="ml-2">
                            <p className="text-sm font-medium text-white truncate">
                                {userInformation?.name || "User"}
                            </p>
                            <p className="text-xs text-gray-400 truncate">
                                {userInformation?.email || "@user"}
                            </p>
                        </div>
                    )}
                </div>
                <LogoutButton
                    onLogout={handleLogout}
                    color="default"
                    size="sm"
                />
            </div>
        </div>
    );
};

export default UserMenu;
