import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import PostRepliesSection from './PostRepliesSection';
import type { Post } from '../../types/postTypes';

// Mock the PostReplies component
vi.mock('./PostReplies', () => ({
  default: vi.fn(({ replies, onLike }) => (
    <div
      data-testid="mock-post-replies"
      data-replies-count={replies.length}
      data-has-like-handler={!!onLike}
    />
  ))
}));

// Mock the Loader component
vi.mock('../../components/UI', () => ({
  Loader: vi.fn(({ text, spinnerSize }) => (
    <div
      data-testid="mock-loader"
      data-text={text}
      data-spinner-size={spinnerSize}
    />
  ))
}));

describe('PostRepliesSection', () => {
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

  it('renders loading indicator when loadingReplies is true', () => {
    render(
      <PostRepliesSection
        showReplies={false}
        replies={[]}
        loadingReplies={true}
        onLike={mockOnLike}
      />
    );

    // Check if loader is rendered
    const loader = screen.getByTestId('mock-loader');
    expect(loader).toBeInTheDocument();
    expect(loader).toHaveAttribute('data-text', 'Loading replies...');
    expect(loader).toHaveAttribute('data-spinner-size', 'sm');

    // Check that other elements are not rendered
    expect(screen.queryByTestId('mock-post-replies')).not.toBeInTheDocument();
    expect(screen.queryByText('No replies yet. Be the first to reply!')).not.toBeInTheDocument();
  });

  it('renders PostReplies when showReplies is true and there are replies', () => {
    render(
      <PostRepliesSection
        showReplies={true}
        replies={mockReplies}
        loadingReplies={false}
        onLike={mockOnLike}
      />
    );

    // Check if PostReplies is rendered
    const postReplies = screen.getByTestId('mock-post-replies');
    expect(postReplies).toBeInTheDocument();
    expect(postReplies).toHaveAttribute('data-replies-count', '2');
    expect(postReplies).toHaveAttribute('data-has-like-handler', 'true');

    // Check that other elements are not rendered
    expect(screen.queryByTestId('mock-loader')).not.toBeInTheDocument();
    expect(screen.queryByText('No replies yet. Be the first to reply!')).not.toBeInTheDocument();
  });

  it('renders "No replies yet" message when showReplies is true, loadingReplies is false, and there are no replies', () => {
    render(
      <PostRepliesSection
        showReplies={true}
        replies={[]}
        loadingReplies={false}
        onLike={mockOnLike}
      />
    );

    // Check if "No replies yet" message is rendered
    const noRepliesMessage = screen.getByText('No replies yet. Be the first to reply!');
    expect(noRepliesMessage).toBeInTheDocument();

    // Check that other elements are not rendered
    expect(screen.queryByTestId('mock-loader')).not.toBeInTheDocument();
    expect(screen.queryByTestId('mock-post-replies')).not.toBeInTheDocument();
  });

  it('renders nothing when showReplies is false and loadingReplies is false', () => {
    render(
      <PostRepliesSection
        showReplies={false}
        replies={mockReplies}
        loadingReplies={false}
        onLike={mockOnLike}
      />
    );

    // Check that no elements are rendered
    expect(screen.queryByTestId('mock-loader')).not.toBeInTheDocument();
    expect(screen.queryByTestId('mock-post-replies')).not.toBeInTheDocument();
    expect(screen.queryByText('No replies yet. Be the first to reply!')).not.toBeInTheDocument();
  });

  it('applies correct styling to the container when showing replies', () => {
    render(
      <PostRepliesSection
        showReplies={true}
        replies={mockReplies}
        loadingReplies={false}
        onLike={mockOnLike}
      />
    );

    // Get the container element (parent of PostReplies)
    const container = screen.getByTestId('mock-post-replies').parentElement;
    expect(container).toHaveClass('pl-16');
    expect(container).toHaveClass('pr-4');
    expect(container).toHaveClass('pb-4');
  });

  it('applies correct styling to the container when showing loader', () => {
    render(
      <PostRepliesSection
        showReplies={false}
        replies={[]}
        loadingReplies={true}
        onLike={mockOnLike}
      />
    );

    // Get the container element (parent of Loader)
    const container = screen.getByTestId('mock-loader').parentElement;
    expect(container).toHaveClass('pl-16');
    expect(container).toHaveClass('pr-4');
    expect(container).toHaveClass('pb-4');
    expect(container).toHaveClass('text-center');
  });
});
