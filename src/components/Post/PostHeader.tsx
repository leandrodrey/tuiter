import {type JSX} from 'react';
import type {Post} from '../../types/postTypes';
import { Avatar } from '../../components/UI';

interface PostHeaderProps {
    post: Post;
    onAddToFavorites: (author: string, avatarUrl: string) => void;
}

const PostHeader = ({post, onAddToFavorites}: PostHeaderProps): JSX.Element => {

    const handleAddToFavorites = () => {
        onAddToFavorites(post.author, post.avatar_url);
    };

    const authorTextSize = "font-bold";

    return (
        <div className="flex items-start mb-3">
            <Avatar
                username={post.author}
                avatarUrl={post.avatar_url}
                size="md"
                className="mr-3"
            />
            <div className="flex-1">
                <div className="flex items-center">
                    <h3 className={`${authorTextSize} text-gray-900 dark:text-white`}>{post.author}</h3>
                    <span className="text-sm text-gray-500 ml-2">
                        {new Date(post.date).toLocaleString()}
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
