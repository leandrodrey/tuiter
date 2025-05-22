import {type JSX} from 'react';
import type {Post} from '../../types/postTypes';
import PostCard from './PostCard';

interface PostListProps {
    posts: Post[];
    onLike: (postId: string) => Promise<void>;
    onAddToFavorites: (author: string | undefined, avatarUrl: string | undefined) => void;
}

const PostList = ({posts, onLike, onAddToFavorites}: PostListProps): JSX.Element => {
    if (posts.length === 0) {
        return <p className="text-center text-gray-500 dark:text-gray-400 my-8">No posts available.</p>;
    }

    return (
        <div className="space-y-4 w-full max-w-2xl mx-auto">
            {posts.map(post => (
                <PostCard
                    key={post.id}
                    post={post}
                    onLike={onLike}
                    onAddToFavorites={onAddToFavorites}
                />
            ))}
        </div>
    );
};

export default PostList;
