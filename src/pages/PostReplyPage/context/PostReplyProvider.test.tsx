import {render} from '@testing-library/react';
import {describe, it, expect, vi, beforeEach} from 'vitest';
import {PostReplyProvider} from './PostReplyProvider';
import {PostReplyContext} from './PostReplyContext';
import {usePostReplies} from '../hooks/usePostReplies';
import type {Post} from '../../../types/postTypes';
import {ObjectSchema} from 'yup';
import type {PostFormData} from '../../../types/formTypes';
import type {FormikHelpers} from 'formik';

// Mock usePostReplies hook
vi.mock('../hooks/usePostReplies', () => ({
    usePostReplies: vi.fn()
}));

describe('PostReplyProvider', () => {
    // Mock data that usePostReplies would return
    const mockReplies: Post[] = [
        {
            id: 1,
            author: 'user1',
            avatar_url: 'https://example.com/avatar1.jpg',
            message: 'Reply 1',
            date: '2023-01-01T00:00:00Z',
            likes: 5,
            liked: false,
            parent_id: 10,
            replies_count: 0
        }
    ];

    const mockHandleSubmit = vi.fn();
    const mockHandleSaveDraft = vi.fn();
    const mockHandleClearDraft = vi.fn();
    const mockHandleLikePost = vi.fn();
    const mockValidationSchema = {} as ObjectSchema<PostFormData>;
    const mockInitialValues = {message: ''};
    const mockUserAvatar = 'https://example.com/user-avatar.jpg';

    // Setup for all tests
    beforeEach(() => {
        vi.clearAllMocks();

        // Mock the return value of usePostReplies
        (usePostReplies as vi.Mock).mockReturnValue({
            replies: mockReplies,
            isLoading: false,
            error: null,
            handleSubmit: mockHandleSubmit,
            handleSaveDraft: mockHandleSaveDraft,
            handleClearDraft: mockHandleClearDraft,
            handleLikePost: mockHandleLikePost,
            validationSchema: mockValidationSchema,
            initialValues: mockInitialValues,
            userAvatar: mockUserAvatar
        });
    });

    it('should provide the correct context values', () => {
        // Create a test component that consumes the context
        const TestConsumer = () => {
            return (
                <PostReplyContext.Consumer>
                    {(context) => {
                        // Add data-testid attributes to verify the context values
                        return (
                            <div data-testid="context-consumer">
                                <span data-testid="replies-length">{context?.replies.length}</span>
                                <span data-testid="is-loading">{context?.isLoading.toString()}</span>
                                <span data-testid="error">{context?.error || 'no-error'}</span>
                                <span data-testid="user-avatar">{context?.userAvatar}</span>
                            </div>
                        );
                    }}
                </PostReplyContext.Consumer>
            );
        };

        // Render the provider with the test consumer
        const {getByTestId} = render(
            <PostReplyProvider>
                <TestConsumer/>
            </PostReplyProvider>
        );

        // Verify that the context values match what usePostReplies returned
        expect(getByTestId('replies-length').textContent).toBe('1');
        expect(getByTestId('is-loading').textContent).toBe('false');
        expect(getByTestId('error').textContent).toBe('no-error');
        expect(getByTestId('user-avatar').textContent).toBe(mockUserAvatar);
    });

    it('should pass all functions from usePostReplies to the context', () => {
        // Create a test component that consumes the context and calls the functions
        const TestFunctionConsumer = () => {
            return (
                <PostReplyContext.Consumer>
                    {(context) => {
                        // Call all the functions to verify they're passed correctly
                        if (context) {
                            context.handleSubmit({message: 'test'}, {setSubmitting: vi.fn()} as FormikHelpers<PostFormData>);
                            context.handleSaveDraft({message: 'draft'});
                            context.handleClearDraft(vi.fn());
                            context.handleLikePost(1);
                        }
                        return <div data-testid="function-consumer"/>;
                    }}
                </PostReplyContext.Consumer>
            );
        };

        // Render the provider with the test consumer
        render(
            <PostReplyProvider>
                <TestFunctionConsumer/>
            </PostReplyProvider>
        );

        // Verify that all the functions were called
        expect(mockHandleSubmit).toHaveBeenCalledWith({message: 'test'}, expect.any(Object));
        expect(mockHandleSaveDraft).toHaveBeenCalledWith({message: 'draft'});
        expect(mockHandleClearDraft).toHaveBeenCalledWith(expect.any(Function));
        expect(mockHandleLikePost).toHaveBeenCalledWith(1);
    });

    it('should render children correctly', () => {
        // Render the provider with a simple child component
        const {getByText} = render(
            <PostReplyProvider>
                <div>Test Child</div>
            </PostReplyProvider>
        );

        // Verify that the child component was rendered
        expect(getByText('Test Child')).toBeInTheDocument();
    });
});
