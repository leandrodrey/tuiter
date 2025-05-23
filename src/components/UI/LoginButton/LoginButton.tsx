import {type JSX} from 'react';
import {Link} from 'react-router-dom';
import {Avatar} from '../index';

/**
 * Interface defining the props for the LoginButton component.
 */
interface LoginButtonProps {
    /** Whether the button should be displayed in its active state */
    isActive: boolean;
    /** Optional additional CSS classes to apply to the button */
    className?: string;
}

/**
 * Component that renders a login button with an avatar.
 * The button links to the login page and can be styled differently based on its active state.
 * @param {LoginButtonProps} props - The component props
 * @returns A styled login button with an avatar
 */
const LoginButton = ({isActive, className = ''}: LoginButtonProps): JSX.Element => {
    const linkClassName = `flex items-center px-3 py-2 text-sm font-medium rounded-full transition-colors ${
        isActive
            ? 'text-blue-500 bg-blue-50 dark:bg-blue-900/20'
            : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800'
    } ${className}`;

    return (
        <Link to="/login" className={linkClassName} title="Login" aria-label="Login">
            <Avatar
                username="Guest"
                size="sm"
                className="mr-2 border-3 border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-400 transition-colors"
                avatarUrl="images/default-profile.png"
            />
            <span className="sr-only">Login</span>
        </Link>
    );
};

export default LoginButton;
