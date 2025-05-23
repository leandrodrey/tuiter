import { useState, useEffect } from 'react';
import { FAVORITE_USERS_KEY } from '../../constants/storageConstants';
import { useUser } from '../context/useUser';

/**
 * Custom hook to check if a user is in favorites and update when favorites change.
 *
 * @param {string} author - The username to check in favorites
 * @returns {boolean} Whether the user is in favorites
 */
export const useFavoriteStatus = (author: string): boolean => {
  const { userInformation } = useUser();
  const [isFavorite, setIsFavorite] = useState<boolean>(false);

  // Create a user-specific key for storing favorites
  const getUserSpecificKey = () => {
    if (!userInformation || !userInformation.email) {
      return FAVORITE_USERS_KEY;
    }
    return `${FAVORITE_USERS_KEY}_${userInformation.email}`;
  };

  // Check if the user is in favorites
  const checkFavoriteStatus = () => {
    const userSpecificKey = getUserSpecificKey();
    const existingFavorites = JSON.parse(localStorage.getItem(userSpecificKey) || '[]');
    const isAlreadyFavorite = existingFavorites.some(
      (favorite: { author: string }) => favorite.author === author
    );
    setIsFavorite(isAlreadyFavorite);
  };

  // Listen for storage events to update the favorite status when it changes
  useEffect(() => {
    // Check initial status
    checkFavoriteStatus();

    // Function to handle storage events
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === getUserSpecificKey()) {
        checkFavoriteStatus();
      }
    };

    // Add event listener for storage events
    window.addEventListener('storage', handleStorageChange);

    // Clean up event listener
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [author, userInformation]);

  return isFavorite;
};
