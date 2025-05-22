import {type JSX} from 'react';
import type {Post} from '../../types/postTypes';

interface PostHeaderProps {
    post: Post;
    onAddToFavorites: (author: string | undefined, avatarUrl: string | undefined) => void;
}

const PostHeader = ({post, onAddToFavorites}: PostHeaderProps): JSX.Element => {
    const handleAddToFavorites = () => {
        onAddToFavorites(post.author, post.avatar_url);
    };

    return (
        <div className="post-header">
            <img
                src={post.avatar_url || 'https://via.placeholder.com/50'}
                alt={`${post.author}'s avatar`}
                className="avatar"
            />
            <div className="author-info">
                <h3>{post.author}</h3>
                <span>{new Date(post.created_at).toLocaleString()}</span>
            </div>
            <button
                onClick={handleAddToFavorites}
                className="favorite-button"
            >
                Add to Favorites
            </button>
        </div>
    );
};

export default PostHeader;
