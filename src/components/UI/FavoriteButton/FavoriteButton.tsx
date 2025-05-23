import {type JSX} from 'react';
import FavoriteIcon from '../FavoriteIcon/FavoriteIcon';
import {useFavoriteButton} from '../../../hooks/favorites/useFavoriteButton';

/**
 * Props for the FavoriteButton component
 * @interface FavoriteButtonProps
 * @property {string} author - The username of the user to add to favorites
 * @property {string} avatarUrl - The avatar URL of the user to add to favorites
 * @property {(author: string, avatarUrl: string) => void} onAddToFavorites - Function to call when adding to favorites
 * @property {string} [className] - Optional additional CSS classes
 */
interface FavoriteButtonProps {
    author: string;
    avatarUrl: string;
    onAddToFavorites: (author: string, avatarUrl: string) => void;
    className?: string;
}

/**
 * Button component for adding a user to favorites.
 * Shows a person with a heart icon, and a check mark if the user is already in favorites.
 *
 * @param {FavoriteButtonProps} props - Component props
 * @returns {JSX.Element} The favorite button component
 */
const FavoriteButton = ({
    author,
    avatarUrl,
    onAddToFavorites,
    className = ''
}: FavoriteButtonProps): JSX.Element => {
    // Use the custom hook to manage favorite button state and interactions
    const {
        isFavorite,
        isHovered,
        handleClick,
        handleMouseEnter,
        handleMouseLeave
    } = useFavoriteButton(author, avatarUrl, onAddToFavorites);

    return (
        <button
            onClick={handleClick}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className={`p-2 rounded-full transition-colors hover:bg-wildBlueYonder/20 dark:hover:bg-periwinkle/20 ${className}`}
            title={isFavorite ? `${author} is in your favorites` : `Add ${author} to favorites`}
            aria-label={isFavorite ? `${author} is in your favorites` : `Add ${author} to favorites`}
        >
            <FavoriteIcon isFavorite={isFavorite} isHovered={isHovered} />
        </button>
    );
};

export default FavoriteButton;
