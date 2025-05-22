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
        return <div>Loading post...</div>;
    }

    if (error && !originalPost) {
        return <div className="error-message">{error}</div>;
    }

    return (
        <div className="reply-container">
            <h1>Reply to Post</h1>

            {originalPost && (
                <div className="original-post">
                    <div className="post-header">
                        <img
                            src={originalPost.avatar_url || 'https://via.placeholder.com/50'}
                            alt={`${originalPost.author}'s avatar`}
                            className="avatar"
                        />
                        <div className="author-info">
                            <h3>{originalPost.author}</h3>
                            <span>{new Date(originalPost.created_at).toLocaleString()}</span>
                        </div>
                    </div>

                    <div className="post-content">
                        <p>{originalPost.message}</p>
                    </div>
                </div>
            )}

            <div className="reply-form">
                <h2>Your Reply</h2>

                {error && <div className="error-message">{error}</div>}

                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    {({isSubmitting, values}) => (
                        <Form>
                            <div className="form-group">
                                <Field
                                    as="textarea"
                                    id="message"
                                    name="message"
                                    rows={4}
                                    placeholder="Write your reply here..."
                                    disabled={isSubmitting}
                                />
                                <ErrorMessage name="message" component="div" className="error-message"/>
                            </div>

                            <div className="button-group">
                                <button
                                    type="button"
                                    onClick={() => navigate(-1)}
                                    disabled={isSubmitting}
                                    className="cancel-button"
                                >
                                    Cancel
                                </button>

                                <button
                                    type="submit"
                                    disabled={isSubmitting || !values.message.trim()}
                                    className="submit-button"
                                >
                                    {isSubmitting ? 'Posting...' : 'Post Reply'}
                                </button>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
};

export default PostReplyPage;
