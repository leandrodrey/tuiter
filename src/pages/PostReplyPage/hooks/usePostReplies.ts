import {useState, useEffect, useCallback} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import {type FormikHelpers} from 'formik';
import {apiGetTuitReplies, apiAddReplyToTuit} from '../../../services/TuitsService';
import {
    replyValidationSchema as validationSchema,
    replyInitialValues as initialValues
} from '../../../validations/postSchemas';
import type {Post} from '../../../types/postTypes';
import type {PostFormData} from '../../../types/formTypes';
import {useToast} from "../../../hooks/context/useToast";
import {usePostInteractions} from "../../../hooks/post-feed/usePostInteractions";
import type {PostWithReplies} from "../../../hooks/post-feed/usePostProcessor";
import {useUser} from "../../../hooks/context/useUser";
import {loadDraft, saveDraft, clearDraft} from '../../../utils/draftUtils';

/**
 * Hook for managing post replies, including fetching, submission, and interactions
 * @returns State and functions for managing post replies
 */
export const usePostReplies = () => {
    const [replies, setReplies] = useState<Post[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();
    const toast = useToast();
    const {userInformation} = useUser();
    const {postId} = useParams<{ postId: string }>();

    // Fetch replies when the component mounts or postId changes
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

    // Handle form submission
    const handleSubmit = useCallback(async (values: PostFormData, {
        setSubmitting,
        resetForm
    }: FormikHelpers<PostFormData>) => {
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
    }, [postId, navigate, toast]);

    // Handle saving draft
    const handleSaveDraft = useCallback((values: PostFormData) => {
        saveDraft(values, userInformation);
        toast.success('Draft saved successfully!');
    }, [toast, userInformation]);

    // Handle clearing draft
    const handleClearDraft = useCallback((resetForm: (nextState?: { values: PostFormData }) => void) => {
        clearDraft(userInformation);
        resetForm({values: initialValues});
        toast.info('Draft cleared!');
    }, [toast, userInformation]);

    // Create a wrapper function for setReplies that converts PostWithReplies objects back to Post objects
    const setPostsWithRepliesWrapper = useCallback((updaterFn: React.SetStateAction<PostWithReplies[]>) => {
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
    }, []);

    // Get the like post handler from usePostInteractions
    const {handleLikePost} = usePostInteractions(
        replies.map(reply => ({post: reply, replies: [], key: reply.id.toString()})),
        setPostsWithRepliesWrapper
    );

    // Load saved draft when the component mounts
    useEffect(() => {
        const savedDraft = loadDraft(userInformation);
        if (savedDraft) {
            initialValues.message = savedDraft;
        }
    }, [userInformation]);

    return {
        replies,
        isLoading,
        error,
        handleSubmit,
        handleSaveDraft,
        handleClearDraft,
        handleLikePost,
        validationSchema,
        initialValues,
        userAvatar: userInformation?.avatar_url || ''
    };
};
