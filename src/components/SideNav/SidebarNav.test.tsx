import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import SidebarNav from './SidebarNav';

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
  TweetButton: vi.fn(() => <button data-testid="mock-tweet-button">Tweet</button>),
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

  it('renders correctly with required props', () => {
    render(<SidebarNav isActive={isActiveMock} />);

    // Check if the nav element is rendered
    const nav = screen.getByRole('navigation');
    expect(nav).toBeInTheDocument();
    expect(nav).toHaveClass('mt-4');
    expect(nav).toHaveClass('sm:mt-5');
    expect(nav).toHaveClass('px-1');
    expect(nav).toHaveClass('sm:px-2');

    // Check if all NavLinks are rendered
    const navLinks = screen.getAllByTestId('mock-nav-link');
    expect(navLinks).toHaveLength(5);

    // Check if TweetButton is rendered
    const tweetButton = screen.getByTestId('mock-tweet-button');
    expect(tweetButton).toBeInTheDocument();
  });

  it('passes correct props to NavLinks', () => {
    render(<SidebarNav isActive={isActiveMock} />);

    const navLinks = screen.getAllByTestId('mock-nav-link');

    // Home link
    expect(navLinks[0]).toHaveAttribute('href', '/');
    expect(navLinks[0]).toHaveAttribute('data-is-active', 'true');
    expect(navLinks[0]).toHaveTextContent('Home');

    // Register link
    expect(navLinks[1]).toHaveAttribute('href', '/users/register');
    expect(navLinks[1]).toHaveAttribute('data-is-active', 'false');
    expect(navLinks[1]).toHaveTextContent('Register');

    // Create Post link
    expect(navLinks[2]).toHaveAttribute('href', '/posts/create');
    expect(navLinks[2]).toHaveAttribute('data-is-active', 'false');
    expect(navLinks[2]).toHaveTextContent('Create Post');

    // Favorites link
    expect(navLinks[3]).toHaveAttribute('href', '/users/favorites');
    expect(navLinks[3]).toHaveAttribute('data-is-active', 'false');
    expect(navLinks[3]).toHaveTextContent('Favorites');

    // Edit Profile link
    expect(navLinks[4]).toHaveAttribute('href', '/users/edit');
    expect(navLinks[4]).toHaveAttribute('data-is-active', 'false');
    expect(navLinks[4]).toHaveTextContent('Edit Profile');
  });

  it('calls isActive with the correct path for each NavLink', () => {
    render(<SidebarNav isActive={isActiveMock} />);

    // Check if isActive was called with the correct paths
    expect(isActiveMock).toHaveBeenCalledWith('/');
    expect(isActiveMock).toHaveBeenCalledWith('/users/register');
    expect(isActiveMock).toHaveBeenCalledWith('/posts/create');
    expect(isActiveMock).toHaveBeenCalledWith('/users/favorites');
    expect(isActiveMock).toHaveBeenCalledWith('/users/edit');
  });

  it('renders icons for each NavLink', () => {
    render(<SidebarNav isActive={isActiveMock} />);

    // Check if all icons are rendered
    const homeIcon = screen.getByTestId('mock-home-icon');
    const userIcon = screen.getByTestId('mock-user-icon');
    const createPostIcon = screen.getByTestId('mock-create-post-icon');
    const favoritesIcon = screen.getByTestId('mock-favorites-icon');
    const editProfileIcon = screen.getByTestId('mock-edit-profile-icon');

    expect(homeIcon).toBeInTheDocument();
    expect(userIcon).toBeInTheDocument();
    expect(createPostIcon).toBeInTheDocument();
    expect(favoritesIcon).toBeInTheDocument();
    expect(editProfileIcon).toBeInTheDocument();
  });
});
