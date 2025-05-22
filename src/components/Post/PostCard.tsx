import {type JSX} from 'react';
import type {Post} from '../../types/postTypes';
import PostHeader from './PostHeader';
import PostContent from './PostContent';
import PostActions from './PostActions';
import PostReplies from './PostReplies';

interface PostCardProps {
    post: Post;
    onLike: (postId: number) => Promise<void>;
    onAddToFavorites: (author: string, avatarUrl: string) => void;
    isReply?: boolean;
    replies?: Post[];
}

const PostCard = ({post, onLike, onAddToFavorites, isReply = false, replies = []}: PostCardProps): JSX.Element => {
    // Apply different styles for replies
    const cardClasses = isReply
        ? "border border-gray-200 dark:border-gray-800 rounded-lg p-3 hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors"
        : "border border-gray-200 dark:border-gray-800 rounded-lg p-4 mb-4 hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors";

    return (
        <div className={cardClasses}>
            <PostHeader
                post={post}
                onAddToFavorites={onAddToFavorites}
                isReply={isReply}
            />
            <PostContent message={post.message}/>
            <PostActions
                post={post}
                onLike={onLike}
            />

            {/* Render replies if this is a parent post and it has replies */}
            {!isReply && replies.length > 0 && (
                <PostReplies
                    replies={replies}
                    onLike={onLike}
                    onAddToFavorites={onAddToFavorites}
                />
            )}
        </div>
    );
};

export default PostCard;
