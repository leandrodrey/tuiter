import {apiAddLikeToTuit, apiRemoveLikeFromTuit} from '../../services/TuitsService.ts';
import {FAVORITE_USERS_KEY} from '../../constants/storageConstants.ts';
import {useToast} from '../context/useToast.ts';
import {useUser} from '../context/useUser.ts';
import type {Post} from '../../types/postTypes.ts';
import type {PostWithReplies} from './usePostProcessor.ts';
import type {Dispatch, SetStateAction} from 'react';

/**
 * Hook for handling post interactions (liking, adding to favorites)
 * @param postsWithReplies The current posts with their replies
 * @param setPostsWithReplies Function to update the posts with replies
 * @returns Functions for post interactions
 */
export const usePostInteractions = (
    postsWithReplies: PostWithReplies[],
    setPostsWithReplies: Dispatch<SetStateAction<PostWithReplies[]>>
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
            // Find the post in either parent posts or replies
            let targetPost: Post | undefined;
            let isReply = false;
            let parentPostId = 0;

            // Search in parent posts
            for (const postWithReplies of postsWithReplies) {
                if (postWithReplies.post.id === postId) {
                    targetPost = postWithReplies.post;
                    break;
                }

                const reply = postWithReplies.replies.find(r => r.id === postId);
                if (reply) {
                    targetPost = reply;
                    isReply = true;
                    parentPostId = postWithReplies.post.id;
                    break;
                }
            }

            if (!targetPost) {
                console.error(`Post with ID ${postId} not found`);
                return;
            }

            if (targetPost.liked) {
                // Unlike the post
                await apiRemoveLikeFromTuit(postId);

                setPostsWithReplies(prevPostsWithReplies =>
                    prevPostsWithReplies.map(pwr => {
                        if (!isReply && pwr.post.id === postId) {
                            // Update parent post
                            return {
                                ...pwr,
                                post: {
                                    ...pwr.post,
                                    likes: (pwr.post.likes || 0) - 1,
                                    liked: false
                                },
                                key: pwr.post.id.toString()
                            };
                        } else if (isReply && pwr.post.id === parentPostId) {
                            // Update reply
                            return {
                                ...pwr,
                                replies: pwr.replies.map(reply =>
                                    reply.id === postId
                                        ? {
                                            ...reply,
                                            likes: (reply.likes || 0) - 1,
                                            liked: false,
                                            key: reply.id.toString()
                                        }
                                        : {...reply, key: reply.id.toString()}
                                ),
                                key: pwr.post.id.toString()
                            };
                        }
                        return {...pwr, key: pwr.post.id.toString()};
                    })
                );
            } else {
                await apiAddLikeToTuit(postId);

                setPostsWithReplies(prevPostsWithReplies =>
                    prevPostsWithReplies.map(pwr => {
                        if (!isReply && pwr.post.id === postId) {
                            // Update parent post
                            return {
                                ...pwr,
                                post: {
                                    ...pwr.post,
                                    likes: (pwr.post.likes || 0) + 1,
                                    liked: true
                                },
                                key: pwr.post.id.toString()
                            };
                        } else if (isReply && pwr.post.id === parentPostId) {
                            // Update reply
                            return {
                                ...pwr,
                                replies: pwr.replies.map(reply =>
                                    reply.id === postId
                                        ? {
                                            ...reply,
                                            likes: (reply.likes || 0) + 1,
                                            liked: true,
                                            key: reply.id.toString()
                                        }
                                        : {...reply, key: reply.id.toString()}
                                ),
                                key: pwr.post.id.toString()
                            };
                        }
                        return {...pwr, key: pwr.post.id.toString()};
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
