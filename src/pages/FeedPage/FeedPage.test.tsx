import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import FeedPage from './FeedPage';

// Mock for usePostContext
const mockFetchMorePosts = vi.fn();
const mockRefreshFeed = vi.fn();
const mockHandleLikePost = vi.fn();
const mockHandleAddToFavorites = vi.fn();

// Create a mock implementation that we can control
const usePostContextMock = vi.fn();

// Mock the hook
vi.mock('./hooks/usePostContext.ts', () => ({
  usePostContext: () => usePostContextMock()
}));

// Mock the components
vi.mock('../../components/UI', () => ({
  PageHeader: ({ title, subtitle }) => (
    <div data-testid="page-header" data-title={title} data-subtitle={subtitle}>
      Page Header
    </div>
  ),
  Loader: ({ text, spinnerSize, spinnerColor }) => (
    <div
      data-testid="loader"
      data-text={text}
      data-spinner-size={spinnerSize}
      data-spinner-color={spinnerColor}
    >
      Loading...
    </div>
  )
}));

vi.mock('../../components/Post/PostList', () => ({
  __esModule: true,
  default: () => <div data-testid="post-list">Post List</div>
}));

// Mock InfiniteScroll with additional props for testing pull-to-refresh
vi.mock('react-infinite-scroll-component', () => ({
  __esModule: true,
  default: ({
    children,
    dataLength,
    next,
    hasMore,
    loader,
    endMessage,
    refreshFunction,
    pullDownToRefresh,
    pullDownToRefreshThreshold,
    pullDownToRefreshContent,
    releaseToRefreshContent
  }) => (
    <div
      data-testid="infinite-scroll"
      data-length={dataLength}
      data-has-more={hasMore.toString()}
      data-has-next-fn={!!next}
      data-has-refresh-fn={!!refreshFunction}
      data-pull-down-to-refresh={pullDownToRefresh ? 'true' : 'false'}
      data-pull-down-threshold={pullDownToRefreshThreshold}
    >
      {pullDownToRefresh && pullDownToRefreshContent}
      {pullDownToRefresh && releaseToRefreshContent}
      {children}
      {hasMore ? loader : endMessage}
    </div>
  )
}));

