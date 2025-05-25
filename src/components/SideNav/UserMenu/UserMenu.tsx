import {type JSX} from 'react';
import type {UserInformation} from "../../../types/userTypes.ts";
import {useLogout} from "../../../hooks/context/useLogout.ts";
import {Avatar, LogoutButton} from '../../UI';
import {Link} from 'react-router-dom';

interface UserMenuProps {
    userInformation: UserInformation | null;
    onLogout: () => void;
    isAuthenticated: boolean;
}

/**
 * UserMenu component that displays the user information and logout button.
 * Shows user avatar, name, and email when authenticated.
 *
 * @param {Object} props - Component props
 * @param {UserInformation | null} props.userInformation - User information
 * @param {Function} props.onLogout - Function to handle logout
 * @param {boolean} props.isAuthenticated - Whether the user is authenticated
 * @returns {JSX.Element | null} The user menu component or null if not authenticated
 */
const UserMenu = ({userInformation, onLogout, isAuthenticated}: UserMenuProps): JSX.Element | null => {

    const handleLogout = useLogout(onLogout);

    if (!isAuthenticated) {
        return null;
    }

    return (
        <div className="absolute" style={{bottom: '1rem'}}>
            <div className="flex-shrink-0 flex hover:bg-gray-800 rounded-full px-2 sm:px-4 py-2 sm:py-3 mt-8 sm:mt-12 mr-1 sm:mr-2">
                <Link to="users/edit" className="flex-shrink-0 group block">
                    <div className="flex items-center">
                        <div>
                            <Avatar
                                username={userInformation?.name || "User"}
                                avatarUrl={userInformation?.avatar_url}
                                size="md"
                            />
                        </div>
                        <div className="ml-2 sm:ml-3 hidden md:block">
                            <p className="text-sm sm:text-base leading-6 font-medium text-white">
                                {userInformation?.name || "User"}
                            </p>
                            <p className="text-xs sm:text-sm leading-5 font-medium text-gray-400 group-hover:text-gray-300 transition ease-in-out duration-150">
                                {userInformation?.email || "@user"}
                            </p>
                        </div>
                    </div>
                </Link>
                <LogoutButton
                    onLogout={handleLogout}
                    color="default"
                    size="sm"
                    className="ml-auto"
                />
            </div>
        </div>
    );
};

export default UserMenu;
