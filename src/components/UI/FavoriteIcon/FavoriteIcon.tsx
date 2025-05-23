import {type JSX} from 'react';
import PersonIcon from '../PersonIcon/PersonIcon';
import HeartIcon from '../HeartIcon/HeartIcon';

/**
 * Props for the FavoriteIcon component
 * @interface FavoriteIconProps
 * @property {boolean} isFavorite - Whether the user is already in favorites
 * @property {boolean} [isHovered] - Whether the icon is being hovered
 * @property {string} [className] - Optional additional CSS classes
 */
interface FavoriteIconProps {
    isFavorite: boolean;
    isHovered?: boolean;
    className?: string;
}

/**
 * Component that displays an icon for the "Add to Favorites" functionality.
 * Shows a person with a heart icon. The person is blue and the heart is red when the user is a favorite.
 * When not a favorite, hovering only changes the heart color to red.
 *
 * @param {FavoriteIconProps} props - Component props
 * @returns {JSX.Element} The favorite icon component
 */
const FavoriteIcon = ({isFavorite, isHovered = false, className = ''}: FavoriteIconProps): JSX.Element => {
    // Only apply hover effects if not a favorite
    const effectiveIsHovered = isFavorite ? false : isHovered;

    return (
        <div className={`relative ${className} transition-colors duration-200`}>
            <PersonIcon isFavorite={isFavorite}/>

            <HeartIcon
                isFavorite={isFavorite}
                isHovered={effectiveIsHovered}
                className="absolute top-1/4 right-0 transform -translate-y-1/2"
            />
        </div>
    );
};

export default FavoriteIcon;
