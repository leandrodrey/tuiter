import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import PostHeader from './PostHeader';
import type { Post } from '../../../types/postTypes';

// Mock the UI components
vi.mock('../../UI', () => ({
  Avatar: vi.fn(({ username, avatarUrl, size }) => (
    <div
      data-testid="mock-avatar"
      data-username={username}
      data-avatar-url={avatarUrl}
      data-size={size}
    />
  )),
  FavoriteButton: vi.fn(({ author, avatarUrl, onAddToFavorites }) => (
    <button
      data-testid="mock-favorite-button"
      data-author={author}
      data-avatar-url={avatarUrl}
      onClick={() => onAddToFavorites(author, avatarUrl)}
    />
  ))
}));

describe('PostHeader', () => {
  // Create a mock post
  const mockPost: Post = {
    id: 1,
    author: 'Test User',
    avatar_url: 'https://example.com/avatar.jpg',
    message: 'Test message',
    date: '2023-01-01T00:00:00Z',
    likes: 5,
    liked: false,
    replies_count: 0
  };

  // Mock the onAddToFavorites function
  const mockOnAddToFavorites = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders the post author information', () => {
    render(<PostHeader post={mockPost} onAddToFavorites={mockOnAddToFavorites} />);

    // Check if the author name is displayed
    expect(screen.getByText('Test User')).toBeInTheDocument();

    // Check if the username is displayed (author name without spaces)
    expect(screen.getByText(/@TestUser/)).toBeInTheDocument();

    // Check if the date is displayed
    const dateRegex = new RegExp(new Date(mockPost.date).toLocaleDateString());
    expect(screen.getByText(dateRegex)).toBeInTheDocument();
  });

  it('passes correct props to Avatar component', () => {
    render(<PostHeader post={mockPost} onAddToFavorites={mockOnAddToFavorites} />);

    const avatar = screen.getByTestId('mock-avatar');
    expect(avatar).toHaveAttribute('data-username', 'Test User');
    expect(avatar).toHaveAttribute('data-avatar-url', 'https://example.com/avatar.jpg');
    expect(avatar).toHaveAttribute('data-size', 'md');
  });

  it('passes correct props to FavoriteButton component', () => {
    render(<PostHeader post={mockPost} onAddToFavorites={mockOnAddToFavorites} />);

    const favoriteButton = screen.getByTestId('mock-favorite-button');
    expect(favoriteButton).toHaveAttribute('data-author', 'Test User');
    expect(favoriteButton).toHaveAttribute('data-avatar-url', 'https://example.com/avatar.jpg');
  });

  it('calls onAddToFavorites when FavoriteButton is clicked', () => {
    render(<PostHeader post={mockPost} onAddToFavorites={mockOnAddToFavorites} />);

    const favoriteButton = screen.getByTestId('mock-favorite-button');
    favoriteButton.click();

    expect(mockOnAddToFavorites).toHaveBeenCalledWith('Test User', 'https://example.com/avatar.jpg');
  });

  it('applies correct styling to the container', () => {
    const { container } = render(<PostHeader post={mockPost} onAddToFavorites={mockOnAddToFavorites} />);

    // The outermost div is the container (first child of the render container)
    const headerContainer = container.firstChild;
    expect(headerContainer).toHaveClass('flex');
    expect(headerContainer).toHaveClass('flex-shrink-0');
    expect(headerContainer).toHaveClass('p-2');
    expect(headerContainer).toHaveClass('sm:p-4');
    expect(headerContainer).toHaveClass('pb-0');
  });

  it('handles posts with spaces in author name', () => {
    const postWithSpaces = {
      ...mockPost,
      author: 'Multiple Word Name'
    };

    render(<PostHeader post={postWithSpaces} onAddToFavorites={mockOnAddToFavorites} />);

    // Check if the username is displayed without spaces
    expect(screen.getByText(/@MultipleWordName/)).toBeInTheDocument();
  });
});
