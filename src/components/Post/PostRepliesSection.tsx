import {type JSX} from 'react';
import type {Post} from '../../types/postTypes';
import PostReplies from './PostReplies';
import {Loader} from '../../components/UI';

/**
 * Props for the PostRepliesSection component
 * @interface PostRepliesSectionProps
 * @property {boolean} showReplies - Whether to show the replies section
 * @property {Post[]} replies - Array of reply posts
 * @property {boolean} loadingReplies - Whether replies are currently being loaded
 * @property {Function} onLike - Function to handle liking a reply
 */
interface PostRepliesSectionProps {
    showReplies: boolean;
    replies: Post[];
    loadingReplies: boolean;
    onLike: (postId: number) => Promise<void>;
}

/**
 * Component that displays the replies section of a post.
 * Shows a loading indicator when replies are being fetched,
 * the list of replies when available, or a message when there are no replies.
 *
 * @param {PostRepliesSectionProps} props - Component props
 * @returns {JSX.Element} The post replies section component
 */
const PostRepliesSection = ({
    showReplies,
    replies,
    loadingReplies,
    onLike
}: PostRepliesSectionProps): JSX.Element => {
    return (
        <>
            {loadingReplies && (
                <div className="pl-16 pr-4 pb-4 text-center">
                    <Loader text="Loading replies..." spinnerSize="sm" />
                </div>
            )}

            {showReplies && replies.length > 0 && (
                <div className="pl-16 pr-4 pb-4">
                    <PostReplies
                        replies={replies}
                        onLike={onLike}
                    />
                </div>
            )}
            {showReplies && !loadingReplies && replies.length === 0 && (
                <div className="pl-16 pr-4 pb-4 text-center text-gray-500">
                    <p>No replies yet. Be the first to reply!</p>
                </div>
            )}
        </>
    );
};

export default PostRepliesSection;
