import {type JSX} from 'react';
import type {Post} from '../../types/postTypes';
import PostCardReply from './PostCardReply';

interface PostRepliesProps {
    replies: Post[];
    onLike: (postId: number) => Promise<void>;
}

const PostReplies = ({replies, onLike}: PostRepliesProps): JSX.Element => {

    return (
        <div className="ml-8 mt-2 space-y-3 border-l-2 border-gray-200 dark:border-gray-700 pl-4">
            {replies.map(reply => (
                <PostCardReply
                    key={reply.id.toString()}
                    post={reply}
                    onLike={onLike}
                />
            ))}
        </div>
    );
};

export default PostReplies;
