import {type JSX} from 'react';
import {
    NavLink,
    TweetButton,
    HomeIcon,
    UserIcon,
    CreatePostIcon,
    FavoritesIcon,
    EditProfileIcon
} from '../UI';

interface SidebarNavProps {
    isActive: (path: string) => boolean;
}

/**
 * SidebarNav component that displays the navigation links in a Twitter-like style.
 * Uses the NavLink component from UI for navigation links.
 *
 * @param {Object} props - Component props
 * @param {Function} props.isActive - Function to determine if a link is active
 * @returns {JSX.Element} The sidebar navigation component
 */
const SidebarNav = ({isActive}: SidebarNavProps): JSX.Element => {
    return (
        <nav className="mt-4 sm:mt-5 px-1 sm:px-2">
            <NavLink
                to="/"
                isActive={isActive("/")}
                className="group flex items-center px-2 py-2 text-sm sm:text-base leading-6 font-semibold rounded-full hover:bg-gray-800 hover:text-blue-300"
            >
                <HomeIcon className="mr-2 md:mr-4 h-5 w-5 sm:h-6 sm:w-6"/>
                <span className="hidden md:inline">Home</span>
            </NavLink>
            <NavLink
                to="/users/register"
                isActive={isActive("/users/register")}
                className="mt-1 group flex items-center px-2 py-2 text-sm sm:text-base leading-6 font-semibold rounded-full hover:bg-gray-800 hover:text-blue-300"
            >
                <UserIcon className="mr-2 md:mr-4 h-5 w-5 sm:h-6 sm:w-6"/>
                <span className="hidden md:inline">Register</span>
            </NavLink>
            <NavLink
                to="/posts/create"
                isActive={isActive("/posts/create")}
                className="mt-1 group flex items-center px-2 py-2 text-sm sm:text-base leading-6 font-semibold rounded-full hover:bg-gray-800 hover:text-blue-300"
            >
                <CreatePostIcon className="mr-2 md:mr-4 h-5 w-5 sm:h-6 sm:w-6"/>
                <span className="hidden md:inline">Create Post</span>
            </NavLink>
            <NavLink
                to="/users/favorites"
                isActive={isActive("/users/favorites")}
                className="mt-1 group flex items-center px-2 py-2 text-sm sm:text-base leading-6 font-semibold rounded-full hover:bg-gray-800 hover:text-blue-300"
            >
                <FavoritesIcon className="mr-2 md:mr-4 h-5 w-5 sm:h-6 sm:w-6"/>
                <span className="hidden md:inline">Favorites</span>
            </NavLink>
            <NavLink
                to="/users/edit"
                isActive={isActive("/users/edit")}
                className="mt-1 group flex items-center px-2 py-2 text-sm sm:text-base leading-6 font-semibold rounded-full hover:bg-gray-800 hover:text-blue-300"
            >
                <EditProfileIcon className="mr-2 md:mr-4 h-5 w-5 sm:h-6 sm:w-6"/>
                <span className="hidden md:inline">Edit Profile</span>
            </NavLink>

            <TweetButton/>
        </nav>
    );
};

export default SidebarNav;
