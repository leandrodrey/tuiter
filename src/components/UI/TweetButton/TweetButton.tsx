import {type JSX, type ReactNode} from 'react';

interface TweetButtonProps {
    onClick?: () => void;
    className?: string;
    type?: 'button' | 'submit';
    disabled?: boolean;
    children?: ReactNode;
}

/**
 * Button component for tweeting or posting.
 * Shows "Tweet" text on larger screens and a plus icon on smaller screens.
 *
 * @param {TweetButtonProps} props - Component props
 * @returns {JSX.Element} The tweet button component
 */
const TweetButton = ({
    onClick,
    className = '',
    type = 'button',
    disabled = false,
    children
}: TweetButtonProps): JSX.Element => {
    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={`bg-blue-400 hover:bg-blue-500 w-full mt-4 sm:mt-5 text-white font-bold py-1 sm:py-2 px-2 sm:px-4 rounded-full text-sm sm:text-base ${className}`}
        >
            {children ? children : (
                <>
                    <span className="hidden md:inline">Tweet</span>
                    <span className="md:hidden">
                        <svg className="h-5 w-5 mx-auto" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M8.8 7.2H5.6V3.9c0-.4-.3-.8-.8-.8s-.7.4-.7.8v3.3H.8c-.4 0-.8.3-.8.8s.3.8.8.8h3.3v3.3c0 .4.3.8.8.8s.8-.3.8-.8V8.7H9c.4 0 .8-.3.8-.8s-.5-.7-1-.7zm15-4.9v-.1h-.1c-.1 0-9.2 1.2-14.4 11.7-3.8 7.6-3.6 9.9-3.3 9.9.3.1 3.4-6.5 6.7-9.2 5.2-1.1 6.6-3.6 6.6-3.6s-1.5.2-2.1.2c-.8 0-1.4-.2-1.7-.3 1.3-1.2 2.4-1.5 3.5-1.7.9-.2 1.8-.4 3-1.2 2.2-1.6 1.9-5.5 1.8-5.7z"></path>
                        </svg>
                    </span>
                </>
            )}
        </button>
    );
};

export default TweetButton;
