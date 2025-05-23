import {type JSX} from 'react';
import type {Post} from '../../types/postTypes';
import PostReplies from './PostReplies';
import {Loader} from '../../components/UI';

interface PostRepliesSectionProps {
    showReplies: boolean;
    replies: Post[];
    loadingReplies: boolean;
    onLike: (postId: number) => Promise<void>;
}

const PostRepliesSection = ({
    showReplies,
    replies,
    loadingReplies,
    onLike
}: PostRepliesSectionProps): JSX.Element => {
    return (
        <>
            {/* Show loading indicator when fetching replies */}
            {loadingReplies && (
                <div className="pl-16 pr-4 pb-4 text-center">
                    <Loader text="Loading replies..." spinnerSize="sm" />
                </div>
            )}

            {/* Render replies if they should be shown */}
            {showReplies && replies.length > 0 && (
                <div className="pl-16 pr-4 pb-4">
                    <PostReplies
                        replies={replies}
                        onLike={onLike}
                    />
                </div>
            )}

            {/* Show message when no replies are available */}
            {showReplies && !loadingReplies && replies.length === 0 && (
                <div className="pl-16 pr-4 pb-4 text-center text-gray-500">
                    <p>No replies yet. Be the first to reply!</p>
                </div>
            )}
        </>
    );
};

export default PostRepliesSection;
