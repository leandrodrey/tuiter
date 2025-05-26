import {type JSX} from 'react';
import {useNavigate} from 'react-router-dom';
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
    isAuthenticated: boolean;
}

/**
 * SidebarNav component that displays the navigation links in a Twitter-like style.
 * Uses the NavLink component from UI for navigation links.
 * Conditionally renders menu items based on authentication state:
 * - When logged in: Shows Home, Create Post, Favorites, and Edit Profile
 * - When not logged in: Shows only Home and Register
 *
 * @param {Object} props - Component props
 * @param {Function} props.isActive - Function to determine if a link is active
 * @param {boolean} props.isAuthenticated - Whether the user is authenticated
 * @returns {JSX.Element} The sidebar navigation component
 */
const SidebarNav = ({isActive, isAuthenticated}: SidebarNavProps): JSX.Element => {
    const navigate = useNavigate();

    const handleTweetClick = () => {
        navigate('/posts/create');
    };

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

            {!isAuthenticated && (
                <>
                    <NavLink
                        to="/login"
                        isActive={isActive("/login")}
                        className="mt-1 group flex items-center px-2 py-2 text-sm sm:text-base leading-6 font-semibold rounded-full hover:bg-gray-800 hover:text-blue-300"
                    >
                        <UserIcon className="mr-2 md:mr-4 h-5 w-5 sm:h-6 sm:w-6"/>
                        <span className="hidden md:inline">Login</span>
                    </NavLink>
                    <NavLink
                        to="/users/register"
                        isActive={isActive("/users/register")}
                        className="mt-1 group flex items-center px-2 py-2 text-sm sm:text-base leading-6 font-semibold rounded-full hover:bg-gray-800 hover:text-blue-300"
                    >
                        <UserIcon className="mr-2 md:mr-4 h-5 w-5 sm:h-6 sm:w-6"/>
                        <span className="hidden md:inline">Register</span>
                    </NavLink>
                </>
            )}

            {isAuthenticated && (
                <>
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

                    <TweetButton onClick={handleTweetClick}/>
                </>
            )}
        </nav>
    );
};

export default SidebarNav;
