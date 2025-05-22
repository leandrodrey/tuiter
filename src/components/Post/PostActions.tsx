import {type JSX} from 'react';
import type {Post} from '../../types/postTypes';

interface PostActionsProps {
    post: Post;
    onLike: (postId: string) => Promise<void>;
}

const PostActions = ({post, onLike}: PostActionsProps): JSX.Element => {
    const handleLike = async () => {
        await onLike(post.id);
    };

    return (
        <div className="post-actions">
            <button
                onClick={handleLike}
                disabled={post.is_liked}
                className={`like-button ${post.is_liked ? 'liked' : ''}`}
            >
                {post.is_liked ? 'Liked' : 'Like'} ({post.likes_count})
            </button>
            <a href={`/posts/${post.id}/reply`} className="reply-link">
                Reply
            </a>
        </div>
    );
};

export default PostActions;
