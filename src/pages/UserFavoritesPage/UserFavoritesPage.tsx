import { useState, useEffect, type JSX } from 'react';

interface FavoriteUser {
  author: string;
  avatar_url: string;
}

const UserFavoritesPage = (): JSX.Element => {
  const [favorites, setFavorites] = useState<FavoriteUser[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    // Load favorites from localStorage
    const loadFavorites = () => {
      try {
        setIsLoading(true);
        const storedFavorites = localStorage.getItem('favoriteUsers');
        if (storedFavorites) {
          setFavorites(JSON.parse(storedFavorites));
        }
      } catch (error) {
        console.error('Error loading favorites:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadFavorites();
  }, []);

  const handleRemoveFavorite = (author: string) => {
    // Filter out the user to be removed
    const updatedFavorites = favorites.filter(favorite => favorite.author !== author);

    // Update state
    setFavorites(updatedFavorites);

    // Update localStorage
    localStorage.setItem('favoriteUsers', JSON.stringify(updatedFavorites));
  };

  if (isLoading) {
    return <div>Loading favorites...</div>;
  }

  return (
    <div className="favorites-container">
      <h1>Favorite Users</h1>

      {favorites.length === 0 ? (
        <p>You haven't added any users to your favorites yet.</p>
      ) : (
        <div className="favorites-list">
          {favorites.map((favorite, index) => (
            <div key={index} className="favorite-card">
              <div className="favorite-info">
                <img
                  src={favorite.avatar_url || 'https://via.placeholder.com/50'}
                  alt={`${favorite.author}'s avatar`}
                  className="avatar"
                />
                <h3>{favorite.author}</h3>
              </div>

              <button
                onClick={() => handleRemoveFavorite(favorite.author)}
                className="remove-button"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserFavoritesPage;
