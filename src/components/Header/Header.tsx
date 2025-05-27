import type {JSX} from 'react';
import {useState, useRef, useCallback} from 'react';
import {ToggleMenu} from '../SideNav';
import {MenuButton} from '../UI';
import {useOnClickOutside} from '../../hooks/useOnClickOutside';

/**
 * Header component that displays the application header.
 * Includes a responsive toggle menu using react-pro-sidebar.
 * Uses the MenuButton component to control the sidebar collapse state.
 * Implements click-outside behavior to collapse the menu when clicking outside.
 *
 * @returns {JSX.Element} The header component
 */
const Header = (): JSX.Element => {
    const [collapsed, setCollapsed] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);
    const buttonRef = useRef<HTMLButtonElement>(null);

    const handleToggle = () => {
        setCollapsed(!collapsed);
    };

    const handleClickOutside = useCallback((event: MouseEvent | TouchEvent) => {
        if (!collapsed && buttonRef.current && !buttonRef.current.contains(event.target as Node)) {
            setCollapsed(true);
        }
    }, [collapsed]);

    useOnClickOutside(menuRef, handleClickOutside);

    return (
        <header className="text-white h-auto z-50">
            <div className="flex">
                <MenuButton
                    buttonRef={buttonRef}
                    onClick={handleToggle}
                    collapsed={collapsed}
                />
                <div className={`${collapsed ? 'w-0' : 'w-14 sm:w-16 lg:w-64'} transition-all duration-200`} ref={menuRef}>
                    <div className={`${collapsed ? 'w-0' : 'lg:w-64'} fixed h-[100dvh] transition-all duration-200`}>
                        <ToggleMenu collapsed={collapsed}/>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
