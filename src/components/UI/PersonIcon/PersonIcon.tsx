import { type JSX } from 'react';

/**
 * Props for the PersonIcon component
 * @interface PersonIconProps
 * @property {boolean} isFavorite - Whether the user is already in favorites
 * @property {string} [className] - Optional additional CSS classes
 */
interface PersonIconProps {
    isFavorite: boolean;
    className?: string;
}

/**
 * Component that displays a person icon.
 * The icon color changes based on whether the user is a favorite.
 *
 * @param {PersonIconProps} props - Component props
 * @returns {JSX.Element} The person icon component
 */
const PersonIcon = ({ isFavorite, className = '' }: PersonIconProps): JSX.Element => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className={`w-7 h-7 ${isFavorite ? 'text-red-600' : 'text-periwinkle'} ${className}`}
        >
            <path d="M8 6.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z"/>
            <path d="M8 7.5a3.5 3.5 0 1 1 0-7 3.5 3.5 0 0 1 0 7Zm.5 1h-1a4.5 4.5 0 0 0-4.5 4.5v.5h10v-.5a4.5 4.5 0 0 0-4.5-4.5Z"/>
        </svg>
    );
};

export default PersonIcon;
