import { useState, useEffect } from 'react';
import { useFavoriteStatus } from './useFavoriteStatus';
import { useUser } from '../context/useUser';
import { FAVORITE_USERS_KEY } from '../../constants/storageConstants';

/**
 * Custom hook for managing favorite button state and interactions.
 * Handles favorite status, hover state, and favorite toggling.
 *
 * @param {string} author - The username of the user to check/add to favorites
 * @param {string} avatarUrl - The avatar URL of the user
 * @param {(author: string, avatarUrl: string) => void} onAddToFavorites - Function to call when adding to favorites
 * @returns {Object} Object containing state and handlers for the favorite button
 */
export const useFavoriteButton = (
  author: string,
  avatarUrl: string,
  onAddToFavorites: (author: string, avatarUrl: string) => void
) => {
  // Get initial favorite status from hook
  const initialIsFavorite = useFavoriteStatus(author);
  // Maintain local state for immediate UI updates
  const [isFavorite, setIsFavorite] = useState<boolean>(initialIsFavorite);
  // Track hover state
  const [isHovered, setIsHovered] = useState(false);

  const { userInformation } = useUser();

  // Update local state when hook value changes
  useEffect(() => {
    setIsFavorite(initialIsFavorite);
  }, [initialIsFavorite]);

  // Create a user-specific key for storing favorites
  const getUserSpecificKey = () => {
    if (!userInformation || !userInformation.email) {
      return FAVORITE_USERS_KEY;
    }
    return `${FAVORITE_USERS_KEY}_${userInformation.email}`;
  };

  // Check if user is already in favorites
  const checkIfFavorite = (): boolean => {
    const userSpecificKey = getUserSpecificKey();
    const existingFavorites = JSON.parse(localStorage.getItem(userSpecificKey) || '[]');
    return existingFavorites.some(
      (favorite: { author: string }) => favorite.author === author
    );
  };

  // Handle click on the favorite button
  const handleClick = () => {
    // Call the provided onAddToFavorites function
    onAddToFavorites(author, avatarUrl);

    // Update local state immediately based on the new status
    // If it was already a favorite, it will remain a favorite (the toast will just show a message)
    // If it wasn't a favorite, it will become a favorite
    const newIsFavorite = !isFavorite || checkIfFavorite();
    setIsFavorite(newIsFavorite);
  };

  // Handle mouse enter and leave events
  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);

  return {
    isFavorite,
    isHovered,
    handleClick,
    handleMouseEnter,
    handleMouseLeave
  };
};
