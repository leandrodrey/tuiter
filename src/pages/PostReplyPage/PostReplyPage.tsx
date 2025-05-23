import React, {useState, useEffect, type JSX} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import {type FormikHelpers} from 'formik';
import {apiGetTuitReplies, apiAddReplyToTuit} from '../../services/TuitsService.ts';
import {
    replyValidationSchema as validationSchema,
    replyInitialValues as initialValues
} from '../../validations/postSchemas';
import type {Post} from '../../types/postTypes';
import type {PostFormData} from '../../types/formTypes.ts';
import {useToast} from "../../hooks/context/useToast.ts";
import {usePostInteractions} from "../../hooks/feed/usePostInteractions.ts";
import type {PostWithReplies} from "../../hooks/feed/usePostProcessor.ts";
import {useUser} from "../../hooks/context/useUser";
import {Loader, PageHeader} from '../../components/UI';
import PostForm from '../../components/PostForm/PostForm';
import PostReplies from '../../components/Post/PostReplies';

const PostReplyPage = (): JSX.Element => {
    const [replies, setReplies] = useState<Post[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();
    const toast = useToast();
    const {userInformation} = useUser();

    const {postId} = useParams<{ postId: string }>();

    useEffect(() => {
        const fetchPostAndReplies = async () => {
            if (!postId) {
                setError('Post ID is missing');
                setIsLoading(false);
                return;
            }

            try {
                setIsLoading(true);
                const postId_num = parseInt(postId);
                // Fetch replies to the post
                const repliesData = await apiGetTuitReplies(postId_num);
                setReplies(repliesData);
            } catch (err) {
                console.error('Error fetching post or replies:', err);
                setError('Failed to load the post or replies. Please try again.');
            } finally {
                setIsLoading(false);
            }
        };

        fetchPostAndReplies();
    }, [postId]);

    const handleSubmit = async (values: PostFormData, {setSubmitting, resetForm}: FormikHelpers<PostFormData>) => {
        if (!postId) {
            setError('Cannot reply: original post ID is missing');
            setSubmitting(false);
            return;
        }
        try {
            setError(null);
            const newReply = await apiAddReplyToTuit(parseInt(postId), {message: values.message});
            setReplies(prevReplies => [newReply, ...prevReplies]);
            resetForm();
            toast.success('Reply posted successfully!');
            navigate('/feed');
        } catch (err: unknown) {
            console.error('Error posting reply:', err);
            const errorMessage = err instanceof Error
                ? err.message
                : (err as {
                response?: { data?: { message?: string } }
            })?.response?.data?.message || 'Failed to post reply. Please try again.';
            setError(errorMessage);
        } finally {
            setSubmitting(false);
        }
    };

    const handleSaveDraft = (values: PostFormData) => {
        localStorage.setItem('replyDraft', values.message);
        toast.success('Draft saved successfully!');
    };

    const handleClearDraft = (resetForm: (nextState?: { values: PostFormData }) => void) => {
        localStorage.removeItem('replyDraft');
        resetForm({values: initialValues});
        toast.info('Draft cleared!');
    };

    // Create a wrapper function for setReplies that converts PostWithReplies objects back to Post objects
    const setPostsWithRepliesWrapper = (updaterFn: React.SetStateAction<PostWithReplies[]>) => {
        if (typeof updaterFn === 'function') {
            setReplies(prevReplies => {
                const prevPostsWithReplies = prevReplies.map(reply => ({post: reply, replies: []}));

                const updatedPostsWithReplies = updaterFn(prevPostsWithReplies);

                return updatedPostsWithReplies.flatMap(pwr =>
                    pwr.replies.length > 0 ? pwr.replies : [pwr.post]
                );
            });
        } else {
            const posts = updaterFn.flatMap(pwr =>
                pwr.replies.length > 0 ? pwr.replies : [pwr.post]
            );
            setReplies(posts);
        }
    };

    const {handleLikePost} = usePostInteractions(
        replies.map(reply => ({post: reply, replies: [], key: reply.id.toString()})),
        setPostsWithRepliesWrapper
    );

    useEffect(() => {
        const savedDraft = localStorage.getItem('replyDraft');
        if (savedDraft) {
            initialValues.message = savedDraft;
        }
    }, []);

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
                        {error &&
                            <div className="p-3 mb-4 text-red-500 dark:text-red-400 bg-red-50 dark:bg-red-900/10 rounded">{error}</div>}

                        <PostForm
                            initialValues={initialValues}
                            validationSchema={validationSchema}
                            onSubmit={handleSubmit}
                            onSaveDraft={handleSaveDraft}
                            onClearDraft={handleClearDraft}
                            userAvatar={userInformation?.avatar_url}
                        />
                    </div>
                </div>
            </div>

            {replies.length > 0 && (
                <div>
                    <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Other Replies</h2>
                    <PostReplies
                        replies={replies}
                        onLike={handleLikePost}
                    />
                </div>
            )}
        </div>
    );
};

export default PostReplyPage;
