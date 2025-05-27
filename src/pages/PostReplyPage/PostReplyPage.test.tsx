import {render, screen} from '@testing-library/react';
import {describe, it, expect, vi} from 'vitest';
import {MemoryRouter} from 'react-router-dom';
import PostReplyPage from './PostReplyPage';
import {ObjectSchema} from 'yup';
import {PostFormData} from '../../types/formTypes';

// Mock context with different states
const mockHandleSubmit = vi.fn();
const mockHandleSaveDraft = vi.fn();
const mockHandleClearDraft = vi.fn();
const mockHandleLikePost = vi.fn();
const mockValidationSchema = {} as ObjectSchema<PostFormData>;

// Mock for usePostReplyContext with different states
const usePostReplyContextMock = vi.fn();

// Mock the hooks
vi.mock('./hooks/usePostReplyContext', () => ({
    usePostReplyContext: () => usePostReplyContextMock()
}));

// Mock the components
vi.mock('../../components/UI', () => ({
    Loader: ({text, fullScreen}) => (
        <div data-testid="loader" data-text={text} data-full-screen={fullScreen}>
            Loading...
        </div>
    ),
    PageHeader: ({title, subtitle}) => (
        <div data-testid="page-header" data-title={title} data-subtitle={subtitle}>
            Page Header
        </div>
    ),
    EmptyMessage: ({children}) => (
        <div data-testid="empty-message">{children}</div>
    ),
    Avatar: ({username, avatarUrl, size}) => (
        <div data-testid="avatar" data-username={username} data-avatar-url={avatarUrl} data-size={size}>
            Avatar
        </div>
    )
}));

vi.mock('../../components/PostForm/PostForm', () => ({
    __esModule: true,
    default: ({
        initialValues,
        validationSchema,
        onSubmit,
        onSaveDraft,
        onClearDraft,
        userAvatar
    }) => (
        <div
            data-testid="post-form"
            data-has-initial-values={!!initialValues}
            data-has-validation-schema={!!validationSchema}
            data-has-submit={!!onSubmit}
            data-has-save-draft={!!onSaveDraft}
            data-has-clear-draft={!!onClearDraft}
            data-user-avatar={userAvatar}
        >
            Post Form
        </div>
    )
}));

vi.mock('../../components/PostReply/PostListReplies.tsx', () => ({
    __esModule: true,
    default: ({replies, onLike}) => (
        <div
            data-testid="post-list-replies"
            data-replies-count={replies.length}
            data-has-on-like={!!onLike}
        >
            Post List Replies
        </div>
    )
}));

