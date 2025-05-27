import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import ToggleMenu from './ToggleMenu';
import { useAuthContext } from '../../../hooks/context/useAuthContext';

// Mock react-router-dom
const mockNavigate = vi.fn();
vi.mock('react-router-dom', () => ({
  useNavigate: () => mockNavigate,
  useLocation: () => ({ pathname: '/' }),
  Link: vi.fn(({ to, children }) => (
    <a href={to} data-testid="mock-link">
      {children}
    </a>
  ))
}));

// Mock react-pro-sidebar
vi.mock('react-pro-sidebar', () => ({
  Sidebar: vi.fn(({ children, collapsed }) => (
    <div data-testid="mock-sidebar" data-collapsed={collapsed}>
      {children}
    </div>
  )),
  Menu: vi.fn(({ children }) => (
    <div data-testid="mock-menu">
      {children}
    </div>
  )),
  MenuItem: vi.fn(({ children, icon, className, component }) => (
    <div data-testid="mock-menu-item" className={className}>
      {icon && <div data-testid="mock-menu-item-icon">{icon}</div>}
      {component}
      {children}
    </div>
  ))
}));

// Mock the UI components
vi.mock('../../UI', () => ({
  MenuIcon: vi.fn(({ className }) => <div data-testid="mock-menu-icon" className={className} />),
  HomeIcon: vi.fn(({ className }) => <div data-testid="mock-home-icon" className={className} />),
  UserIcon: vi.fn(({ className }) => <div data-testid="mock-user-icon" className={className} />),
  CreatePostIcon: vi.fn(({ className }) => <div data-testid="mock-create-post-icon" className={className} />),
  FavoritesIcon: vi.fn(({ className }) => <div data-testid="mock-favorites-icon" className={className} />),
  EditProfileIcon: vi.fn(({ className }) => <div data-testid="mock-edit-profile-icon" className={className} />),
  TuiterLogo: vi.fn(({ className }) => <div data-testid="mock-tuiter-logo" className={className} />),
  TweetButton: vi.fn(({ onClick }) => <button data-testid="mock-tweet-button" onClick={onClick}>Tweet</button>),
  Avatar: vi.fn(({ username, avatarUrl, size }) => (
    <div data-testid="mock-avatar" data-username={username} data-avatar-url={avatarUrl} data-size={size} />
  )),
  LogoutButton: vi.fn(({ onLogout }) => (
    <button data-testid="mock-logout-button" onClick={onLogout}>Logout</button>
  ))
}));

// Mock the context hooks
vi.mock('../../../hooks/context/useAuthContext', () => ({
  useAuthContext: vi.fn(() => ({
    isAuthenticated: true,
    logout: vi.fn()
  }))
}));

vi.mock('../../../hooks/context/useUser', () => ({
  useUser: vi.fn(() => ({
    userInformation: {
      name: 'Test User',
      email: 'test@example.com',
      avatar_url: 'https://example.com/avatar.jpg'
    }
  }))
}));

describe('ToggleMenu', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('when user is authenticated', () => {
    beforeEach(() => {
      vi.mocked(useAuthContext).mockReturnValue({
        isAuthenticated: true,
        logout: vi.fn()
      });
    });

    it('renders correctly with authenticated user', () => {
      render(<ToggleMenu collapsed={false} />);

      // Check if the sidebar is rendered
      const sidebar = screen.getByTestId('mock-sidebar');
      expect(sidebar).toBeInTheDocument();
      expect(sidebar).toHaveAttribute('data-collapsed', 'false');

      // Check if the menu is rendered
      const menu = screen.getByTestId('mock-menu');
      expect(menu).toBeInTheDocument();

      // Check if the logo is rendered
      const logo = screen.getByTestId('mock-tuiter-logo');
      expect(logo).toBeInTheDocument();

      // Check if the menu items are rendered (Home, Create Post, Favorites, Edit Profile)
      const menuItems = screen.getAllByTestId('mock-menu-item');
      expect(menuItems.length).toBeGreaterThanOrEqual(4);

      // Check if the tweet button is rendered
      const tweetButton = screen.getByTestId('mock-tweet-button');
      expect(tweetButton).toBeInTheDocument();

      // Check if the user profile section is rendered
      const avatar = screen.getByTestId('mock-avatar');
      expect(avatar).toBeInTheDocument();
      expect(avatar).toHaveAttribute('data-username', 'Test User');

      // Check if the logout button is rendered
      const logoutButton = screen.getByTestId('mock-logout-button');
      expect(logoutButton).toBeInTheDocument();
    });

    // Toggle functionality is now in the Header component

    it('navigates to create post page when tweet button is clicked', () => {
      render(<ToggleMenu collapsed={false} />);

      const tweetButton = screen.getByTestId('mock-tweet-button');
      fireEvent.click(tweetButton);

      expect(mockNavigate).toHaveBeenCalledWith('/posts/create');
    });

    it('calls logout when logout button is clicked', () => {
      const mockLogout = vi.fn();
      vi.mocked(useAuthContext).mockReturnValue({
        isAuthenticated: true,
        logout: mockLogout
      });

      render(<ToggleMenu collapsed={false} />);

      const logoutButton = screen.getByTestId('mock-logout-button');
      fireEvent.click(logoutButton);

      expect(mockLogout).toHaveBeenCalled();
    });
  });

  describe('when user is not authenticated', () => {
    beforeEach(() => {
      vi.mocked(useAuthContext).mockReturnValue({
        isAuthenticated: false,
        logout: vi.fn()
      });
    });

    it('renders correctly with unauthenticated user', () => {
      render(<ToggleMenu collapsed={false} />);

      // Check if the sidebar is rendered
      const sidebar = screen.getByTestId('mock-sidebar');
      expect(sidebar).toBeInTheDocument();

      // Check if the menu is rendered
      const menu = screen.getByTestId('mock-menu');
      expect(menu).toBeInTheDocument();

      // Check if the logo is rendered
      const logo = screen.getByTestId('mock-tuiter-logo');
      expect(logo).toBeInTheDocument();

      // Check if only Home, Login, and Register menu items are rendered
      const menuItems = screen.getAllByTestId('mock-menu-item');
      expect(menuItems.length).toBe(3);

      // Check if the tweet button is not rendered
      const tweetButton = screen.queryByTestId('mock-tweet-button');
      expect(tweetButton).not.toBeInTheDocument();

      // Check if the user profile section is not rendered
      const avatar = screen.queryByTestId('mock-avatar');
      expect(avatar).not.toBeInTheDocument();

      // Check if the logout button is not rendered
      const logoutButton = screen.queryByTestId('mock-logout-button');
      expect(logoutButton).not.toBeInTheDocument();
    });
  });
});
