import {useAuthContext} from '../../hooks/context/useAuthContext.ts';
import {useUser} from '../../hooks/context/useUser.ts';
import UserInfo from '../LoginForm/UserInfo';
import {NavLink, LoginButton} from '../UI';
import {useLocation} from 'react-router-dom';

/**
 * Navigation component that displays the main navigation links and user authentication status.
 * Shows different navigation options based on whether the user is authenticated.
 * Uses the current location to highlight the active navigation link.
 * @returns The navigation bar with links and authentication controls
 */
const Navbar = () => {
    const {isAuthenticated, logout} = useAuthContext();
    const {userInformation} = useUser();
    const location = useLocation();
    /**
     * Determines if a navigation link should be highlighted as active based on the current URL path.
     * @param {string} path - The path to check against the current location
     * @returns {boolean} True if the current location matches the provided path
     */
    const isActive = (path: string): boolean => {
        return location.pathname === path;
    };

    return (
        <header className="bg-white dark:bg-black border-b border-gray-200 dark:border-gray-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <nav className="flex">
                        <ul className="flex space-x-4 items-center">
                            <li>
                                <NavLink to="/" isActive={isActive("/")}>
                                    Home
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/users/register" isActive={isActive("/users/register")}>
                                    Register
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/posts/create" isActive={isActive("/posts/create")}>
                                    Create Post
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/users/favorites" isActive={isActive("/users/favorites")}>
                                    Favorites
                                </NavLink>
                            </li>
                            <li>
                                {isAuthenticated ? (
                                    <div className="flex items-center ml-2">
                                        <UserInfo userInformation={userInformation} onLogout={logout}/>
                                    </div>
                                ) : (
                                    <LoginButton isActive={isActive("/login")}/>
                                )}
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        </header>
    );
};

export default Navbar;
