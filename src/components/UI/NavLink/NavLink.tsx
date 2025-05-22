import {type JSX, type ReactNode} from 'react';
import {Link} from 'react-router-dom';

interface NavLinkProps {
    to: string;
    children: ReactNode;
    className?: string;
    isActive: boolean;
}

const NavLink = ({to, children, className = '', isActive}: NavLinkProps): JSX.Element => {
    const linkClassName = `px-3 py-2 text-sm font-medium rounded-full transition-colors ${
        isActive
            ? 'text-blue-500 bg-blue-50 dark:bg-blue-900/20'
            : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800'
    } ${className}`;

    return (
        <Link to={to} className={linkClassName}>
            {children}
        </Link>
    );
};

export default NavLink;
