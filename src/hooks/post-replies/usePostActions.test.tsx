import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { usePostActions } from './usePostActions';
import type { Post } from '../../types/postTypes';

describe('usePostActions', () => {
  // Sample post data for testing
  const samplePost: Post = {
    id: 1,
    parent_id: 0,
    message: 'Test post',
    author: 'user1',
    created_at: '2023-01-01T00:00:00Z',
    likes: 5,
    liked: true
  };

  it('calls onLike with the correct post ID when handleLike is called', async () => {
    // Create mock function
    const mockOnLike = vi.fn().mockResolvedValue(undefined);

    // Render the hook
    const { result } = renderHook(() =>
      usePostActions(samplePost, mockOnLike)
    );

    // Call handleLike
    await act(async () => {
      await result.current.handleLike();
    });

    // Check if onLike was called with the correct post ID
    expect(mockOnLike).toHaveBeenCalledWith(samplePost.id);
  });

  it('returns the correct values', () => {
    // Create mock function
    const mockOnLike = vi.fn().mockResolvedValue(undefined);

    // Render the hook
    const { result } = renderHook(() =>
      usePostActions(samplePost, mockOnLike)
    );

    // Check the returned values
    expect(result.current.isLiked).toBe(samplePost.liked);
    expect(result.current.likesCount).toBe(samplePost.likes);
    expect(typeof result.current.handleLike).toBe('function');
  });

  it('handles undefined likes by defaulting to 0', () => {
    // Create a post with undefined likes
    const postWithUndefinedLikes: Post = {
      ...samplePost,
      likes: undefined
    };

    // Create mock function
    const mockOnLike = vi.fn().mockResolvedValue(undefined);

    // Render the hook
    const { result } = renderHook(() =>
      usePostActions(postWithUndefinedLikes, mockOnLike)
    );

    // Check that likesCount defaults to 0
    expect(result.current.likesCount).toBe(0);
  });
});
