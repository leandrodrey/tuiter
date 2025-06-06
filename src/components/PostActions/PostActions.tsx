import {type JSX} from 'react';
import type {Post} from '../../types/postTypes.ts';
import {usePostActions} from '../../hooks/post-replies/usePostActions.ts';
import {
    CommentButton,
    LikeButton
} from '../Post/PostActionButtons';

interface PostActionsProps {
    post: Post;
    onLike: (postId: number) => Promise<void>;
    hideCommentButton?: boolean;
}

/**
 * Post actions component that displays action buttons for a post
 * Uses individual button components for each action
 *
 * @param {Object} props - Component props
 * @param {Post} props.post - The post to display actions for
 * @param {Function} props.onLike - Function to call when the like button is clicked
 * @returns {JSX.Element} The post actions component
 */
const PostActions = ({post, onLike, hideCommentButton = false}: PostActionsProps): JSX.Element => {
    const {
        handleLike,
        isLiked,
        likesCount
    } = usePostActions(post, onLike);

    return (
        <div className="w-full flex justify-between">
            <LikeButton
                onClick={handleLike}
                isLiked={isLiked}
                likesCount={likesCount}
            />

            {!hideCommentButton && (
                <CommentButton
                    postId={post.id}
                />
            )}
        </div>
    );
};

export default PostActions;
