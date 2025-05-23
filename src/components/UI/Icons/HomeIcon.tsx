import {type JSX} from 'react';

interface HomeIconProps {
    className?: string;
}

/**
 * Home icon component for navigation.
 * Displays a house icon.
 *
 * @param {HomeIconProps} props - Component props
 * @returns {JSX.Element} The home icon component
 */
const HomeIcon = ({className = ''}: HomeIconProps): JSX.Element => {
    return (
        <svg
            className={className}
            stroke="currentColor"
            fill="none"
            viewBox="0 0 24 24"
            aria-hidden="true"
            role="img"
        >
            <title>Home icon</title>
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M3 12l9-9 9 9M5 10v10a1 1 0 001 1h3a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1h3a1 1 0 001-1V10M9 21h6"
            />
        </svg>
    );
};

export default HomeIcon;
