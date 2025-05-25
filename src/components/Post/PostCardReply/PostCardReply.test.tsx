import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import PostCardReply from './PostCardReply';
import type { Post } from '../../../types/postTypes';

// Mock the PostHeaderReply component
vi.mock('./PostHeaderReply.tsx', () => ({
  default: vi.fn(({ post }) => (
    <div
      data-testid="mock-post-header-reply"
      data-post-id={post.id}
      data-post-author={post.author}
    />
  ))
}));

// Mock the PostContent component
vi.mock('../PostContent.tsx', () => ({
  default: vi.fn(({ message }) => (
    <div
      data-testid="mock-post-content"
      data-message={message}
    />
  ))
}));

// Mock the PostActions component
vi.mock('../PostActions.tsx', () => ({
  default: vi.fn(({ post, onLike }) => (
    <div
      data-testid="mock-post-actions"
      data-post-id={post.id}
      data-has-like-handler={!!onLike}
    />
  ))
}));

describe('PostCardReply', () => {
  // Create a mock post
  const mockPost: Post = {
    id: 1,
    author: 'Test User',
    avatar_url: 'https://example.com/avatar.jpg',
    message: 'Test message',
    date: '2023-01-01T00:00:00Z',
    likes: 5,
    liked: false,
    parent_id: 10,
    replies_count: 0
  };

  const mockOnLike = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders all child components', () => {
    render(<PostCardReply post={mockPost} onLike={mockOnLike} />);

    // Check if all child components are rendered
    expect(screen.getByTestId('mock-post-header-reply')).toBeInTheDocument();
    expect(screen.getByTestId('mock-post-content')).toBeInTheDocument();
    expect(screen.getByTestId('mock-post-actions')).toBeInTheDocument();
  });

  it('passes correct props to PostHeaderReply', () => {
    render(<PostCardReply post={mockPost} onLike={mockOnLike} />);

    const postHeader = screen.getByTestId('mock-post-header-reply');
    expect(postHeader).toHaveAttribute('data-post-id', '1');
    expect(postHeader).toHaveAttribute('data-post-author', 'Test User');
  });

  it('passes correct props to PostContent', () => {
    render(<PostCardReply post={mockPost} onLike={mockOnLike} />);

    const postContent = screen.getByTestId('mock-post-content');
    expect(postContent).toHaveAttribute('data-message', 'Test message');
  });

  it('passes correct props to PostActions', () => {
    render(<PostCardReply post={mockPost} onLike={mockOnLike} />);

    const postActions = screen.getByTestId('mock-post-actions');
    expect(postActions).toHaveAttribute('data-post-id', '1');
    expect(postActions).toHaveAttribute('data-has-like-handler', 'true');
  });

  it('applies correct styling to the container', () => {
    render(<PostCardReply post={mockPost} onLike={mockOnLike} />);

    // Get the container element (parent of all child components)
    const container = screen.getByTestId('mock-post-header-reply').parentElement;
    expect(container).toHaveClass('border');
    expect(container).toHaveClass('border-gray-200');
    expect(container).toHaveClass('dark:border-gray-800');
    expect(container).toHaveClass('rounded-lg');
    expect(container).toHaveClass('p-3');
    expect(container).toHaveClass('hover:bg-gray-50');
    expect(container).toHaveClass('dark:hover:bg-gray-900');
  });
});
