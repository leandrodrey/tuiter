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
        <div className="flex items-start mb-3">
            <img
                src={post.avatar_url || '/images/default-profile.png'}
                alt={`${post.author}'s avatar`}
                className="w-10 h-10 rounded-full mr-3"
            />
            <div className="flex-1">
                <div className="flex items-center">
                    <h3 className="font-bold text-gray-900 dark:text-white">{post.author}</h3>
                    <span className="text-sm text-gray-500 ml-2">
                        {new Date(post.created_at).toLocaleString()}
                    </span>
                </div>
            </div>
            <button
                onClick={handleAddToFavorites}
                className="text-sm text-blue-500 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 ml-2"
            >
                Add to Favorites
            </button>
        </div>
    );
};

export default PostHeader;
