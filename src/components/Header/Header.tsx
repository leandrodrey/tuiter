import type {JSX} from 'react';
import { useState } from 'react';
import {ToggleMenu} from '../SideNav';
import { MenuIcon } from '../UI';

/**
 * Header component that displays the application header.
 * Includes a responsive toggle menu using react-pro-sidebar.
 * Contains the toggle button that controls the sidebar collapse state.
 *
 * @returns {JSX.Element} The header component
 */
const Header = (): JSX.Element => {
    const [collapsed, setCollapsed] = useState(false);

    const handleToggle = () => {
        setCollapsed(!collapsed);
    };

    return (
        <header className="text-white h-auto z-50">
            <div className="flex">
                <button
                    onClick={handleToggle}
                    className="p-2 rounded-full hover:bg-gray-800 transition-colors fixed z-50 "
                    aria-label={collapsed ? "Expand menu" : "Collapse menu"}
                >
                    <MenuIcon className="h-6 w-6 text-white" />
                </button>
                <div className={`${collapsed ? 'w-0' : 'w-14 sm:w-16 lg:w-64'} transition-all duration-200`}>
                    <div className={`${collapsed ? 'w-0' : 'lg:w-64'} fixed h-[100dvh] transition-all duration-200`}>
                        <ToggleMenu collapsed={collapsed} />
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
