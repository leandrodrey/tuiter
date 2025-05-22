import {useState, useEffect, type JSX} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import {Formik, Form, Field, ErrorMessage, type FormikHelpers} from 'formik';
import {apiGetTuit, apiAddReplyToTuit} from '../../services/TuitsService.ts';
import {replyValidationSchema as validationSchema, replyInitialValues as initialValues} from '../../validations/postSchemas';
import type {Post} from '../../types/postTypes';
import type { ReplyFormData } from '../../types/formTypes.ts';

const PostReplyPage = (): JSX.Element => {
    const [originalPost, setOriginalPost] = useState<Post | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const navigate = useNavigate();
    const {postId} = useParams<{ postId: string }>();

    useEffect(() => {
        const fetchPost = async () => {
            if (!postId) {
                setError('Post ID is missing');
                setIsLoading(false);
                return;
            }

            try {
                setIsLoading(true);
                const tuit = await apiGetTuit(postId);

                // Transform the response to match our Post interface with additional properties
                const transformedPost: Post = {
                    ...tuit,
                    author: `User ${tuit.user_id}`, // In a real app, you'd fetch user details
                    avatar_url: 'https://via.placeholder.com/50'
                };

                setOriginalPost(transformedPost);
            } catch (err) {
                console.error('Error fetching post:', err);
                setError('Failed to load the original post. Please try again.');
            } finally {
                setIsLoading(false);
            }
        };

        fetchPost();
    }, [postId]);

    const handleSubmit = async (values: ReplyFormData, {setSubmitting}: FormikHelpers<ReplyFormData>) => {
        if (!postId) {
            setError('Cannot reply: original post ID is missing');
            setSubmitting(false);
            return;
        }

        try {
            setError(null);

            await apiAddReplyToTuit(postId, {message: values.message});

            alert('Reply posted successfully!');
            navigate(`/posts/${postId}`); // Navigate to the original post with replies
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

    if (isLoading) {
        return <div className="flex justify-center items-center min-h-screen text-gray-500 dark:text-gray-400">Loading post...</div>;
    }

    if (error && !originalPost) {
        return <div className="p-4 text-red-500 dark:text-red-400 text-center">{error}</div>;
    }

    return (
        <div>
            <h1 className="text-3xl font-bold text-center mb-8 text-gray-900 dark:text-white">Reply to Post</h1>

            <div className="max-w-2xl mx-auto">
                {originalPost && (
                    <div className="border border-gray-200 dark:border-gray-800 rounded-lg p-4 mb-6 bg-gray-50 dark:bg-gray-900">
                        <div className="flex items-start mb-3">
                            <img
                                src={originalPost.avatar_url || 'https://via.placeholder.com/50'}
                                alt={`${originalPost.author}'s avatar`}
                                className="w-10 h-10 rounded-full mr-3"
                            />
                            <div>
                                <h3 className="font-medium text-gray-900 dark:text-white">{originalPost.author}</h3>
                                <span className="text-sm text-gray-500">{new Date(originalPost.created_at).toLocaleString()}</span>
                            </div>
                        </div>

                        <div className="mb-3">
                            <p className="text-gray-800 dark:text-gray-200 whitespace-pre-wrap break-words">{originalPost.message}</p>
                        </div>
                    </div>
                )}

                <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                    <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Your Reply</h2>

                    {error && <div className="p-3 mb-4 text-red-500 dark:text-red-400 bg-red-50 dark:bg-red-900/10 rounded">{error}</div>}

                    <Formik
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={handleSubmit}
                    >
                        {({isSubmitting, values}) => (
                            <Form>
                                <div className="mb-4">
                                    <Field
                                        as="textarea"
                                        id="message"
                                        name="message"
                                        rows={4}
                                        placeholder="Write your reply here..."
                                        disabled={isSubmitting}
                                        className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                                    />
                                    <ErrorMessage name="message" component="div" className="mt-1 text-red-500 dark:text-red-400"/>
                                </div>

                                <div className="flex justify-end space-x-3">
                                    <button
                                        type="button"
                                        onClick={() => navigate(-1)}
                                        disabled={isSubmitting}
                                        className="px-4 py-2 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 rounded-md transition-colors"
                                    >
                                        Cancel
                                    </button>

                                    <button
                                        type="submit"
                                        disabled={isSubmitting || !values.message.trim()}
                                        className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        {isSubmitting ? 'Posting...' : 'Post Reply'}
                                    </button>
                                </div>
                            </Form>
                        )}
                    </Formik>
                </div>
            </div>
        </div>
    );
};

export default PostReplyPage;
