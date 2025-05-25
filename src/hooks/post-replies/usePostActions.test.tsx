import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { usePostActions } from './usePostActions';
import type { Post } from '../../types/postTypes';

describe('usePostActions', () => {
  // Sample post data for testing
  const postWithReplies: Post = {
    id: 1,
    parent_id: 0,
    message: 'Test post with replies',
    author: 'user1',
    created_at: '2023-01-01T00:00:00Z',
    likes: 5,
    liked: true,
    replies_count: 3
  };

  const postWithoutReplies: Post = {
    id: 2,
    parent_id: 0,
    message: 'Test post without replies',
    author: 'user2',
    created_at: '2023-01-02T00:00:00Z',
    likes: 2,
    liked: false,
    replies_count: 0
  };

  const postWithUndefinedReplies: Post = {
    id: 3,
    parent_id: 0,
    message: 'Test post with undefined replies',
    author: 'user3',
    created_at: '2023-01-03T00:00:00Z',
    likes: 1,
    liked: false
    // replies_count is undefined
  };

  it('calls onLike with the correct post ID when handleLike is called', async () => {
    // Create mock functions
    const mockOnLike = vi.fn().mockResolvedValue(undefined);
    const mockOnToggleReplies = vi.fn();

    // Render the hook
    const { result } = renderHook(() =>
      usePostActions(postWithReplies, mockOnLike, mockOnToggleReplies)
    );

    // Call handleLike
    await act(async () => {
      await result.current.handleLike();
    });

    // Check if onLike was called with the correct post ID
    expect(mockOnLike).toHaveBeenCalledWith(postWithReplies.id);
  });

  it('calls onToggleReplies with the correct post ID when handleToggleReplies is called', () => {
    // Create mock functions
    const mockOnLike = vi.fn().mockResolvedValue(undefined);
    const mockOnToggleReplies = vi.fn();

    // Render the hook
    const { result } = renderHook(() =>
      usePostActions(postWithReplies, mockOnLike, mockOnToggleReplies)
    );

    // Call handleToggleReplies
    act(() => {
      result.current.handleToggleReplies();
    });

    // Check if onToggleReplies was called with the correct post ID
    expect(mockOnToggleReplies).toHaveBeenCalledWith(postWithReplies.id);
  });

  it('does not call onToggleReplies if it is not provided', () => {
    // Create mock function
    const mockOnLike = vi.fn().mockResolvedValue(undefined);

    // Render the hook without onToggleReplies
    const { result } = renderHook(() =>
      usePostActions(postWithReplies, mockOnLike)
    );

    // Call handleToggleReplies
    act(() => {
      result.current.handleToggleReplies();
    });

    // No error should be thrown
    expect(true).toBe(true);
  });

  it('correctly determines if a post has replies', () => {
    // Create mock functions
    const mockOnLike = vi.fn().mockResolvedValue(undefined);
    const mockOnToggleReplies = vi.fn();

    // Render the hook with a post that has replies
    const { result: resultWithReplies } = renderHook(() =>
      usePostActions(postWithReplies, mockOnLike, mockOnToggleReplies)
    );

    // Check hasReplies and hasNoReplies
    expect(resultWithReplies.current.hasReplies).toBe(true);
    expect(resultWithReplies.current.hasNoReplies).toBe(false);

    // Render the hook with a post that has no replies
    const { result: resultWithoutReplies } = renderHook(() =>
      usePostActions(postWithoutReplies, mockOnLike, mockOnToggleReplies)
    );

    // Check hasReplies and hasNoReplies
    expect(resultWithoutReplies.current.hasReplies).toBe(false);
    expect(resultWithoutReplies.current.hasNoReplies).toBe(true);

    // Render the hook with a post that has undefined replies_count
    const { result: resultWithUndefinedReplies } = renderHook(() =>
      usePostActions(postWithUndefinedReplies, mockOnLike, mockOnToggleReplies)
    );

    // Check hasReplies and hasNoReplies
    expect(resultWithUndefinedReplies.current.hasReplies).toBe(false);
    expect(resultWithUndefinedReplies.current.hasNoReplies).toBe(false);
  });

  it('returns the correct values', () => {
    // Create mock functions
    const mockOnLike = vi.fn().mockResolvedValue(undefined);
    const mockOnToggleReplies = vi.fn();

    // Render the hook
    const { result } = renderHook(() =>
      usePostActions(postWithReplies, mockOnLike, mockOnToggleReplies)
    );

    // Check the returned values
    expect(result.current.isLiked).toBe(postWithReplies.liked);
    expect(result.current.likesCount).toBe(postWithReplies.likes);
    expect(result.current.repliesCount).toBe(postWithReplies.replies_count);
    expect(typeof result.current.handleLike).toBe('function');
    expect(typeof result.current.handleToggleReplies).toBe('function');
  });

  it('handles undefined likes by defaulting to 0', () => {
    // Create a post with undefined likes
    const postWithUndefinedLikes: Post = {
      ...postWithReplies,
      likes: undefined
    };

    // Create mock functions
    const mockOnLike = vi.fn().mockResolvedValue(undefined);
    const mockOnToggleReplies = vi.fn();

    // Render the hook
    const { result } = renderHook(() =>
      usePostActions(postWithUndefinedLikes, mockOnLike, mockOnToggleReplies)
    );

    // Check that likesCount defaults to 0
    expect(result.current.likesCount).toBe(0);
  });

  it('handles undefined replies_count by defaulting to 0', () => {
    // Create mock functions
    const mockOnLike = vi.fn().mockResolvedValue(undefined);
    const mockOnToggleReplies = vi.fn();

    // Render the hook
    const { result } = renderHook(() =>
      usePostActions(postWithUndefinedReplies, mockOnLike, mockOnToggleReplies)
    );

    // Check that repliesCount defaults to 0
    expect(result.current.repliesCount).toBe(0);
  });
});
