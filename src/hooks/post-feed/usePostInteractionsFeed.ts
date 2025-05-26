import {apiAddLikeToTuit, apiRemoveLikeFromTuit} from '../../services/TuitsService.ts';
import {FAVORITE_USERS_KEY} from '../../constants/storageConstants.ts';
import {useToast} from '../context/useToast.ts';
import {useUser} from '../context/useUser.ts';
import type {Post} from '../../types/postTypes.ts';
import type {Dispatch, SetStateAction} from 'react';

/**
 * Hook for handling post interactions (liking, adding to favorites) in the feed
 * Simplified version that only handles parent posts
 * @param posts The current posts
 * @param setPosts Function to update the posts
 * @returns Functions for post interactions
 */
export const usePostInteractionsFeed = (
    posts: Post[],
    setPosts: Dispatch<SetStateAction<Post[]>>
) => {
    const toast = useToast();
    const {userInformation} = useUser();

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

    /**
     * Handles liking or unliking a post
     * @param postId The ID of the post to like/unlike
     */
    const handleLikePost = async (postId: number) => {
        try {
            // Find the post
            const targetPost = posts.find(post => post.id === postId);

            if (!targetPost) {
                console.error(`Post with ID ${postId} not found`);
                return;
            }

            if (targetPost.liked) {
                // Unlike the post
                await apiRemoveLikeFromTuit(postId);

                setPosts(prevPosts =>
                    prevPosts.map(post => {
                        if (post.id === postId) {
                            return {
                                ...post,
                                likes: (post.likes || 0) - 1,
                                liked: false
                            };
                        }
                        return post;
                    })
                );
            } else {
                // Like the post
                await apiAddLikeToTuit(postId);

                setPosts(prevPosts =>
                    prevPosts.map(post => {
                        if (post.id === postId) {
                            return {
                                ...post,
                                likes: (post.likes || 0) + 1,
                                liked: true
                            };
                        }
                        return post;
                    })
                );
            }
        } catch (err) {
            console.error('Error toggling like on post:', err);
        }
    };

    /**
     * Handles adding a user to favorites
     * @param author The username of the user to add to favorites
     * @param avatarUrl The avatar URL of the user to add to favorites
     */
    const handleAddToFavorites = (author: string, avatarUrl: string) => {
        // Get user-specific key for favorites
        const userSpecificKey = getUserSpecificKey();

        // Get existing favorites from localStorage
        const existingFavorites = JSON.parse(localStorage.getItem(userSpecificKey) || '[]');

        const isAlreadyFavorite = existingFavorites.some(
            (favorite: { author: string }) => favorite.author === author
        );

        if (!isAlreadyFavorite) {
            // Add to favorites
            const updatedFavorites = [...existingFavorites, {author, avatar_url: avatarUrl}];
            localStorage.setItem(userSpecificKey, JSON.stringify(updatedFavorites));
            toast.success(`${author} added to favorites!`);
        } else {
            toast.info(`${author} is already in your favorites!`);
        }
    };

    return {
        handleLikePost,
        handleAddToFavorites
    };
};
