import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import Header from './Header';

// Mock the hooks
vi.mock('../../hooks/context/useAuthContext.ts', () => ({
  useAuthContext: vi.fn(() => ({
    isAuthenticated: true,
    logout: vi.fn()
  }))
}));

vi.mock('../../hooks/context/useUser.ts', () => ({
  useUser: vi.fn(() => ({
    userInformation: {
      name: 'Test User',
      avatar_url: 'https://example.com/avatar.jpg'
    }
  }))
}));

// Mock the components
vi.mock('../UI', () => ({
  TuiterLogo: ({ className }) => <div data-testid="tuiter-logo" className={className}>Tuiter Logo</div>
}));

vi.mock('../SideNav', () => ({
  SidebarNav: ({ isActive }) => (
    <div data-testid="sidebar-nav" data-is-active-fn={!!isActive}>Sidebar Nav</div>
  ),
  UserMenu: ({ userInformation, onLogout, isAuthenticated }) => (
    <div
      data-testid="user-menu"
      data-user-name={userInformation?.name}
      data-has-logout={!!onLogout}
      data-is-authenticated={isAuthenticated}
    >
      User Menu
    </div>
  )
}));

describe('Header', () => {
  it('renders correctly with all components', () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );

    // Check if the header container is rendered
    const header = screen.getByRole('banner');
    expect(header).toBeInTheDocument();
    expect(header).toHaveClass('text-white');
    expect(header).toHaveClass('h-auto');

    // Check if the logo is rendered
    const logo = screen.getByTestId('tuiter-logo');
    expect(logo).toBeInTheDocument();
    expect(logo).toHaveClass('h-6');
    expect(logo).toHaveClass('w-6');
    expect(logo).toHaveClass('sm:h-8');
    expect(logo).toHaveClass('sm:w-8');
    expect(logo).toHaveClass('text-white');

    // Check if the sidebar nav is rendered
    const sidebarNav = screen.getByTestId('sidebar-nav');
    expect(sidebarNav).toBeInTheDocument();
    expect(sidebarNav).toHaveAttribute('data-is-active-fn', 'true');

    // Check if the user menu is rendered
    const userMenu = screen.getByTestId('user-menu');
    expect(userMenu).toBeInTheDocument();
    expect(userMenu).toHaveAttribute('data-user-name', 'Test User');
    expect(userMenu).toHaveAttribute('data-has-logout', 'true');
    expect(userMenu).toHaveAttribute('data-is-authenticated', 'true');
  });

  it('passes isActive function to SidebarNav', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <Header />
      </MemoryRouter>
    );

    const sidebarNav = screen.getByTestId('sidebar-nav');
    expect(sidebarNav).toHaveAttribute('data-is-active-fn', 'true');
  });

  it('passes user information to UserMenu', () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );

    const userMenu = screen.getByTestId('user-menu');
    expect(userMenu).toHaveAttribute('data-user-name', 'Test User');
  });

  it('passes logout function to UserMenu', () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );

    const userMenu = screen.getByTestId('user-menu');
    expect(userMenu).toHaveAttribute('data-has-logout', 'true');
  });

  it('passes isAuthenticated to UserMenu', () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );

    const userMenu = screen.getByTestId('user-menu');
    expect(userMenu).toHaveAttribute('data-is-authenticated', 'true');
  });
});
