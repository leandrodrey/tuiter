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
        return <p>No posts available.</p>;
    }

    return (
        <div className="posts-list">
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
