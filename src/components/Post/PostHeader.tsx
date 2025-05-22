import {type JSX} from 'react';
import type {Post} from '../../types/postTypes';

interface PostHeaderProps {
    post: Post;
    onAddToFavorites: (author: string, avatarUrl: string) => void;
    isReply?: boolean;
}

const PostHeader = ({post, onAddToFavorites, isReply = false}: PostHeaderProps): JSX.Element => {

    const handleAddToFavorites = () => {
        onAddToFavorites(post.author, post.avatar_url);
    };

    // Apply different styles for replies
    const avatarSize = isReply ? "w-8 h-8" : "w-10 h-10";
    const authorTextSize = isReply ? "text-sm" : "font-bold";

    return (
        <div className="flex items-start mb-3">
            <img
                src={post.avatar_url}
                alt={`${post.author}'s avatar`}
                className={`${avatarSize} rounded-full mr-3`}
            />
            <div className="flex-1">
                <div className="flex items-center">
                    <h3 className={`${authorTextSize} text-gray-900 dark:text-white`}>{post.author}</h3>
                    <span className="text-sm text-gray-500 ml-2">
                        {new Date(post.date).toLocaleString()}
                    </span>
                    {isReply && (
                        <span className="text-xs text-blue-500 ml-2">
                            Reply
                        </span>
                    )}
                </div>
            </div>
            {!isReply && (
                <button
                    onClick={handleAddToFavorites}
                    className="text-sm text-blue-500 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 ml-2"
                >
                    Add to Favorites
                </button>
            )}
        </div>
    );
};

export default PostHeader;
