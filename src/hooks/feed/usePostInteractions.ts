import { apiAddLikeToTuit, apiRemoveLikeFromTuit } from '../../services/TuitsService.ts';
import { FAVORITE_USERS_KEY } from '../../constants/storageConstants.ts';
import { useToast } from '../context/useToast.ts';
import type { Post } from '../../types/postTypes.ts';
import type { PostWithReplies } from './usePostProcessor.ts';
import type { Dispatch, SetStateAction } from 'react';

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

                // Search in replies
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
                                }
                            };
                        } else if (isReply && pwr.post.id === parentPostId) {
                            // Update reply
                            return {
                                ...pwr,
                                replies: pwr.replies.map(reply =>
                                    reply.id === postId
                                        ? {...reply, likes: (reply.likes || 0) - 1, liked: false}
                                        : reply
                                )
                            };
                        }
                        return pwr;
                    })
                );
            } else {
                // Like the post
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
                                }
                            };
                        } else if (isReply && pwr.post.id === parentPostId) {
                            // Update reply
                            return {
                                ...pwr,
                                replies: pwr.replies.map(reply =>
                                    reply.id === postId
                                        ? {...reply, likes: (reply.likes || 0) + 1, liked: true}
                                        : reply
                                )
                            };
                        }
                        return pwr;
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
        // Get existing favorites from localStorage
        const existingFavorites = JSON.parse(localStorage.getItem(FAVORITE_USERS_KEY) || '[]');

        const isAlreadyFavorite = existingFavorites.some(
            (favorite: { author: string }) => favorite.author === author
        );

        if (!isAlreadyFavorite) {
            // Add to favorites
            const updatedFavorites = [...existingFavorites, {author, avatar_url: avatarUrl}];
            localStorage.setItem(FAVORITE_USERS_KEY, JSON.stringify(updatedFavorites));
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
