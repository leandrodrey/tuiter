import {type JSX} from 'react';
import type {Post} from '../../types/postTypes';
import PostActions from './PostActions';

interface PostActionsSectionProps {
    post: Post;
    onLike: (postId: number) => Promise<void>;
    onToggleReplies: (postId: number) => void;
}

const PostActionsSection = ({
    post,
    onLike,
    onToggleReplies
}: PostActionsSectionProps): JSX.Element => {
    return (
        <div className="flex items-center py-2 sm:py-4 pl-2 sm:pl-4">
            <PostActions
                post={post}
                onLike={onLike}
                onToggleReplies={onToggleReplies}
            />
        </div>
    );
};

export default PostActionsSection;