describe('PostReplyPage', () => {
    it('renders loading state correctly', () => {
        // Set up the mock to return loading state
        usePostReplyContextMock.mockReturnValue({
            replies: [],
            isLoading: true,
            error: null,
            handleSubmit: mockHandleSubmit,
            handleSaveDraft: mockHandleSaveDraft,
            handleClearDraft: mockHandleClearDraft,
            handleLikePost: mockHandleLikePost,
            userAvatar: 'https://example.com/user-avatar.jpg',
            validationSchema: mockValidationSchema,
            initialValues: {content: '', parent_id: 100}
        });

        render(
            <MemoryRouter>
                <PostReplyPage/>
            </MemoryRouter>
        );

        // Check if the loader is rendered
        const loader = screen.getByTestId('loader');
        expect(loader).toBeInTheDocument();
        expect(loader).toHaveAttribute('data-text', 'Loading post...');
        expect(loader).toHaveAttribute('data-full-screen', 'true');
    });

    it('renders error state correctly', () => {
        // Set up the mock to return error state
        usePostReplyContextMock.mockReturnValue({
            replies: [],
            isLoading: false,
            error: 'Failed to load post',
            handleSubmit: mockHandleSubmit,
            handleSaveDraft: mockHandleSaveDraft,
            handleClearDraft: mockHandleClearDraft,
            handleLikePost: mockHandleLikePost,
            userAvatar: 'https://example.com/user-avatar.jpg',
            validationSchema: mockValidationSchema,
            initialValues: {content: '', parent_id: 100}
        });

        render(
            <MemoryRouter>
                <PostReplyPage/>
            </MemoryRouter>
        );

        // Check if the error message is displayed
        const errorMessage = screen.getByText('Failed to load post');
        expect(errorMessage).toBeInTheDocument();
    });

    it('renders correctly with replies', () => {
        // Set up the mock to return replies
        usePostReplyContextMock.mockReturnValue({
            replies: [
                {
                    id: 1,
                    message: 'Test reply 1',
                    author: 'User1',
                    avatar_url: 'https://example.com/avatar1.jpg',
                    date: '2023-01-01T12:00:00Z',
                    liked: false,
                    likes: 5,
                    parent_id: 100
                },
                {
                    id: 2,
                    message: 'Test reply 2',
                    author: 'User2',
                    avatar_url: 'https://example.com/avatar2.jpg',
                    date: '2023-01-01T13:00:00Z',
                    liked: true,
                    likes: 3,
                    parent_id: 100
                }
            ],
            isLoading: false,
            error: null,
            handleSubmit: mockHandleSubmit,
            handleSaveDraft: mockHandleSaveDraft,
            handleClearDraft: mockHandleClearDraft,
            handleLikePost: mockHandleLikePost,
            userAvatar: 'https://example.com/user-avatar.jpg',
            validationSchema: mockValidationSchema,
            initialValues: {content: '', parent_id: 100}
        });

        render(
            <MemoryRouter>
                <PostReplyPage/>
            </MemoryRouter>
        );

        // Check if the page header is rendered with correct props
        const pageHeader = screen.getByTestId('page-header');
        expect(pageHeader).toBeInTheDocument();
        expect(pageHeader).toHaveAttribute('data-title', 'Thread');
        expect(pageHeader).toHaveAttribute('data-subtitle', 'Reply to the original post');

        // Check if the post form is rendered with correct props
        const postForm = screen.getByTestId('post-form');
        expect(postForm).toBeInTheDocument();
        expect(postForm).toHaveAttribute('data-has-initial-values', 'true');
        expect(postForm).toHaveAttribute('data-has-validation-schema', 'true');
        expect(postForm).toHaveAttribute('data-has-submit', 'true');
        expect(postForm).toHaveAttribute('data-has-save-draft', 'true');
        expect(postForm).toHaveAttribute('data-has-clear-draft', 'true');
        expect(postForm).toHaveAttribute('data-user-avatar', 'https://example.com/user-avatar.jpg');

        // Check if the replies heading is rendered
        const heading = screen.getByText('Other Replies');
        expect(heading).toBeInTheDocument();

        // Check if the post list replies component is rendered with correct props
        const postListReplies = screen.getByTestId('post-list-replies');
        expect(postListReplies).toBeInTheDocument();
        expect(postListReplies).toHaveAttribute('data-replies-count', '2');
        expect(postListReplies).toHaveAttribute('data-has-on-like', 'true');
    });

    it('renders empty message when there are no replies', () => {
        // Set up the mock to return empty replies
        usePostReplyContextMock.mockReturnValue({
            replies: [],
            isLoading: false,
            error: null,
            handleSubmit: mockHandleSubmit,
            handleSaveDraft: mockHandleSaveDraft,
            handleClearDraft: mockHandleClearDraft,
            handleLikePost: mockHandleLikePost,
            userAvatar: 'https://example.com/user-avatar.jpg',
            validationSchema: mockValidationSchema,
            initialValues: {content: '', parent_id: 100}
        });

        render(
            <MemoryRouter>
                <PostReplyPage/>
            </MemoryRouter>
        );

        // Check if the empty message is rendered
        const emptyMessage = screen.getByTestId('empty-message');
        expect(emptyMessage).toBeInTheDocument();
        expect(emptyMessage).toHaveTextContent('No replies yet. Be the first to reply!');
    });
});
