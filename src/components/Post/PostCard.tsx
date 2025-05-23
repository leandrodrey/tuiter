import {type JSX} from 'react';
import type {Post} from '../../types/postTypes';
import PostHeader from './PostHeader';
import PostContent from './PostContent';
import PostActions from './PostActions';
import PostReplies from './PostReplies';
import {Loader} from '../../components/UI';
import {usePostReplies} from '../../hooks/post-replies/usePostReplies';

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
        <div className="border border-gray-200 dark:border-gray-800 rounded-lg p-4 mb-4 hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors duration-300 ease-in-out">
            <PostHeader
                post={post}
                onAddToFavorites={onAddToFavorites}
            />
            <PostContent message={post.message}/>
            <PostActions
                post={post}
                onLike={onLike}
                onToggleReplies={handleToggleReplies}
            />

            {/* Show loading indicator when fetching replies */}
            {loadingReplies && (
                <div className="mt-4 text-center">
                    <Loader text="Loading replies..." spinnerSize="sm" />
                </div>
            )}

            {/* Render replies if they should be shown */}
            {showReplies && replies.length > 0 && (
                <PostReplies
                    replies={replies}
                    onLike={onLike}
                />
            )}

            {/* Show message when no replies are available */}
            {showReplies && !loadingReplies && replies.length === 0 && (
                <div className="mt-4 text-center text-gray-500 dark:text-gray-400">
                    <p>No replies yet. Be the first to reply!</p>
                </div>
            )}
        </div>
    );
};

export default PostCard;
