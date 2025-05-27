import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import UserFavoritesPage from './UserFavoritesPage';
import { FAVORITE_USERS_KEY } from '../../constants/storageConstants';

// Mock the hooks
const useUserMock = vi.fn();

vi.mock('../../hooks/context/useUser', () => ({
  useUser: () => useUserMock()
}));

// Mock the components
vi.mock('../../components/UI', () => ({
  Loader: ({ text, fullScreen }) => (
    <div data-testid="loader" data-text={text} data-full-screen={fullScreen}>
      Loading...
    </div>
  ),
  PageHeader: ({ title, subtitle }) => (
    <div data-testid="page-header" data-title={title} data-subtitle={subtitle}>
      Page Header
    </div>
  ),
  Avatar: ({ username, avatarUrl, size, className }) => (
    <div
      data-testid="avatar"
      data-username={username}
      data-avatar-url={avatarUrl}
      data-size={size}
      className={className}
    >
      Avatar
    </div>
  )
}));

// Mock localStorage
const localStorageMock = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: vi.fn((key: string) => store[key] || null),
    setItem: vi.fn((key: string, value: string) => {
      store[key] = value;
    }),
    clear: vi.fn(() => {
      store = {};
    })
  };
})();

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock
});
describe('UserFavoritesPage', () => {
  const userSpecificKey = `${FAVORITE_USERS_KEY}_test@example.com`;

  beforeEach(() => {
    localStorageMock.clear();
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  it('renders empty state when no favorites exist', () => {
    // Set up the mock to return user information
    useUserMock.mockReturnValue({
      userInformation: {
        email: 'test@example.com',
        name: 'Test User',
        avatar_url: 'https://example.com/avatar.jpg'
      }
    });

    // Mock localStorage to return null (no favorites)
    localStorageMock.getItem.mockReturnValue(null);

    render(<UserFavoritesPage />);

    // Check if the page header is rendered with correct props
    const pageHeader = screen.getByTestId('page-header');
    expect(pageHeader).toBeInTheDocument();
    expect(pageHeader).toHaveAttribute('data-title', 'Favorite Users');
    expect(pageHeader).toHaveAttribute('data-subtitle', 'Users you have added to your favorites');

    // Check if the empty message is displayed
    const emptyMessage = screen.getByText("You haven't added any users to your favorites yet.");
    expect(emptyMessage).toBeInTheDocument();
  });

  it('renders favorites list when favorites exist', () => {
    // Set up the mock to return user information
    useUserMock.mockReturnValue({
      userInformation: {
        email: 'test@example.com',
        name: 'Test User',
        avatar_url: 'https://example.com/avatar.jpg'
      }
    });

    // Mock localStorage to return favorites
    const favorites = [
      { author: 'User1', avatar_url: 'https://example.com/avatar1.jpg' },
      { author: 'User2', avatar_url: 'https://example.com/avatar2.jpg' }
    ];
    localStorageMock.getItem.mockReturnValue(JSON.stringify(favorites));

    render(<UserFavoritesPage />);

    // Check if the page header is rendered
    const pageHeader = screen.getByTestId('page-header');
    expect(pageHeader).toBeInTheDocument();

    // Check if the favorites are rendered
    const avatars = screen.getAllByTestId('avatar');
    expect(avatars).toHaveLength(2);
    expect(avatars[0]).toHaveAttribute('data-username', 'User1');
    expect(avatars[0]).toHaveAttribute('data-avatar-url', 'https://example.com/avatar1.jpg');
    expect(avatars[1]).toHaveAttribute('data-username', 'User2');
    expect(avatars[1]).toHaveAttribute('data-avatar-url', 'https://example.com/avatar2.jpg');

    // Check if the user names are rendered
    const userName1 = screen.getByText('User1');
    const userName2 = screen.getByText('User2');
    expect(userName1).toBeInTheDocument();
    expect(userName2).toBeInTheDocument();

    // Check if the remove buttons are rendered
    const removeButtons = screen.getAllByText('Remove');
    expect(removeButtons).toHaveLength(2);
  });

  it('removes a favorite when remove button is clicked', () => {
    // Set up the mock to return user information
    useUserMock.mockReturnValue({
      userInformation: {
        email: 'test@example.com',
        name: 'Test User',
        avatar_url: 'https://example.com/avatar.jpg'
      }
    });

    // Mock localStorage to return favorites
    const favorites = [
      { author: 'User1', avatar_url: 'https://example.com/avatar1.jpg' },
      { author: 'User2', avatar_url: 'https://example.com/avatar2.jpg' }
    ];
    localStorageMock.getItem.mockReturnValue(JSON.stringify(favorites));

    render(<UserFavoritesPage />);

    // Get the remove buttons and click the first one
    const removeButtons = screen.getAllByText('Remove');
    fireEvent.click(removeButtons[0]);

    // Check if localStorage.setItem was called with the updated favorites
    expect(localStorageMock.setItem).toHaveBeenCalledWith(
      userSpecificKey,
      JSON.stringify([{ author: 'User2', avatar_url: 'https://example.com/avatar2.jpg' }])
    );
  });

  it('uses default key when user information is not available', () => {
    // Override the mock to return undefined user information
    useUserMock.mockReturnValue({
      userInformation: undefined
    });

    // Mock localStorage to return favorites with the default key
    const favorites = [
      { author: 'User1', avatar_url: 'https://example.com/avatar1.jpg' }
    ];
    localStorageMock.getItem.mockReturnValue(JSON.stringify(favorites));

    render(<UserFavoritesPage />);

    // Check if localStorage.getItem was called with the default key
    expect(localStorageMock.getItem).toHaveBeenCalledWith(FAVORITE_USERS_KEY);
  });
});
