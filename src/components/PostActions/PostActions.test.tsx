import {render, screen} from '@testing-library/react';
import {describe, it, expect, vi} from 'vitest';
import {MemoryRouter} from 'react-router-dom';
import PostActions from './PostActions';
import type {Post} from '../../types/postTypes';

// Mock the usePostActions hook
vi.mock('../../hooks/post-replies/usePostActions.ts', () => ({
    usePostActions: vi.fn(post => ({
        handleLike: vi.fn(),
        isLiked: post.liked,
        likesCount: post.likes
    }))
}));

// Mock the button components
vi.mock('../Post/PostActionButtons', () => ({
    CommentButton: vi.fn(({postId}) => (
        <div
            data-testid="mock-comment-button"
            data-post-id={postId}
        />
    )),
    LikeButton: vi.fn(({onClick, isLiked, likesCount}) => (
        <div
            data-testid="mock-like-button"
            data-has-click-handler={!!onClick}
            data-is-liked={isLiked}
            data-likes-count={likesCount}
        />
    ))
}));

describe('PostActions', () => {
    // Create a mock post
    const mockPost: Post = {
        id: 1,
        author: 'testuser',
        avatar_url: 'https://example.com/avatar.jpg',
        message: 'Test message',
        date: '2023-01-01T00:00:00Z',
        likes: 5,
        liked: false,
        parent_id: 0,
        replies_count: 2
    };

    const mockOnLike = vi.fn();

    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('renders all action buttons by default', () => {
        render(
            <MemoryRouter>
                <PostActions
                    post={mockPost}
                    onLike={mockOnLike}
                />
            </MemoryRouter>
        );

        // Check if all buttons are rendered
        expect(screen.getByTestId('mock-comment-button')).toBeInTheDocument();
        expect(screen.getByTestId('mock-like-button')).toBeInTheDocument();
    });

    it('hides comment button when hideCommentButton is true', () => {
        render(
            <MemoryRouter>
                <PostActions
                    post={mockPost}
                    onLike={mockOnLike}
                    hideCommentButton={true}
                />
            </MemoryRouter>
        );

        // Check that comment button is not rendered
        expect(screen.queryByTestId('mock-comment-button')).not.toBeInTheDocument();
        // Check that like button is still rendered
        expect(screen.getByTestId('mock-like-button')).toBeInTheDocument();
    });

    it('passes correct props to CommentButton', () => {
        render(
            <MemoryRouter>
                <PostActions
                    post={mockPost}
                    onLike={mockOnLike}
                />
            </MemoryRouter>
        );

        const commentButton = screen.getByTestId('mock-comment-button');
        expect(commentButton).toHaveAttribute('data-post-id', '1');
    });


    it('passes correct props to LikeButton', () => {
        render(
            <MemoryRouter>
                <PostActions
                    post={mockPost}
                    onLike={mockOnLike}
                />
            </MemoryRouter>
        );

        const likeButton = screen.getByTestId('mock-like-button');
        expect(likeButton).toHaveAttribute('data-has-click-handler', 'true');
        expect(likeButton).toHaveAttribute('data-is-liked', 'false');
        expect(likeButton).toHaveAttribute('data-likes-count', '5');
    });


    it('applies correct styling to container', () => {
        render(
            <MemoryRouter>
                <PostActions
                    post={mockPost}
                    onLike={mockOnLike}
                />
            </MemoryRouter>
        );

        const container = screen.getByTestId('mock-comment-button').parentElement;
        expect(container).toHaveClass('w-full');
        expect(container).toHaveClass('flex');
        expect(container).toHaveClass('justify-between');
    });
});
