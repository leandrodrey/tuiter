import {type JSX} from 'react';
import type {Post} from '../../types/postTypes';
import PostHeaderReply from './PostHeaderReply';
import PostContent from './PostContent';
import PostActions from './PostActions';

interface PostCardReplyProps {
    post: Post;
    onLike: (postId: number) => Promise<void>;
}

const PostCardReply = ({post, onLike}: PostCardReplyProps): JSX.Element => {
    return (
        <div className="border border-gray-200 dark:border-gray-800 rounded-lg p-3 hover:bg-gray-50 dark:hover:bg-gray-900">
            <PostHeaderReply
                post={post}
            />
            <PostContent message={post.message}/>
            <PostActions
                post={post}
                onLike={onLike}
            />
        </div>
    );
};

export default PostCardReply;
