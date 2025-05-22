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
    replies?: Post[];
}

const PostCard = ({post, onLike, onAddToFavorites, replies = []}: PostCardProps): JSX.Element => {
    // Styles for parent posts
    const cardClasses = "border border-gray-200 dark:border-gray-800 rounded-lg p-4 mb-4 hover:bg-gray-50 dark:hover:bg-gray-900";

    return (
        <div className={cardClasses}>
            <PostHeader
                post={post}
                onAddToFavorites={onAddToFavorites}
            />
            <PostContent message={post.message}/>
            <PostActions
                post={post}
                onLike={onLike}
            />

            {/* Render replies if there are any */}
            {replies.length > 0 && (
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
