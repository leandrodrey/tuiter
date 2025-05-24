import {type JSX, useContext} from 'react';
import type {Post} from '../../../types/postTypes.ts';
import {usePostReplies} from '../../../hooks/post-replies/usePostReplies.ts';
import {PostContext} from '../../../pages/FeedPage/context/PostContext.ts';
import PostHeader from './PostHeader.tsx';
import PostContent from '../PostContent.tsx';
import PostActionsSection from './PostActionsSection.tsx';
import PostRepliesSection from '../PostRepliesSection.tsx';

interface PostCardProps {
    post: Post;
    replies?: Post[];
    // These props are required when used outside of PostProvider context
    onLike?: (postId: number) => Promise<void>;
    onAddToFavorites?: (author: string, avatarUrl: string) => void;
}

/**
 * Component that renders a post card with its content, actions, and replies.
 * Uses the PostContext for interaction handlers if available, otherwise uses props.
 * This allows the component to be used both within and outside of a PostProvider context.
 *
 * @param {PostCardProps} props - Component props
 * @returns {JSX.Element} The post card component
 */
const PostCard = ({post, replies: initialReplies = [], onLike, onAddToFavorites}: PostCardProps): JSX.Element => {
    // Try to get context, but don't throw if not available
    const context = useContext(PostContext);

    // Use props if provided, otherwise try to use context
    const handleLike = onLike || context?.handleLikePost;
    const handleAddToFavorites = onAddToFavorites || context?.handleAddToFavorites;

    // Validate that we have the required handlers
    if (!handleLike || !handleAddToFavorites) {
        console.warn(
            'PostCard is being used outside of a PostProvider context without required props. ' +
            'Please provide onLike and onAddToFavorites props or use within a PostProvider.'
        );
    }

    const {
        showReplies,
        replies,
        loadingReplies,
        handleToggleReplies
    } = usePostReplies(post.id, initialReplies);

    // Define safe handlers that won't crash if the original handlers are missing
    const safeLikeHandler = handleLike || (() => Promise.resolve());
    const safeAddToFavoritesHandler = handleAddToFavorites || (() => {});

    return (
        <article className="hover:bg-gray-800 transition duration-350 ease-in-out border-b border-gray-800">
            <PostHeader
                post={post}
                onAddToFavorites={safeAddToFavoritesHandler}
            />

            <PostContent message={post.message}/>

            <PostActionsSection
                post={post}
                onLike={safeLikeHandler}
                onToggleReplies={handleToggleReplies}
            />

            <PostRepliesSection
                showReplies={showReplies}
                replies={replies}
                loadingReplies={loadingReplies}
                onLike={safeLikeHandler}
            />
        </article>
    );
};

export default PostCard;
