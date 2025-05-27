import type {JSX} from 'react';
import {useRef} from 'react';
import {MenuIcon} from '../Icons';

interface MenuButtonProps {
    buttonRef?: React.RefObject<HTMLButtonElement | null>;
    onClick: () => void;
    collapsed: boolean;
}

/**
 * MenuButton component that displays a button with a menu icon.
 * Used for toggling the sidebar menu.
 *
 * @param {Object} props - Component props
 * @param {React.RefObject<HTMLButtonElement | null>} props.buttonRef - Reference to the button element
 * @param {Function} props.onClick - Function to call when the button is clicked
 * @param {boolean} props.collapsed - Whether the menu is collapsed or not
 * @returns {JSX.Element} The menu button component
 */
const MenuButton = ({buttonRef, onClick, collapsed}: MenuButtonProps): JSX.Element => {
    const defaultRef = useRef<HTMLButtonElement>(null);
    const ref = buttonRef || defaultRef;

    return (
        <button
            ref={ref}
            onClick={onClick}
            className="p-2 rounded-full hover:bg-gray-800 transition-colors fixed z-50"
            aria-label={collapsed ? "Expand menu" : "Collapse menu"}
        >
            <MenuIcon className="h-6 w-6 text-white"/>
        </button>
    );
};

export default MenuButton;
