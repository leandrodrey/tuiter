import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import UserMenu from './UserMenu.tsx';
import type { UserInformation } from '../../../types/userTypes.ts';

// Mock the hooks and UI components
vi.mock('../../hooks/context/useLogout', () => ({
  useLogout: vi.fn((callback) => () => callback())
}));

vi.mock('../UI', () => ({
  Avatar: vi.fn(({ username, avatarUrl, size }) => (
    <div
      data-testid="mock-avatar"
      data-username={username}
      data-avatar-url={avatarUrl}
      data-size={size}
    />
  )),
  LogoutButton: vi.fn(({ onLogout, color, size, className }) => (
    <button
      onClick={onLogout}
      data-testid="mock-logout-button"
      data-color={color}
      data-size={size}
      className={className}
    >
      Logout
    </button>
  ))
}));

describe('UserMenu', () => {
  const mockUserInfo: UserInformation = {
    id: 1,
    name: 'Test User',
    email: 'test@example.com',
    avatar_url: 'https://example.com/avatar.jpg'
  };

  const defaultProps = {
    userInformation: mockUserInfo,
    onLogout: vi.fn(),
    isAuthenticated: true
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders null when not authenticated', () => {
    const { container } = render(
      <UserMenu
        {...defaultProps}
        isAuthenticated={false}
      />
    );

    expect(container.firstChild).toBeNull();
  });

  it('renders correctly when authenticated', () => {
    render(<UserMenu {...defaultProps} />);

    // Check if the container is rendered
    const container = screen.getByTestId('mock-avatar').closest('div');
    expect(container).toBeInTheDocument();

    // Check if the Avatar component is rendered with correct props
    const avatar = screen.getByTestId('mock-avatar');
    expect(avatar).toBeInTheDocument();
    expect(avatar).toHaveAttribute('data-username', 'Test User');
    expect(avatar).toHaveAttribute('data-avatar-url', 'https://example.com/avatar.jpg');
    expect(avatar).toHaveAttribute('data-size', 'md');

    // Check if the user name and email are displayed
    expect(screen.getByText('Test User')).toBeInTheDocument();
    expect(screen.getByText('test@example.com')).toBeInTheDocument();

    // Check if the LogoutButton is rendered with correct props
    const logoutButton = screen.getByTestId('mock-logout-button');
    expect(logoutButton).toBeInTheDocument();
    expect(logoutButton).toHaveAttribute('data-color', 'default');
    expect(logoutButton).toHaveAttribute('data-size', 'sm');
    expect(logoutButton).toHaveClass('ml-auto');
  });

  it('uses fallback values when userInformation is incomplete', () => {
    render(
      <UserMenu
        {...defaultProps}
        userInformation={{ id: 1 }}
      />
    );

    // Check if fallback values are used
    const avatar = screen.getByTestId('mock-avatar');
    expect(avatar).toHaveAttribute('data-username', 'User');

    // Check if fallback text is displayed
    expect(screen.getByText('User')).toBeInTheDocument();
    expect(screen.getByText('@user')).toBeInTheDocument();
  });

  it('calls onLogout when logout button is clicked', () => {
    render(<UserMenu {...defaultProps} />);

    // Click the logout button
    const logoutButton = screen.getByTestId('mock-logout-button');
    fireEvent.click(logoutButton);

    // Check if onLogout was called
    expect(defaultProps.onLogout).toHaveBeenCalledTimes(1);
  });
});
