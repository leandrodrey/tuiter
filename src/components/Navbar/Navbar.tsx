import {useAuthContext} from '../../hooks/context/useAuthContext.ts';
import UserInfo from '../LoginForm/UserInfo';
import {NavLink} from '../UI';
import {useLocation} from 'react-router-dom';

const Navbar = () => {
    const {isAuthenticated, userInformation, logout} = useAuthContext();
    const location = useLocation();
    console.log(userInformation)

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
                                <NavLink to="/users/edit" isActive={isActive("/users/edit")}>
                                    Edit Profile
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
                                    <NavLink to="/login" isActive={isActive("/login")}>
                                        Login
                                    </NavLink>
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
