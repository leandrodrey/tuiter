import {type JSX} from 'react';
import {NavLink} from '../UI';
import {useLocation} from 'react-router-dom';

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
                activeClassName="bg-gray-800 text-blue-300"
            >
                <svg className="mr-2 md:mr-4 h-5 w-5 sm:h-6 sm:w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l9-9 9 9M5 10v10a1 1 0 001 1h3a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1h3a1 1 0 001-1V10M9 21h6"></path>
                </svg>
                <span className="hidden md:inline">Home</span>
            </NavLink>
            <NavLink
                to="/users/register"
                isActive={isActive("/users/register")}
                className="mt-1 group flex items-center px-2 py-2 text-sm sm:text-base leading-6 font-semibold rounded-full hover:bg-gray-800 hover:text-blue-300"
                activeClassName="bg-gray-800 text-blue-300"
            >
                <svg className="mr-2 md:mr-4 h-5 w-5 sm:h-6 sm:w-6" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" stroke="currentColor" viewBox="0 0 24 24">
                    <path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                </svg>
                <span className="hidden md:inline">Register</span>
            </NavLink>
            <NavLink
                to="/posts/create"
                isActive={isActive("/posts/create")}
                className="mt-1 group flex items-center px-2 py-2 text-sm sm:text-base leading-6 font-semibold rounded-full hover:bg-gray-800 hover:text-blue-300"
                activeClassName="bg-gray-800 text-blue-300"
            >
                <svg className="mr-2 md:mr-4 h-5 w-5 sm:h-6 sm:w-6" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" stroke="currentColor" viewBox="0 0 24 24">
                    <path d="M8 12h.01M12 12h.01M16 12h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                <span className="hidden md:inline">Create Post</span>
            </NavLink>
            <NavLink
                to="/users/favorites"
                isActive={isActive("/users/favorites")}
                className="mt-1 group flex items-center px-2 py-2 text-sm sm:text-base leading-6 font-semibold rounded-full hover:bg-gray-800 hover:text-blue-300"
                activeClassName="bg-gray-800 text-blue-300"
            >
                <svg className="mr-2 md:mr-4 h-5 w-5 sm:h-6 sm:w-6" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" stroke="currentColor" viewBox="0 0 24 24">
                    <path d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"></path>
                </svg>
                <span className="hidden md:inline">Favorites</span>
            </NavLink>
            <NavLink
                to="/users/edit"
                isActive={isActive("/users/edit")}
                className="mt-1 group flex items-center px-2 py-2 text-sm sm:text-base leading-6 font-semibold rounded-full hover:bg-gray-800 hover:text-blue-300"
                activeClassName="bg-gray-800 text-blue-300"
            >
                <svg className="mr-2 md:mr-4 h-5 w-5 sm:h-6 sm:w-6" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" stroke="currentColor" viewBox="0 0 24 24">
                    <path d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                </svg>
                <span className="hidden md:inline">Edit Profile</span>
            </NavLink>

            <button className="bg-blue-400 hover:bg-blue-500 w-full mt-4 sm:mt-5 text-white font-bold py-1 sm:py-2 px-2 sm:px-4 rounded-full text-sm sm:text-base">
                <span className="hidden md:inline">Tweet</span>
                <span className="md:hidden">
                    <svg className="h-5 w-5 mx-auto" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8.8 7.2H5.6V3.9c0-.4-.3-.8-.8-.8s-.7.4-.7.8v3.3H.8c-.4 0-.8.3-.8.8s.3.8.8.8h3.3v3.3c0 .4.3.8.8.8s.8-.3.8-.8V8.7H9c.4 0 .8-.3.8-.8s-.5-.7-1-.7zm15-4.9v-.1h-.1c-.1 0-9.2 1.2-14.4 11.7-3.8 7.6-3.6 9.9-3.3 9.9.3.1 3.4-6.5 6.7-9.2 5.2-1.1 6.6-3.6 6.6-3.6s-1.5.2-2.1.2c-.8 0-1.4-.2-1.7-.3 1.3-1.2 2.4-1.5 3.5-1.7.9-.2 1.8-.4 3-1.2 2.2-1.6 1.9-5.5 1.8-5.7z"></path>
                    </svg>
                </span>
            </button>
        </nav>
    );
};

export default SidebarNav;
