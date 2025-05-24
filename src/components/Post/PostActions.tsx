import {type JSX} from 'react';
import type {Post} from '../../types/postTypes.ts';
import {usePostActions} from '../../hooks/post-replies/usePostActions.ts';
import {
    CommentButton,
    RetweetButton,
    LikeButton
} from './PostActionButtons';

interface PostActionsProps {
    post: Post;
    onLike: (postId: number) => Promise<void>;
    onToggleReplies?: (postId: number) => void;
}

/**
 * Post actions component that displays action buttons for a post
 * Uses individual button components for each action
 *
 * @param {Object} props - Component props
 * @param {Post} props.post - The post to display actions for
 * @param {Function} props.onLike - Function to call when the like button is clicked
 * @param {Function} props.onToggleReplies - Optional function to call when the retweet button is clicked
 * @returns {JSX.Element} The post actions component
 */
const PostActions = ({post, onLike, onToggleReplies}: PostActionsProps): JSX.Element => {
    const {
        handleLike,
        handleToggleReplies,
        isLiked,
        likesCount,
        repliesCount
    } = usePostActions(post, onLike, onToggleReplies);

    return (
        <div className="w-full flex justify-between">
            <CommentButton
                postId={post.id}
                repliesCount={repliesCount}
                {...(post.parent_id !== 0 ? { parentId: post.parent_id } : {})}
            />

            <RetweetButton
                onClick={handleToggleReplies}
            />

            <LikeButton
                onClick={handleLike}
                isLiked={isLiked}
                likesCount={likesCount}
            />
        </div>
    );
};

export default PostActions;
