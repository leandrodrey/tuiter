import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import PostHeaderReply from './PostHeaderReply.tsx';
import type { Post } from '../../../types/postTypes.ts';
import { BrowserRouter } from 'react-router-dom';

// Mock the Avatar component
vi.mock('../../UI', () => ({
  Avatar: vi.fn(({ username, avatarUrl, size }) => (
    <div
      data-testid="mock-avatar"
      data-username={username}
      data-avatar-url={avatarUrl}
      data-size={size}
    />
  ))
}));

describe('PostHeaderReply', () => {
  // Create a mock post
  const mockPost: Post = {
    id: 1,
    author: 'Test User',
    avatar_url: 'https://example.com/avatar.jpg',
    message: 'Test message',
    date: '2023-01-01T00:00:00Z',
    likes: 5,
    liked: false,
    parent_id: 10,
    replies_count: 0
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders the post author information', () => {
    render(
      <BrowserRouter>
        <PostHeaderReply post={mockPost} />
      </BrowserRouter>
    );

    // Check if the author name is displayed
    expect(screen.getByText('Test User')).toBeInTheDocument();

    // Check if the username is displayed (author name without spaces)
    expect(screen.getByText(/@TestUser/)).toBeInTheDocument();

    // Check if the date is displayed
    const dateRegex = new RegExp(new Date(mockPost.date).toLocaleDateString());
    expect(screen.getByText(dateRegex)).toBeInTheDocument();

    // Check if the "Reply" label is displayed
    expect(screen.getByText('Reply')).toBeInTheDocument();
  });

  it('passes correct props to Avatar component', () => {
    render(
      <BrowserRouter>
        <PostHeaderReply post={mockPost} />
      </BrowserRouter>
    );

    const avatar = screen.getByTestId('mock-avatar');
    expect(avatar).toHaveAttribute('data-username', 'Test User');
    expect(avatar).toHaveAttribute('data-avatar-url', 'https://example.com/avatar.jpg');
    expect(avatar).toHaveAttribute('data-size', 'sm');
  });

  it('applies correct styling to the container', () => {
    render(
      <BrowserRouter>
        <PostHeaderReply post={mockPost} />
      </BrowserRouter>
    );

    // The outermost div is the direct parent of the Link element
    // which is the parent of the div containing the avatar and text
    const container = screen.getByRole('link').parentElement;
    expect(container).toHaveClass('flex');
    expect(container).toHaveClass('flex-shrink-0');
    expect(container).toHaveClass('p-3');
    expect(container).toHaveClass('pb-0');
  });

  it('handles posts with spaces in author name', () => {
    const postWithSpaces = {
      ...mockPost,
      author: 'Multiple Word Name'
    };

    render(
      <BrowserRouter>
        <PostHeaderReply post={postWithSpaces} />
      </BrowserRouter>
    );

    // Check if the username is displayed without spaces
    expect(screen.getByText(/@MultipleWordName/)).toBeInTheDocument();
  });
});
