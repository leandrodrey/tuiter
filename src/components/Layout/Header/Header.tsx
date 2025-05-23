import type {JSX} from 'react';
import {TuiterLogo} from '../../UI';
import {useLocation} from 'react-router-dom';
import {useAuthContext} from '../../../hooks/context/useAuthContext.ts';
import {useUser} from '../../../hooks/context/useUser.ts';
import {SidebarNav, UserMenu} from '../../Navbar';

/**
 * Header component that displays the application header.
 * Includes the logo, navigation, and user menu in a Twitter-like style.
 * Uses SidebarNav for navigation links and UserMenu for user information.
 *
 * @returns {JSX.Element} The header component
 */
const Header = (): JSX.Element => {
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
        <header className="text-white h-auto">
            <div className="w-14 sm:w-16 lg:w-64 transition-all duration-200">
                <div className="lg:w-64 fixed h-screen pr-0 md:pr-3 transition-all duration-200">
                    <div className="ml-2 sm:ml-3 mt-4">
                        <TuiterLogo className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
                    </div>
                    <SidebarNav isActive={isActive} />
                    <UserMenu
                        userInformation={userInformation}
                        onLogout={logout}
                        isAuthenticated={isAuthenticated}
                    />
                </div>
            </div>
        </header>
    );
};

export default Header;
