import {useEffect, useState, type JSX} from 'react';
import {apiGetFeed} from '../../services/FeedService.ts';
import {apiAddLikeToTuit, apiRemoveLikeFromTuit} from '../../services/TuitsService.ts';
import {FAVORITE_USERS_KEY} from '../../constants/storageConstants';
import type {Post} from '../../types/postTypes';
import PostList from '../../components/Post/PostList';
import {useToast} from "../../hooks/useToast.ts";

const FeedPage = (): JSX.Element => {
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const toast = useToast();

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                setLoading(true);
                const response = await apiGetFeed({page: 1});
                console.log(response);
                // Transform the response to match our Post interface with additional properties
                const transformedPosts = response.map(tuit => ({
                    ...tuit,
                    author: `User ${tuit.user_id}`, // In a real app, you'd fetch user details
                    avatar_url: '/images/default-profile.png',
                    likes_count: 0, // In a real app, this would come from the API
                    is_liked: false // In a real app, this would come from the API
                }));

                setPosts(transformedPosts);
            } catch (err) {
                setError('Failed to load posts. Please try again later.');
                console.error('Error fetching posts:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchPosts();
    }, []);

    const handleLikePost = async (postId: string) => {
        try {
            // Check if the post is already liked
            const post = posts.find(p => p.id === postId);

            if (post && post.is_liked) {
                // Unlike the post
                await apiRemoveLikeFromTuit(postId);

                setPosts(prevPosts =>
                    prevPosts.map(p =>
                        p.id === postId
                            ? {...p, likes_count: (p.likes_count || 0) - 1, is_liked: false}
                            : p
                    )
                );
            } else {
                // Like the post
                await apiAddLikeToTuit(postId);

                setPosts(prevPosts =>
                    prevPosts.map(p =>
                        p.id === postId
                            ? {...p, likes_count: (p.likes_count || 0) + 1, is_liked: true}
                            : p
                    )
                );
            }
        } catch (err) {
            console.error('Error toggling like on post:', err);
        }
    };

    const handleAddToFavorites = (author: string | undefined, avatarUrl: string | undefined) => {
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

    if (loading) return <div className="flex justify-center items-center min-h-screen text-gray-500 dark:text-gray-400">Loading posts...</div>;
    if (error) return <div className="p-4 text-red-500 dark:text-red-400 text-center">{error}</div>;

    return (
        <div>
            <h1 className="text-3xl font-bold text-center mb-8 text-gray-900 dark:text-white">Post Feed</h1>
            <PostList
                posts={posts}
                onLike={handleLikePost}
                onAddToFavorites={handleAddToFavorites}
            />
        </div>
    );
};

export default FeedPage;
