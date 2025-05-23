import {type JSX, type ReactNode} from 'react';

interface EmptyMessageProps {
    children?: ReactNode;
    className?: string;
}

/**
 * Component that displays a message when no content is available.
 * Used to show a friendly message to users when a list or collection is empty.
 *
 * @param {EmptyMessageProps} props - Component props
 * @returns {JSX.Element} The empty message component
 */
const EmptyMessage = ({
    children = 'No posts available.',
    className = ''
}: EmptyMessageProps): JSX.Element => {
    return (
        <p className={`text-center text-gray-500 dark:text-gray-400 my-8 ${className}`}>
            {children}
        </p>
    );
};

export default EmptyMessage;
