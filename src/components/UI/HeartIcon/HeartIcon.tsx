import { type JSX } from 'react';

/**
 * Props for the HeartIcon component
 * @interface HeartIconProps
 * @property {boolean} isFavorite - Whether the user is already in favorites
 * @property {boolean} [isHovered] - Whether the icon is being hovered
 * @property {string} [className] - Optional additional CSS classes
 */
interface HeartIconProps {
    isFavorite: boolean;
    isHovered?: boolean;
    className?: string;
}

/**
 * Component that displays a heart icon.
 * The icon color changes based on whether the user is a favorite and if it's being hovered.
 *
 * @param {HeartIconProps} props - Component props
 * @returns {JSX.Element} The heart icon component
 */
const HeartIcon = ({ isFavorite, isHovered = false, className = '' }: HeartIconProps): JSX.Element => {
    // Determine heart color based on favorite status and hover state
    // When isFavorite=true, heart is always red
    // When isFavorite=false and isHovered=true, heart is red
    // When isFavorite=false and isHovered=false, heart is periwinkle
    const heartColor = isFavorite
        ? 'text-red-600' // Always red when favorite
        : isHovered
            ? 'text-red-600' // Red on hover when not favorite
            : 'text-periwinkle'; // Default color when not favorite and not hovered

    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className={`w-3 h-3 ${heartColor} ${className}`}
        >
            <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z"/>
        </svg>
    );
};

export default HeartIcon;
