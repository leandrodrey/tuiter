import {type JSX} from 'react';
import type {Post} from '../../types/postTypes';

interface PostActionsProps {
    post: Post;
    onLike: (postId: number) => Promise<void>;
}

const PostActions = ({post, onLike}: PostActionsProps): JSX.Element => {
    const handleLike = async () => {
        await onLike(post.id);
    };

    return (
        <div className="flex items-center space-x-4 text-gray-500 dark:text-gray-400">
            <button
                onClick={handleLike}
                className={`flex items-center hover:text-blue-500 transition-colors ${
                    post.liked
                        ? 'text-blue-500 dark:text-blue-400'
                        : 'hover:text-blue-500 dark:hover:text-blue-400'
                }`}
            >
                <svg className="w-5 h-5 mr-1" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                </svg>
                <span>{post.liked ? 'Liked' : 'Like'} ({post.likes || 0})</span>
            </button>
            <a
                href={`/posts/${post.id}/reply`}
                className="flex items-center hover:text-blue-500 dark:hover:text-blue-400 transition-colors"
            >
                <svg className="w-5 h-5 mr-1" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20 2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h14l4 4V4c0-1.1-.9-2-2-2zm-2 12H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z"/>
                </svg>
                <span>Reply</span>
            </a>
        </div>
    );
};

export default PostActions;
