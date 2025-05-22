import {type JSX} from 'react';
import type {Post} from '../../types/postTypes';
import PostCard from './PostCard';

interface PostRepliesProps {
    replies: Post[];
    onLike: (postId: number) => Promise<void>;
    onAddToFavorites: (author: string, avatarUrl: string) => void;
}

const PostReplies = ({replies, onLike, onAddToFavorites}: PostRepliesProps): JSX.Element => {
    if (replies.length === 0) {
        return null;
    }

    return (
        <div className="ml-8 mt-2 space-y-3 border-l-2 border-gray-200 dark:border-gray-700 pl-4">
            {replies.map(reply => (
                <PostCard
                    key={reply.id}
                    post={reply}
                    onLike={onLike}
                    onAddToFavorites={onAddToFavorites}
                    isReply={true}
                />
            ))}
        </div>
    );
};

export default PostReplies;
