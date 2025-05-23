import {useState, useEffect, type JSX} from 'react';
import {FAVORITE_USERS_KEY} from '../../constants/storageConstants';
import type {FavoriteUser} from '../../types/userTypes';
import {Loader, Avatar, PageHeader} from '../../components/UI';
import {useUser} from '../../hooks/context/useUser';

/**
 * Page component that displays a list of users that the current user has added to favorites.
 * Uses a user-specific key in localStorage to store and retrieve favorites,
 * ensuring that each user has their own separate list of favorites.
 *
 * @returns {JSX.Element} The rendered favorites page
 */
const UserFavoritesPage = (): JSX.Element => {
    const [favorites, setFavorites] = useState<FavoriteUser[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const { userInformation } = useUser();

    /**
     * Creates a user-specific key for storing favorites in localStorage.
     * Uses the user's email to create a unique key for each user.
     * Falls back to the default key if user information is not available.
     *
     * @returns {string} The user-specific localStorage key for favorites
     */
    const getUserSpecificKey = () => {
        if (!userInformation || !userInformation.email) {
            return FAVORITE_USERS_KEY;
        }
        return `${FAVORITE_USERS_KEY}_${userInformation.email}`;
    };

    useEffect(() => {
        const loadFavorites = () => {
            try {
                setIsLoading(true);
                const userSpecificKey = getUserSpecificKey();
                const storedFavorites = localStorage.getItem(userSpecificKey);
                if (storedFavorites) {
                    setFavorites(JSON.parse(storedFavorites));
                } else {
                    setFavorites([]);
                }
            } catch (error) {
                console.error('Error loading favorites:', error);
            } finally {
                setIsLoading(false);
            }
        };

        loadFavorites();
    }, [userInformation]);

    /**
     * Removes a user from the favorites list.
     * Updates both the state and the user-specific localStorage entry.
     *
     * @param {string} author - The username of the user to remove from favorites
     */
    const handleRemoveFavorite = (author: string) => {
        const updatedFavorites = favorites.filter(favorite => favorite.author !== author);
        setFavorites(updatedFavorites);
        const userSpecificKey = getUserSpecificKey();
        localStorage.setItem(userSpecificKey, JSON.stringify(updatedFavorites));
    };

    if (isLoading) {
        return <Loader text="Loading favorites..." fullScreen={true}/>;
    }

    return (
        <div>
            <PageHeader title="Favorite Users" subtitle="Users you have added to your favorites"/>

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
