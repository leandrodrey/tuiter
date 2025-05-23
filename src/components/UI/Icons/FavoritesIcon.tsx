import {type JSX} from 'react';

interface FavoritesIconProps {
    className?: string;
}

/**
 * Favorites icon component for navigation.
 * Displays a bookmark icon.
 *
 * @param {FavoritesIconProps} props - Component props
 * @returns {JSX.Element} The favorites icon component
 */
const FavoritesIcon = ({className = ''}: FavoritesIconProps): JSX.Element => {
    return (
        <svg className={className} fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" stroke="currentColor" viewBox="0 0 24 24">
            <path d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"></path>
        </svg>
    );
};

export default FavoritesIcon;
