import React, {useState, useEffect, type JSX} from 'react';
import {useParams} from 'react-router-dom';
import {type FormikHelpers} from 'formik';
import {apiGetTuit, apiGetTuitReplies, apiAddReplyToTuit} from '../../services/TuitsService.ts';
import {
    replyValidationSchema as validationSchema,
    replyInitialValues as initialValues
} from '../../validations/postSchemas';
import type {Post} from '../../types/postTypes';
import type {PostFormData} from '../../types/formTypes.ts';
import {useToast} from "../../hooks/context/useToast.ts";
import {usePostInteractions} from "../../hooks/feed/usePostInteractions.ts";
import type {PostWithReplies} from "../../hooks/feed/usePostProcessor.ts";
import Loader from '../../components/UI/Loader';
import PostForm from '../../components/PostForm/PostForm';
import PostReplies from '../../components/Post/PostReplies';

const PostReplyPage = (): JSX.Element => {
    const [originalPost, setOriginalPost] = useState<Post | null>(null);
    const [replies, setReplies] = useState<Post[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const toast = useToast();

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

                // Fetch the original post
                /*const post = await apiGetTuit(postId_num);
                setOriginalPost(post);*/

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

            // Add reply to the post
            const newReply = await apiAddReplyToTuit(parseInt(postId), {message: values.message});

            // Update the replies list with the new reply
            setReplies(prevReplies => [newReply, ...prevReplies]);

            // Reset the form
            resetForm();

            toast.success('Reply posted successfully!');
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

    // Draft functionality for PostForm
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
                // Convert replies to PostWithReplies format
                const prevPostsWithReplies = prevReplies.map(reply => ({ post: reply, replies: [] }));

                // Apply the updater function
                const updatedPostsWithReplies = updaterFn(prevPostsWithReplies);

                // Convert back to Post[] format
                return updatedPostsWithReplies.flatMap(pwr =>
                    // Include the post itself if it's not a parent of any of our replies
                    // (in this case, we only want the replies)
                    pwr.replies.length > 0 ? pwr.replies : [pwr.post]
                );
            });
        } else {
            // If it's a direct value, extract the posts
            const posts = updaterFn.flatMap(pwr =>
                pwr.replies.length > 0 ? pwr.replies : [pwr.post]
            );
            setReplies(posts);
        }
    };

    const { handleLikePost } = usePostInteractions(
        // Convert replies to the format expected by usePostInteractions
        replies.map(reply => ({ post: reply, replies: [] })),
        setPostsWithRepliesWrapper
    );

    // Load draft from localStorage on component mount
    useEffect(() => {
        const savedDraft = localStorage.getItem('replyDraft');
        if (savedDraft) {
            initialValues.message = savedDraft;
        }
    }, []);

    if (isLoading) {
        return <Loader text="Loading post..." fullScreen={true} />;
    }

    if (error && !originalPost) {
        return <div className="p-4 text-red-500 dark:text-red-400 text-center">{error}</div>;
    }

    return (
        <div className="max-w-2xl mx-auto px-4 py-6">
            {/* Thread header */}
            <div className="mb-4">
                <h1 className="text-xl font-bold text-gray-900 dark:text-white">Thread</h1>
            </div>

            {/* Original post */}
            {originalPost && (
                <div className="border-b border-gray-200 dark:border-gray-800 pb-4 mb-4">
                    <div className="flex items-start mb-3">
                        <img
                            src={originalPost.avatar_url}
                            alt={`${originalPost.author}'s avatar`}
                            className="w-12 h-12 rounded-full mr-3"
                        />
                        <div className="flex-1">
                            <div className="flex items-center">
                                <h3 className="font-bold text-gray-900 dark:text-white">{originalPost.author}</h3>
                                <span className="text-gray-500 ml-2">@{originalPost.author.toLowerCase().replace(/\s/g, '')}</span>
                                <span className="mx-1 text-gray-500">·</span>
                                <span className="text-sm text-gray-500">{new Date(originalPost.date).toLocaleDateString()}</span>
                            </div>
                            <p className="text-gray-800 dark:text-gray-200 whitespace-pre-wrap break-words my-2">{originalPost.message}</p>
                            <div className="text-sm text-gray-500 mt-2">
                                {new Date(originalPost.date).toLocaleTimeString()} · {new Date(originalPost.date).toLocaleDateString()}
                            </div>
                            <div className="flex items-center mt-3 text-gray-500">
                                <div className="flex items-center mr-6">
                                    <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
                                    </svg>
                                    <span>{replies.length}</span>
                                </div>
                                <div className="flex items-center mr-6">
                                    <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
                                    </svg>
                                    <span>0</span>
                                </div>
                                <div className="flex items-center mr-6">
                                    <svg className={`w-5 h-5 mr-1 ${originalPost.liked ? 'text-red-500 fill-current' : ''}`}
                                         fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
                                    </svg>
                                    <span>{originalPost.likes}</span>
                                </div>
                                <div className="flex items-center">
                                    <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"></path>
                                    </svg>
                                    <span>Share</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Reply form */}
            <div className="border-b border-gray-200 dark:border-gray-800 pb-6 mb-4">
                <div className="flex">
                    <img
                        src="https://via.placeholder.com/40"
                        alt="Your avatar"
                        className="w-12 h-12 rounded-full mr-3"
                    />
                    <div className="flex-1">
                        {error && <div className="p-3 mb-4 text-red-500 dark:text-red-400 bg-red-50 dark:bg-red-900/10 rounded">{error}</div>}

                        <PostForm
                            initialValues={initialValues}
                            validationSchema={validationSchema}
                            onSubmit={handleSubmit}
                            onSaveDraft={handleSaveDraft}
                            onClearDraft={handleClearDraft}
                        />
                    </div>
                </div>
            </div>

            {/* Replies */}
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
