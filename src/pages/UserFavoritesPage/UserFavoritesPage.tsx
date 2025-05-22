import {useState, useEffect, type JSX} from 'react';
import {FAVORITE_USERS_KEY} from '../../constants/storageConstants';
import type {FavoriteUser} from '../../types/userTypes';
import { Loader, Avatar, PageHeader } from '../../components/UI';

const UserFavoritesPage = (): JSX.Element => {
    const [favorites, setFavorites] = useState<FavoriteUser[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        // Load favorites from localStorage
        const loadFavorites = () => {
            try {
                setIsLoading(true);
                const storedFavorites = localStorage.getItem(FAVORITE_USERS_KEY);
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
        localStorage.setItem(FAVORITE_USERS_KEY, JSON.stringify(updatedFavorites));
    };

    if (isLoading) {
        return <Loader text="Loading favorites..." fullScreen={true} />;
    }

    return (
        <div>
            <PageHeader title="Favorite Users" />

            <div className="max-w-2xl mx-auto">
                {favorites.length === 0 ? (
                    <p className="text-center text-gray-500 dark:text-gray-400 my-8">You haven't added any users to your favorites yet.</p>
                ) : (
                    <div className="space-y-4">
                        {favorites.map((favorite, index) => (
                            <div key={index} className="border border-gray-200 dark:border-gray-800 rounded-lg p-4 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors">
                                <div className="flex items-center">
                                    <Avatar
                                        username={favorite.author}
                                        avatarUrl={favorite.avatar_url}
                                        size="md"
                                        className="mr-3"
                                    />
                                    <h3 className="font-medium text-gray-900 dark:text-white">{favorite.author}</h3>
                                </div>

                                <button
                                    onClick={() => handleRemoveFavorite(favorite.author)}
                                    className="px-3 py-1 bg-red-500 hover:bg-red-600 text-white rounded-md transition-colors"
                                >
                                    Remove
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default UserFavoritesPage;
