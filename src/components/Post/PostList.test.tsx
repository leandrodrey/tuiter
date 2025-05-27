import {render, screen} from '@testing-library/react';
import {describe, it, expect, vi} from 'vitest';
import PostList from './PostList';
import type {Post} from '../../types/postTypes';

// Mock the usePostContext hook
vi.mock('../../pages/FeedPage/hooks/usePostContext.ts', () => ({
    usePostContext: vi.fn()
}));

// Mock the EmptyMessage component
vi.mock('../../components/UI', () => ({
    EmptyMessage: vi.fn(() => <div data-testid="mock-empty-message"/>)
}));

// Mock the PostCard component
vi.mock('./PostCard/PostCard.tsx', () => ({
    default: vi.fn(({post}) => (
        <div
            data-testid="mock-post-card"
            data-post-id={post.id}
        />
    ))
}));

// Import the mocked usePostContext to set its implementation
import {usePostContext} from '../../pages/FeedPage/hooks/usePostContext';

describe('PostList', () => {
    // Reset mocks before each test
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('renders EmptyMessage when there are no posts', () => {
        // Mock the usePostContext to return empty posts array
        (usePostContext as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
            posts: [],
            loading: false,
            error: null,
            hasMore: false,
            initialLoading: false,
            fetchMorePosts: vi.fn(),
            refreshFeed: vi.fn(),
            handleLikePost: vi.fn(),
            handleAddToFavorites: vi.fn()
        });

        render(<PostList/>);

        // Check if EmptyMessage is rendered
        expect(screen.getByTestId('mock-empty-message')).toBeInTheDocument();

        // Check that no PostCard is rendered
        expect(screen.queryByTestId('mock-post-card')).not.toBeInTheDocument();
    });

    it('renders PostCards when there are posts', () => {
        // Create mock posts
        const mockPosts: Post[] = [
            {
                id: 1,
                author: 'user1',
                avatar_url: 'https://example.com/avatar1.jpg',
                message: 'Test post 1',
                date: '2023-01-01T00:00:00Z',
                likes: 5,
                liked: false,
                parent_id: 0,
                replies_count: 2
            },
            {
                id: 2,
                author: 'user2',
                avatar_url: 'https://example.com/avatar2.jpg',
                message: 'Test post 2',
                date: '2023-01-03T00:00:00Z',
                likes: 10,
                liked: true,
                parent_id: 0,
                replies_count: 0
            }
        ];

        // Mock the usePostContext to return posts
        (usePostContext as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
            posts: mockPosts,
            loading: false,
            error: null,
            hasMore: true,
            initialLoading: false,
            fetchMorePosts: vi.fn(),
            refreshFeed: vi.fn(),
            handleLikePost: vi.fn(),
            handleAddToFavorites: vi.fn()
        });

        render(<PostList/>);

        // Check that EmptyMessage is not rendered
        expect(screen.queryByTestId('mock-empty-message')).not.toBeInTheDocument();

        // Check that PostCards are rendered
        const postCards = screen.getAllByTestId('mock-post-card');
        expect(postCards).toHaveLength(2);

        // Check that the correct post IDs are rendered
        expect(postCards[0]).toHaveAttribute('data-post-id', '1');
        expect(postCards[1]).toHaveAttribute('data-post-id', '2');
    });

    it('applies the correct styling to the container', () => {
        // Mock the usePostContext to return posts
        (usePostContext as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
            posts: [
                {
                    id: 1,
                    author: 'user1',
                    avatar_url: 'https://example.com/avatar1.jpg',
                    message: 'Test post',
                    date: '2023-01-01T00:00:00Z',
                    likes: 5,
                    liked: false,
                    parent_id: 0,
                    replies_count: 0
                }
            ],
            loading: false,
            error: null,
            hasMore: false,
            initialLoading: false,
            fetchMorePosts: vi.fn(),
            refreshFeed: vi.fn(),
            handleLikePost: vi.fn(),
            handleAddToFavorites: vi.fn()
        });

        render(<PostList/>);

        // Check that the container has the correct classes
        const container = screen.getByTestId('mock-post-card').parentElement?.parentElement;
        expect(container).toHaveClass('space-y-4');
        expect(container).toHaveClass('w-full');
        expect(container).toHaveClass('max-w-2xl');
        expect(container).toHaveClass('mx-auto');
    });
});
