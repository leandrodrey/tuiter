import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import SidebarNav from './SidebarNav';

// Mock react-router-dom
const mockNavigate = vi.fn();
vi.mock('react-router-dom', () => ({
  useNavigate: () => mockNavigate
}));

// Mock the UI components
vi.mock('../UI', () => ({
  NavLink: vi.fn(({ to, isActive, className, children }) => (
    <a
      href={to}
      className={className}
      data-testid="mock-nav-link"
      data-is-active={isActive}
    >
      {children}
    </a>
  )),
  TweetButton: vi.fn(({ onClick }) => <button data-testid="mock-tweet-button" onClick={onClick}>Tweet</button>),
  HomeIcon: vi.fn(({ className }) => <div data-testid="mock-home-icon" className={className} />),
  UserIcon: vi.fn(({ className }) => <div data-testid="mock-user-icon" className={className} />),
  CreatePostIcon: vi.fn(({ className }) => <div data-testid="mock-create-post-icon" className={className} />),
  FavoritesIcon: vi.fn(({ className }) => <div data-testid="mock-favorites-icon" className={className} />),
  EditProfileIcon: vi.fn(({ className }) => <div data-testid="mock-edit-profile-icon" className={className} />)
}));

describe('SidebarNav', () => {
  const isActiveMock = vi.fn((path) => path === '/');

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('when user is authenticated', () => {
    it('renders correctly with authenticated user', () => {
      render(<SidebarNav isActive={isActiveMock} isAuthenticated={true} />);

      // Check if the nav element is rendered
      const nav = screen.getByRole('navigation');
      expect(nav).toBeInTheDocument();
      expect(nav).toHaveClass('mt-4');
      expect(nav).toHaveClass('sm:mt-5');
      expect(nav).toHaveClass('px-1');
      expect(nav).toHaveClass('sm:px-2');

      // Check if the correct NavLinks are rendered (Home, Create Post, Favorites, Edit Profile)
      const navLinks = screen.getAllByTestId('mock-nav-link');
      expect(navLinks).toHaveLength(4);

      // Check if TweetButton is rendered
      const tweetButton = screen.getByTestId('mock-tweet-button');
      expect(tweetButton).toBeInTheDocument();
    });

    it('passes correct props to NavLinks when authenticated', () => {
      render(<SidebarNav isActive={isActiveMock} isAuthenticated={true} />);

      const navLinks = screen.getAllByTestId('mock-nav-link');

      // Home link
      expect(navLinks[0]).toHaveAttribute('href', '/');
      expect(navLinks[0]).toHaveAttribute('data-is-active', 'true');
      expect(navLinks[0]).toHaveTextContent('Home');

      // Create Post link
      expect(navLinks[1]).toHaveAttribute('href', '/posts/create');
      expect(navLinks[1]).toHaveAttribute('data-is-active', 'false');
      expect(navLinks[1]).toHaveTextContent('Create Post');

      // Favorites link
      expect(navLinks[2]).toHaveAttribute('href', '/users/favorites');
      expect(navLinks[2]).toHaveAttribute('data-is-active', 'false');
      expect(navLinks[2]).toHaveTextContent('Favorites');

      // Edit Profile link
      expect(navLinks[3]).toHaveAttribute('href', '/users/edit');
      expect(navLinks[3]).toHaveAttribute('data-is-active', 'false');
      expect(navLinks[3]).toHaveTextContent('Edit Profile');

      // Register link should not be present
      const registerLinks = screen.queryAllByText('Register');
      expect(registerLinks).toHaveLength(0);
    });

    it('calls isActive with the correct path for each NavLink when authenticated', () => {
      render(<SidebarNav isActive={isActiveMock} isAuthenticated={true} />);

      // Check if isActive was called with the correct paths
      expect(isActiveMock).toHaveBeenCalledWith('/');
      expect(isActiveMock).toHaveBeenCalledWith('/posts/create');
      expect(isActiveMock).toHaveBeenCalledWith('/users/favorites');
      expect(isActiveMock).toHaveBeenCalledWith('/users/edit');
      expect(isActiveMock).not.toHaveBeenCalledWith('/users/register');
    });

    it('renders icons for each NavLink when authenticated', () => {
      render(<SidebarNav isActive={isActiveMock} isAuthenticated={true} />);

      // Check if the correct icons are rendered
      const homeIcon = screen.getByTestId('mock-home-icon');
      const createPostIcon = screen.getByTestId('mock-create-post-icon');
      const favoritesIcon = screen.getByTestId('mock-favorites-icon');
      const editProfileIcon = screen.getByTestId('mock-edit-profile-icon');

      expect(homeIcon).toBeInTheDocument();
      expect(createPostIcon).toBeInTheDocument();
      expect(favoritesIcon).toBeInTheDocument();
      expect(editProfileIcon).toBeInTheDocument();

      // User icon (for Register) should not be present
      const userIcons = screen.queryAllByTestId('mock-user-icon');
      expect(userIcons).toHaveLength(0);
    });

    it('navigates to create post page when TweetButton is clicked when authenticated', () => {
      render(<SidebarNav isActive={isActiveMock} isAuthenticated={true} />);

      const tweetButton = screen.getByTestId('mock-tweet-button');
      fireEvent.click(tweetButton);

      expect(mockNavigate).toHaveBeenCalledWith('/posts/create');
    });
  });

  describe('when user is not authenticated', () => {
    it('renders correctly with unauthenticated user', () => {
      render(<SidebarNav isActive={isActiveMock} isAuthenticated={false} />);

      // Check if the nav element is rendered
      const nav = screen.getByRole('navigation');
      expect(nav).toBeInTheDocument();

      // Check if only Home, Login, and Register NavLinks are rendered
      const navLinks = screen.getAllByTestId('mock-nav-link');
      expect(navLinks).toHaveLength(3);

      // Check if TweetButton is not rendered
      const tweetButton = screen.queryByTestId('mock-tweet-button');
      expect(tweetButton).not.toBeInTheDocument();
    });

    it('passes correct props to NavLinks when not authenticated', () => {
      render(<SidebarNav isActive={isActiveMock} isAuthenticated={false} />);

      const navLinks = screen.getAllByTestId('mock-nav-link');

      // Home link
      expect(navLinks[0]).toHaveAttribute('href', '/');
      expect(navLinks[0]).toHaveAttribute('data-is-active', 'true');
      expect(navLinks[0]).toHaveTextContent('Home');

      // Login link
      expect(navLinks[1]).toHaveAttribute('href', '/login');
      expect(navLinks[1]).toHaveAttribute('data-is-active', 'false');
      expect(navLinks[1]).toHaveTextContent('Login');

      // Register link
      expect(navLinks[2]).toHaveAttribute('href', '/users/register');
      expect(navLinks[2]).toHaveAttribute('data-is-active', 'false');
      expect(navLinks[2]).toHaveTextContent('Register');

      // Other links should not be present
      const createPostLinks = screen.queryAllByText('Create Post');
      const favoritesLinks = screen.queryAllByText('Favorites');
      const editProfileLinks = screen.queryAllByText('Edit Profile');

      expect(createPostLinks).toHaveLength(0);
      expect(favoritesLinks).toHaveLength(0);
      expect(editProfileLinks).toHaveLength(0);
    });

    it('calls isActive with the correct path for each NavLink when not authenticated', () => {
      render(<SidebarNav isActive={isActiveMock} isAuthenticated={false} />);

      // Check if isActive was called with the correct paths
      expect(isActiveMock).toHaveBeenCalledWith('/');
      expect(isActiveMock).toHaveBeenCalledWith('/login');
      expect(isActiveMock).toHaveBeenCalledWith('/users/register');
      expect(isActiveMock).not.toHaveBeenCalledWith('/posts/create');
      expect(isActiveMock).not.toHaveBeenCalledWith('/users/favorites');
      expect(isActiveMock).not.toHaveBeenCalledWith('/users/edit');
    });

    it('renders icons for each NavLink when not authenticated', () => {
      render(<SidebarNav isActive={isActiveMock} isAuthenticated={false} />);

      // Check if the correct icons are rendered
      const homeIcon = screen.getByTestId('mock-home-icon');
      const userIcons = screen.getAllByTestId('mock-user-icon');

      expect(homeIcon).toBeInTheDocument();
      expect(userIcons).toHaveLength(2);

      // Other icons should not be present
      const createPostIcon = screen.queryByTestId('mock-create-post-icon');
      const favoritesIcon = screen.queryByTestId('mock-favorites-icon');
      const editProfileIcon = screen.queryByTestId('mock-edit-profile-icon');

      expect(createPostIcon).not.toBeInTheDocument();
      expect(favoritesIcon).not.toBeInTheDocument();
      expect(editProfileIcon).not.toBeInTheDocument();
    });
  });
});
