import {type JSX} from 'react';
import {Loader, PageHeader, EmptyMessage} from '../../components/UI';
import PostForm from '../../components/PostForm/PostForm';
import PostListReplies from '../../components/PostReply/PostListReplies.tsx';
import {usePostReplyContext} from './hooks/usePostReplyContext';

/**
 * PostReplyPage component that displays a form for replying to a post and a list of existing replies.
 * Uses the PostReplyContext to access reply data and functions.
 */
const PostReplyPage = (): JSX.Element => {
    const {
        replies,
        isLoading,
        error,
        handleSubmit,
        handleSaveDraft,
        handleClearDraft,
        handleLikePost,
        validationSchema,
        initialValues,
        userAvatar
    } = usePostReplyContext();

    if (isLoading) {
        return <Loader text="Loading post..." fullScreen={true}/>;
    }

    if (error) {
        return <div className="p-4 text-red-500 dark:text-red-400 text-center">{error}</div>;
    }

    return (
        <div className="max-w-2xl mx-auto px-4 py-6">
            <PageHeader title="Thread" subtitle="Reply to the original post"/>

            <div className="border-b border-gray-200 dark:border-gray-800 pb-6 mb-4">
                <div className="flex">
                    <div className="flex-1">
                        <PostForm
                            initialValues={initialValues}
                            validationSchema={validationSchema}
                            onSubmit={handleSubmit}
                            onSaveDraft={handleSaveDraft}
                            onClearDraft={handleClearDraft}
                            userAvatar={userAvatar}
                        />
                    </div>
                </div>
            </div>

            {replies.length > 0 ? (
                <div>
                    <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Other Replies</h2>
                    <PostListReplies
                        replies={replies}
                        onLike={handleLikePost}
                    />
                </div>
            ) : (
                <EmptyMessage>No replies yet. Be the first to reply!</EmptyMessage>
            )}
        </div>
    );
};

export default PostReplyPage;
