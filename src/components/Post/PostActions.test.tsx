import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import PostActions from './PostActions';
import type { Post } from '../../types/postTypes';

// Mock the usePostActions hook
vi.mock('../../hooks/post-replies/usePostActions.ts', () => ({
  usePostActions: vi.fn(post => ({
    handleLike: vi.fn(),
    handleToggleReplies: vi.fn(),
    hasReplies: post.replies_count > 0,
    hasNoReplies: post.replies_count === 0,
    isLiked: post.liked,
    likesCount: post.likes,
    repliesCount: post.replies_count
  }))
}));

// Mock the button components
vi.mock('./PostActionButtons', () => ({
  CommentButton: vi.fn(({ postId, repliesCount, parentId }) => (
    <div
      data-testid="mock-comment-button"
      data-post-id={postId}
      data-replies-count={repliesCount}
      data-parent-id={parentId}
    />
  )),
  RetweetButton: vi.fn(({ onClick }) => (
    <div
      data-testid="mock-retweet-button"
      data-has-click-handler={!!onClick}
    />
  )),
  LikeButton: vi.fn(({ onClick, isLiked, likesCount }) => (
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
  const mockOnToggleReplies = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders all action buttons', () => {
    render(
      <PostActions
        post={mockPost}
        onLike={mockOnLike}
        onToggleReplies={mockOnToggleReplies}
      />
    );

    // Check if all buttons are rendered
    expect(screen.getByTestId('mock-comment-button')).toBeInTheDocument();
    expect(screen.getByTestId('mock-retweet-button')).toBeInTheDocument();
    expect(screen.getByTestId('mock-like-button')).toBeInTheDocument();
  });

  it('passes correct props to CommentButton', () => {
    render(
      <PostActions
        post={mockPost}
        onLike={mockOnLike}
        onToggleReplies={mockOnToggleReplies}
      />
    );

    const commentButton = screen.getByTestId('mock-comment-button');
    expect(commentButton).toHaveAttribute('data-post-id', '1');
    expect(commentButton).toHaveAttribute('data-replies-count', '2');
    expect(commentButton).not.toHaveAttribute('data-parent-id');
  });

  it('passes parentId to CommentButton when post is a reply', () => {
    const replyPost = { ...mockPost, parent_id: 5 };

    render(
      <PostActions
        post={replyPost}
        onLike={mockOnLike}
        onToggleReplies={mockOnToggleReplies}
      />
    );

    const commentButton = screen.getByTestId('mock-comment-button');
    expect(commentButton).toHaveAttribute('data-parent-id', '5');
  });

  it('passes correct props to RetweetButton', () => {
    render(
      <PostActions
        post={mockPost}
        onLike={mockOnLike}
        onToggleReplies={mockOnToggleReplies}
      />
    );

    const retweetButton = screen.getByTestId('mock-retweet-button');
    expect(retweetButton).toHaveAttribute('data-has-click-handler', 'true');
  });

  it('passes correct props to LikeButton', () => {
    render(
      <PostActions
        post={mockPost}
        onLike={mockOnLike}
        onToggleReplies={mockOnToggleReplies}
      />
    );

    const likeButton = screen.getByTestId('mock-like-button');
    expect(likeButton).toHaveAttribute('data-has-click-handler', 'true');
    expect(likeButton).toHaveAttribute('data-is-liked', 'false');
    expect(likeButton).toHaveAttribute('data-likes-count', '5');
  });

  it('works without onToggleReplies prop', () => {
    render(
      <PostActions
        post={mockPost}
        onLike={mockOnLike}
      />
    );

    // All buttons should still render
    expect(screen.getByTestId('mock-comment-button')).toBeInTheDocument();
    expect(screen.getByTestId('mock-retweet-button')).toBeInTheDocument();
    expect(screen.getByTestId('mock-like-button')).toBeInTheDocument();
  });

  it('applies correct styling to container', () => {
    render(
      <PostActions
        post={mockPost}
        onLike={mockOnLike}
      />
    );

    const container = screen.getByTestId('mock-comment-button').parentElement;
    expect(container).toHaveClass('w-full');
    expect(container).toHaveClass('flex');
    expect(container).toHaveClass('justify-between');
  });
});
