import {type JSX} from 'react';
import type {Post} from '../../types/postTypes';
import {usePostActions} from '../../hooks/post-replies/usePostActions';

interface PostActionsProps {
    post: Post;
    onLike: (postId: number) => Promise<void>;
    onToggleReplies?: (postId: number) => void;
}

const PostActions = ({post, onLike, onToggleReplies}: PostActionsProps): JSX.Element => {
    const {
        handleLike,
        handleToggleReplies,
        hasReplies,
        hasNoReplies,
        isLiked,
        likesCount,
        repliesCount
    } = usePostActions(post, onLike, onToggleReplies);

    return (
        <div className="flex items-center space-x-4 text-gray-500 dark:text-gray-400">
            <button
                onClick={handleLike}
                className={`flex items-center hover:text-blue-500 transition-colors ${
                    isLiked
                        ? 'text-blue-500 dark:text-blue-400'
                        : 'hover:text-blue-500 dark:hover:text-blue-400'
                }`}
            >
                <svg className="w-5 h-5 mr-1" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                </svg>
                <span>{isLiked ? 'Liked' : 'Like'} ({likesCount})</span>
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
            {hasReplies && (
                <button
                    onClick={handleToggleReplies}
                    className="flex items-center hover:text-blue-500 dark:hover:text-blue-400 transition-colors"
                >
                    <svg className="w-5 h-5 mr-1" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M7 10l5 5 5-5H7z"/>
                    </svg>
                    <span>Show Replies ({repliesCount})</span>
                </button>
            )}
            {hasNoReplies && (
                <button
                    onClick={handleToggleReplies}
                    className="flex items-center hover:text-blue-500 dark:hover:text-blue-400 transition-colors"
                >
                    <svg className="w-5 h-5 mr-1" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M7 10l5 5 5-5H7z"/>
                    </svg>
                    <span>No Replies</span>
                </button>
            )}
            <button
                onClick={handleToggleReplies}
                className="flex items-center hover:text-blue-500 dark:hover:text-blue-400 transition-colors"
            >
                <svg className="w-5 h-5 mr-1" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 4V1L8 5l4 4V6c3.31 0 6 2.69 6 6 0 1.01-.25 1.97-.7 2.8l1.46 1.46C19.54 15.03 20 13.57 20 12c0-4.42-3.58-8-8-8zm0 14c-3.31 0-6-2.69-6-6 0-1.01.25-1.97.7-2.8L5.24 7.74C4.46 8.97 4 10.43 4 12c0 4.42 3.58 8 8 8v3l4-4-4-4v3z"/>
                </svg>
                <span>Load Replies</span>
            </button>
        </div>
    );
};

export default PostActions;
