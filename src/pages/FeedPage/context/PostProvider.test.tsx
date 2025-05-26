import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { PostProvider } from './PostProvider';
import { PostContext } from './PostContext';
import { useContext } from 'react';

// Mock the hooks used by PostProvider
const fetchMorePostsMock = vi.fn();
const refreshFeedMock = vi.fn();
const handleLikePostMock = vi.fn();
const handleAddToFavoritesMock = vi.fn();

vi.mock('../hooks/useFeedPosts.ts', () => ({
  useFeedPosts: vi.fn(() => ({
    posts: [],
    setPosts: vi.fn(),
    loading: false,
    error: null,
    hasMore: true,
    initialLoading: false,
    fetchMorePosts: fetchMorePostsMock,
    refreshFeed: refreshFeedMock
  }))
}));

vi.mock('../../../hooks/post-feed/usePostInteractionsFeed.ts', () => ({
  usePostInteractionsFeed: vi.fn(() => ({
    handleLikePost: handleLikePostMock,
    handleAddToFavorites: handleAddToFavoritesMock
  }))
}));

// Test component that consumes the context
const TestConsumer = () => {
  const context = useContext(PostContext);
  return (
    <div>
      <div data-testid="loading">{context?.loading.toString()}</div>
      <div data-testid="error">{context?.error || 'no-error'}</div>
      <div data-testid="has-more">{context?.hasMore.toString()}</div>
      <div data-testid="posts-length">{context?.posts.length.toString()}</div>
      <button data-testid="fetch-more" onClick={() => context?.fetchMorePosts()}>Fetch More</button>
      <button data-testid="refresh" onClick={() => context?.refreshFeed()}>Refresh</button>
      <button data-testid="like" onClick={() => context?.handleLikePost(1)}>Like</button>
      <button data-testid="favorite" onClick={() => context?.handleAddToFavorites('user', 'avatar')}>Favorite</button>
    </div>
  );
};

describe('PostProvider', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders children correctly', () => {
    render(
      <PostProvider>
        <div data-testid="child">Child Component</div>
      </PostProvider>
    );

    expect(screen.getByTestId('child')).toBeInTheDocument();
    expect(screen.getByTestId('child')).toHaveTextContent('Child Component');
  });

  it('provides the context value to children', () => {
    render(
      <PostProvider>
        <TestConsumer />
      </PostProvider>
    );

    expect(screen.getByTestId('loading')).toHaveTextContent('false');
    expect(screen.getByTestId('error')).toHaveTextContent('no-error');
    expect(screen.getByTestId('has-more')).toHaveTextContent('true');
    expect(screen.getByTestId('posts-length')).toHaveTextContent('0');
  });

  it('provides functions that can be called by children', () => {
    render(
      <PostProvider>
        <TestConsumer />
      </PostProvider>
    );

    // Test that functions can be called
    screen.getByTestId('fetch-more').click();
    expect(fetchMorePostsMock).toHaveBeenCalled();

    screen.getByTestId('refresh').click();
    expect(refreshFeedMock).toHaveBeenCalled();

    screen.getByTestId('like').click();
    expect(handleLikePostMock).toHaveBeenCalledWith(1);

    screen.getByTestId('favorite').click();
    expect(handleAddToFavoritesMock).toHaveBeenCalledWith('user', 'avatar');
  });
});
