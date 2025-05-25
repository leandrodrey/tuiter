import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import AppRouter from './AppRouter';

// Mock all the page components
vi.mock('../pages/NotFoundPage/NotFoundPage', () => ({
  default: () => <div data-testid="not-found-page">Not Found Page</div>
}));

vi.mock('../pages/FeedPage/FeedPage', () => ({
  default: () => <div data-testid="feed-page">Feed Page</div>
}));

vi.mock('../pages/CreatePostPage/CreatePostPage', () => ({
  default: () => <div data-testid="create-post-page">Create Post Page</div>
}));

vi.mock('../pages/UserRegistrationPage/UserRegistrationPage', () => ({
  default: () => <div data-testid="user-registration-page">User Registration Page</div>
}));

vi.mock('../pages/UserEditPage/UserEditPage', () => ({
  default: () => <div data-testid="user-edit-page">User Edit Page</div>
}));

vi.mock('../pages/UserFavoritesPage/UserFavoritesPage', () => ({
  default: () => <div data-testid="user-favorites-page">User Favorites Page</div>
}));

vi.mock('../pages/PostReplyPage/PostReplyPage', () => ({
  default: () => <div data-testid="post-reply-page">Post Reply Page</div>
}));

vi.mock('../pages/LoginPage/LoginPage', () => ({
  default: () => <div data-testid="login-page">Login Page</div>
}));

// Mock the layouts
vi.mock('../pages/FeedPage/layouts/FeedPageLayout', () => ({
  default: ({ children }) => <div data-testid="feed-page-layout">{children}</div>
}));

vi.mock('../pages/PostReplyPage/layouts/PostReplyLayout', () => ({
  default: ({ children }) => <div data-testid="post-reply-layout">{children}</div>
}));

// Mock the AuthGuard
vi.mock('./AuthGuard', () => ({
  default: ({ children }) => <div data-testid="auth-guard">{children}</div>
}));

describe('AppRouter', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders the login page at /login route', () => {
    render(
      <MemoryRouter initialEntries={['/login']}>
        <AppRouter />
      </MemoryRouter>
    );

    expect(screen.getByTestId('login-page')).toBeInTheDocument();
  });

  it('renders the feed page at / route with AuthGuard and FeedPageLayout', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <AppRouter />
      </MemoryRouter>
    );

    expect(screen.getByTestId('auth-guard')).toBeInTheDocument();
    expect(screen.getByTestId('feed-page-layout')).toBeInTheDocument();
    expect(screen.getByTestId('feed-page')).toBeInTheDocument();
  });

  it('renders the feed page at /feed route with AuthGuard and FeedPageLayout', () => {
    render(
      <MemoryRouter initialEntries={['/feed']}>
        <AppRouter />
      </MemoryRouter>
    );

    expect(screen.getByTestId('auth-guard')).toBeInTheDocument();
    expect(screen.getByTestId('feed-page-layout')).toBeInTheDocument();
    expect(screen.getByTestId('feed-page')).toBeInTheDocument();
  });

  it('renders the create post page at /posts/create route with AuthGuard', () => {
    render(
      <MemoryRouter initialEntries={['/posts/create']}>
        <AppRouter />
      </MemoryRouter>
    );

    expect(screen.getByTestId('auth-guard')).toBeInTheDocument();
    expect(screen.getByTestId('create-post-page')).toBeInTheDocument();
  });

  it('renders the post reply page at /posts/:postId/reply route with AuthGuard and PostReplyLayout', () => {
    render(
      <MemoryRouter initialEntries={['/posts/123/reply']}>
        <AppRouter />
      </MemoryRouter>
    );

    expect(screen.getByTestId('auth-guard')).toBeInTheDocument();
    expect(screen.getByTestId('post-reply-layout')).toBeInTheDocument();
    expect(screen.getByTestId('post-reply-page')).toBeInTheDocument();
  });

  it('renders the user registration page at /users/register route', () => {
    render(
      <MemoryRouter initialEntries={['/users/register']}>
        <AppRouter />
      </MemoryRouter>
    );

    expect(screen.getByTestId('user-registration-page')).toBeInTheDocument();
  });

  it('renders the user edit page at /users/edit route with AuthGuard', () => {
    render(
      <MemoryRouter initialEntries={['/users/edit']}>
        <AppRouter />
      </MemoryRouter>
    );

    expect(screen.getByTestId('auth-guard')).toBeInTheDocument();
    expect(screen.getByTestId('user-edit-page')).toBeInTheDocument();
  });

  it('renders the user edit page at /users/edit/:userId route with AuthGuard', () => {
    render(
      <MemoryRouter initialEntries={['/users/edit/123']}>
        <AppRouter />
      </MemoryRouter>
    );

    expect(screen.getByTestId('auth-guard')).toBeInTheDocument();
    expect(screen.getByTestId('user-edit-page')).toBeInTheDocument();
  });

  it('renders the user favorites page at /users/favorites route with AuthGuard', () => {
    render(
      <MemoryRouter initialEntries={['/users/favorites']}>
        <AppRouter />
      </MemoryRouter>
    );

    expect(screen.getByTestId('auth-guard')).toBeInTheDocument();
    expect(screen.getByTestId('user-favorites-page')).toBeInTheDocument();
  });

  it('renders the not found page for unknown routes', () => {
    render(
      <MemoryRouter initialEntries={['/unknown-route']}>
        <AppRouter />
      </MemoryRouter>
    );

    expect(screen.getByTestId('not-found-page')).toBeInTheDocument();
  });
});