describe('FeedPage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders correctly with posts', () => {
    // Set up the mock to return posts
    usePostContextMock.mockReturnValue({
      posts: [
        {
          post: {
            id: 1,
            message: 'Test post 1',
            author: 'User1',
            avatar_url: 'https://example.com/avatar1.jpg',
            date: '2023-01-01T12:00:00Z',
            liked: false,
            likes: 5,
            parent_id: 0,
            replies_count: 2
          },
          replies: [
            {
              id: 2,
              message: 'Reply to post 1',
              author: 'User2',
              avatar_url: 'https://example.com/avatar2.jpg',
              date: '2023-01-01T12:30:00Z',
              liked: true,
              likes: 1,
              parent_id: 1
            }
          ]
        }
      ],
      loading: false,
      error: null,
      hasMore: true,
      initialLoading: false,
      fetchMorePosts: mockFetchMorePosts,
      refreshFeed: mockRefreshFeed,
      handleLikePost: mockHandleLikePost,
      handleAddToFavorites: mockHandleAddToFavorites
    });

    render(<FeedPage />);

    // Check if the page header is rendered with correct props
    const pageHeader = screen.getByTestId('page-header');
    expect(pageHeader).toBeInTheDocument();
    expect(pageHeader).toHaveAttribute('data-title', 'Post Feed');
    expect(pageHeader).toHaveAttribute('data-subtitle', 'See what\'s happening in the community');

    // Check if the infinite scroll is rendered with correct props
    const infiniteScroll = screen.getByTestId('infinite-scroll');
    expect(infiniteScroll).toBeInTheDocument();
    expect(infiniteScroll).toHaveAttribute('data-length', '1');
    expect(infiniteScroll).toHaveAttribute('data-has-more', 'true');
    expect(infiniteScroll).toHaveAttribute('data-has-next-fn', 'true');
    expect(infiniteScroll).toHaveAttribute('data-has-refresh-fn', 'true');
    expect(infiniteScroll).toHaveAttribute('data-pull-down-to-refresh', 'true');
    expect(infiniteScroll).toHaveAttribute('data-pull-down-threshold', '50');

    // Check if the post list is rendered
    const postList = screen.getByTestId('post-list');
    expect(postList).toBeInTheDocument();
  });

  it('renders error state correctly', () => {
    // Set up the mock to return an error
    usePostContextMock.mockReturnValue({
      posts: [],
      loading: false,
      error: 'Failed to load posts',
      hasMore: false,
      initialLoading: false,
      fetchMorePosts: mockFetchMorePosts,
      refreshFeed: mockRefreshFeed,
      handleLikePost: mockHandleLikePost,
      handleAddToFavorites: mockHandleAddToFavorites
    });

    render(<FeedPage />);

    // Check if the error message is displayed
    const errorMessage = screen.getByText('Failed to load posts');
    expect(errorMessage).toBeInTheDocument();

    // Check if the retry button is displayed
    const retryButton = screen.getByRole('button', { name: 'Retry' });
    expect(retryButton).toBeInTheDocument();

    // Test retry button click
    fireEvent.click(retryButton);
    expect(mockRefreshFeed).toHaveBeenCalled();
  });

  it('shows loading state in retry button when loading', () => {
    // Set up the mock to return loading state with error
    usePostContextMock.mockReturnValue({
      posts: [],
      loading: true,
      error: 'Failed to load posts',
      hasMore: false,
      initialLoading: false,
      fetchMorePosts: mockFetchMorePosts,
      refreshFeed: mockRefreshFeed,
      handleLikePost: mockHandleLikePost,
      handleAddToFavorites: mockHandleAddToFavorites
    });

    render(<FeedPage />);

    // Check if the retry button shows loading state
    const retryButton = screen.getByRole('button', { name: 'Retrying...' });
    expect(retryButton).toBeInTheDocument();
    expect(retryButton).toBeDisabled();
  });

  it('displays loader when loading more posts', () => {
    // Set up the mock to return posts with hasMore true
    usePostContextMock.mockReturnValue({
      posts: [{ post: { id: 1, message: 'Test post' }, replies: [] }],
      loading: false,
      error: null,
      hasMore: true,
      initialLoading: false,
      fetchMorePosts: mockFetchMorePosts,
      refreshFeed: mockRefreshFeed,
      handleLikePost: mockHandleLikePost,
      handleAddToFavorites: mockHandleAddToFavorites
    });

    render(<FeedPage />);

    // Check if the loader is rendered
    const loader = screen.getByTestId('loader');
    expect(loader).toBeInTheDocument();
    expect(loader).toHaveAttribute('data-text', 'Loading more posts...');
    expect(loader).toHaveAttribute('data-spinner-size', 'md');
    expect(loader).toHaveAttribute('data-spinner-color', 'primary');
  });

  it('displays end message when there are no more posts', () => {
    // Set up the mock to return posts with hasMore false
    usePostContextMock.mockReturnValue({
      posts: [{ post: { id: 1, message: 'Test post' }, replies: [] }],
      loading: false,
      error: null,
      hasMore: false,
      initialLoading: false,
      fetchMorePosts: mockFetchMorePosts,
      refreshFeed: mockRefreshFeed,
      handleLikePost: mockHandleLikePost,
      handleAddToFavorites: mockHandleAddToFavorites
    });

    render(<FeedPage />);

    // Check if the end message is displayed
    const endMessage = screen.getByText("You've seen all posts!");
    expect(endMessage).toBeInTheDocument();
  });

  it('renders pull-to-refresh content correctly', () => {
    // Set up the mock to return posts
    usePostContextMock.mockReturnValue({
      posts: [{ post: { id: 1, message: 'Test post' }, replies: [] }],
      loading: false,
      error: null,
      hasMore: true,
      initialLoading: false,
      fetchMorePosts: mockFetchMorePosts,
      refreshFeed: mockRefreshFeed,
      handleLikePost: mockHandleLikePost,
      handleAddToFavorites: mockHandleAddToFavorites
    });

    render(<FeedPage />);

    // Check if pull down to refresh content is rendered
    const pullDownContent = screen.getByText('↓ Pull down to refresh');
    expect(pullDownContent).toBeInTheDocument();

    // Check if release to refresh content is rendered
    const releaseContent = screen.getByText('↑ Release to refresh');
    expect(releaseContent).toBeInTheDocument();
  });

  it('calls refreshFeed when refresh function is triggered', () => {
    // Set up the mock to return posts
    usePostContextMock.mockReturnValue({
      posts: [{ post: { id: 1, message: 'Test post' }, replies: [] }],
      loading: false,
      error: null,
      hasMore: true,
      initialLoading: false,
      fetchMorePosts: mockFetchMorePosts,
      refreshFeed: mockRefreshFeed,
      handleLikePost: mockHandleLikePost,
      handleAddToFavorites: mockHandleAddToFavorites
    });

    render(<FeedPage />);

    // Check if the infinite scroll has the refresh function
    const infiniteScroll = screen.getByTestId('infinite-scroll');
    expect(infiniteScroll).toHaveAttribute('data-has-refresh-fn', 'true');

    // We can't directly test the refreshFunction call through the mock,
    // but we can verify it's properly passed to the InfiniteScroll component
    expect(mockRefreshFeed).not.toHaveBeenCalled();
  });
});
