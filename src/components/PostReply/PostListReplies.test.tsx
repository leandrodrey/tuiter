import {render, screen} from '@testing-library/react';
import {describe, it, expect, vi} from 'vitest';
import PostListReplies from './PostListReplies';
import type {Post} from '../../types/postTypes';

// Mock the PostCardReply component
vi.mock('./PostCardReply/PostCardReply.tsx', () => ({
    default: vi.fn(({post, onLike}) => (
        <div
            data-testid="mock-post-card-reply"
            data-post-id={post.id}
            data-has-like-handler={!!onLike}
        />
    ))
}));

describe('PostReplies', () => {
    // Create mock replies
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
        },
        {
            id: 2,
            author: 'user2',
            avatar_url: 'https://example.com/avatar2.jpg',
            message: 'Reply 2',
            date: '2023-01-02T00:00:00Z',
            likes: 3,
            liked: true,
            parent_id: 10,
            replies_count: 0
        }
    ];

    const mockOnLike = vi.fn();

    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('renders all replies', () => {
        render(<PostListReplies replies={mockReplies} onLike={mockOnLike}/>);

        // Check if all replies are rendered
        const replyCards = screen.getAllByTestId('mock-post-card-reply');
        expect(replyCards).toHaveLength(2);

        // Check if the correct post IDs are rendered
        expect(replyCards[0]).toHaveAttribute('data-post-id', '1');
        expect(replyCards[1]).toHaveAttribute('data-post-id', '2');

        // Check if onLike is passed to all replies
        expect(replyCards[0]).toHaveAttribute('data-has-like-handler', 'true');
        expect(replyCards[1]).toHaveAttribute('data-has-like-handler', 'true');
    });

    it('renders no replies when the array is empty', () => {
        render(<PostListReplies replies={[]} onLike={mockOnLike}/>);

        // Check that no replies are rendered
        expect(screen.queryByTestId('mock-post-card-reply')).not.toBeInTheDocument();
    });

    it('applies the correct styling to the container', () => {
        render(<PostListReplies replies={mockReplies} onLike={mockOnLike}/>);

        // Get the container element (parent of the first reply)
        const container = screen.getAllByTestId('mock-post-card-reply')[0].parentElement;

        // Check if the container has the correct classes
        expect(container).toHaveClass('ml-8');
        expect(container).toHaveClass('mt-2');
        expect(container).toHaveClass('space-y-3');
        expect(container).toHaveClass('border-l-2');
        expect(container).toHaveClass('border-gray-200');
        expect(container).toHaveClass('dark:border-gray-700');
        expect(container).toHaveClass('pl-4');
    });
});
