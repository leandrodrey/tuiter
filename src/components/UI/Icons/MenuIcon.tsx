import {type JSX} from 'react';

interface MenuIconProps {
    className?: string;
}

/**
 * MenuIcon component that displays a hamburger menu icon.
 * Used for toggling the sidebar menu.
 *
 * @param {Object} props - Component props
 * @param {string} props.className - Additional CSS classes
 * @returns {JSX.Element} The menu icon component
 */
const MenuIcon = ({className = ''}: MenuIconProps): JSX.Element => {
    return (
        <svg
            className={className}
            fill="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                fillRule="evenodd"
                d="M3 6.75A.75.75 0 013.75 6h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 6.75zM3 12a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 12zm0 5.25a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75a.75.75 0 01-.75-.75z"
                clipRule="evenodd"
            />
        </svg>
    );
};

export default MenuIcon;
