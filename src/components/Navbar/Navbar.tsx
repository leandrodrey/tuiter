import {Link, useLocation} from 'react-router-dom';
import {useAuthContext} from '../../hooks/context/useAuthContext.ts';
import UserInfo from '../LoginForm/UserInfo';

const Navbar = () => {
    const location = useLocation();
    const {isAuthenticated, userInformation, logout} = useAuthContext();
    console.log(userInformation)

    const isActive = (path: string) => {
        return location.pathname === path;
    };

    return (
        <header className="bg-white dark:bg-black border-b border-gray-200 dark:border-gray-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex items-center">
                        {/* Logo */}
                        <div className="flex-shrink-0 flex items-center">
                            <svg className="h-8 w-8 text-blue-500" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M23.643 4.937c-.835.37-1.732.62-2.675.733.962-.576 1.7-1.49 2.048-2.578-.9.534-1.897.922-2.958 1.13-.85-.904-2.06-1.47-3.4-1.47-2.572 0-4.658 2.086-4.658 4.66 0 .364.042.718.12 1.06-3.873-.195-7.304-2.05-9.602-4.868-.4.69-.63 1.49-.63 2.342 0 1.616.823 3.043 2.072 3.878-.764-.025-1.482-.234-2.11-.583v.06c0 2.257 1.605 4.14 3.737 4.568-.392.106-.803.162-1.227.162-.3 0-.593-.028-.877-.082.593 1.85 2.313 3.198 4.352 3.234-1.595 1.25-3.604 1.995-5.786 1.995-.376 0-.747-.022-1.112-.065 2.062 1.323 4.51 2.093 7.14 2.093 8.57 0 13.255-7.098 13.255-13.254 0-.2-.005-.402-.014-.602.91-.658 1.7-1.477 2.323-2.41z"></path>
                            </svg>
                        </div>
                    </div>

                    {/* Navigation */}
                    <nav className="flex">
                        <ul className="flex space-x-4 items-center">
                            <li>
                                <Link
                                    to="/"
                                    className={`px-3 py-2 text-sm font-medium rounded-full transition-colors ${
                                        isActive('/') 
                                            ? 'text-blue-500 bg-blue-50 dark:bg-blue-900/20' 
                                            : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800'
                                    }`}
                                >
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/users/register"
                                    className={`px-3 py-2 text-sm font-medium rounded-full transition-colors ${
                                        isActive('/users/register') 
                                            ? 'text-blue-500 bg-blue-50 dark:bg-blue-900/20' 
                                            : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800'
                                    }`}
                                >
                                    Register
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/posts/create"
                                    className={`px-3 py-2 text-sm font-medium rounded-full transition-colors ${
                                        isActive('/posts/create') 
                                            ? 'text-blue-500 bg-blue-50 dark:bg-blue-900/20' 
                                            : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800'
                                    }`}
                                >
                                    Create Post
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/users/edit"
                                    className={`px-3 py-2 text-sm font-medium rounded-full transition-colors ${
                                        isActive('/users/edit') 
                                            ? 'text-blue-500 bg-blue-50 dark:bg-blue-900/20' 
                                            : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800'
                                    }`}
                                >
                                    Edit Profile
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/users/favorites"
                                    className={`px-3 py-2 text-sm font-medium rounded-full transition-colors ${
                                        isActive('/users/favorites') 
                                            ? 'text-blue-500 bg-blue-50 dark:bg-blue-900/20' 
                                            : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800'
                                    }`}
                                >
                                    Favorites
                                </Link>
                            </li>
                            <li>
                                {isAuthenticated ? (
                                    <div className="flex items-center ml-2">
                                        <UserInfo userInformation={userInformation} onLogout={logout}/>
                                    </div>
                                ) : (
                                    <Link
                                        to="/login"
                                        className={`px-3 py-2 text-sm font-medium rounded-full transition-colors ${
                                            isActive('/login') 
                                                ? 'text-blue-500 bg-blue-50 dark:bg-blue-900/20' 
                                                : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800'
                                        }`}
                                    >
                                        Login
                                    </Link>
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
