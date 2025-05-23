import {type JSX} from 'react';
import type {Post} from '../../types/postTypes';
import {usePostReplies} from '../../hooks/post-replies/usePostReplies';
import PostHeader from './PostHeader';
import PostContent from './PostContent';
import PostActionsSection from './PostActionsSection';
import PostRepliesSection from './PostRepliesSection';

interface PostCardProps {
    post: Post;
    onLike: (postId: number) => Promise<void>;
    onAddToFavorites: (author: string, avatarUrl: string) => void;
    replies?: Post[];
}

const PostCard = ({post, onLike, onAddToFavorites, replies: initialReplies = []}: PostCardProps): JSX.Element => {
    const {
        showReplies,
        replies,
        loadingReplies,
        handleToggleReplies
    } = usePostReplies(post.id, initialReplies);

    return (
        <article className="hover:bg-gray-800 transition duration-350 ease-in-out border-b border-gray-800">
            <PostHeader
                post={post}
                onAddToFavorites={onAddToFavorites}
            />

            <PostContent message={post.message} />

            <PostActionsSection
                post={post}
                onLike={onLike}
                onToggleReplies={handleToggleReplies}
            />

            <PostRepliesSection
                showReplies={showReplies}
                replies={replies}
                loadingReplies={loadingReplies}
                onLike={onLike}
            />
        </article>
    );
};

export default PostCard;
