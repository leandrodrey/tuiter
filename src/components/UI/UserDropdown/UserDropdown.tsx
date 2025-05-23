import {type JSX} from 'react';
import {NavLink} from '../../../components/UI';
import {useLocation} from 'react-router-dom';
import {useAuthContext} from '../../../hooks/context/useAuthContext';

/**
 * Props for the UserDropdown component
 * @interface UserDropdownProps
 * @property {boolean} isVisible - Whether the dropdown menu is visible
 */
interface UserDropdownProps {
    isVisible: boolean;
}

/**
 * Dropdown menu component for user-related actions.
 * Displays a dropdown menu with user-related actions when visible and the user is authenticated.
 *
 * @param {UserDropdownProps} props - Component props
 * @param {boolean} props.isVisible - Whether the dropdown menu is visible
 * @returns {JSX.Element} The dropdown menu component
 */
const UserDropdown = ({isVisible}: UserDropdownProps): JSX.Element => {
    const location = useLocation();
    const {isAuthenticated} = useAuthContext();

    /**
     * Determines if a navigation link should be highlighted as active based on the current URL path.
     * @param {string} path - The path to check against the current location
     * @returns {boolean} True if the current location matches the provided path
     */
    const isActive = (path: string): boolean => {
        return location.pathname === path;
    };

    // Don't render anything if the dropdown is not visible or the user is not authenticated
    if (!isVisible || !isAuthenticated) {
        return <></>;
    }

    return (
        <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg py-1 z-10 border border-gray-200 dark:border-gray-700">
            <NavLink
                to="/users/edit"
                isActive={isActive("/users/edit")}
                className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
                Edit Profile
            </NavLink>
        </div>
    );
};

export default UserDropdown;
