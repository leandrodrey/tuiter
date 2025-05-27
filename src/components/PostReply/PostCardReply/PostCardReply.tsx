import {type JSX} from 'react';
import type {Post} from '../../../types/postTypes.ts';
import PostHeaderReply from './PostHeaderReply.tsx';
import PostContent from '../../PostContent/PostContent.tsx';
import PostActions from '../../PostActions/PostActions.tsx';

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
                hideCommentButton={true}
            />
        </div>
    );
};

export default PostCardReply;
