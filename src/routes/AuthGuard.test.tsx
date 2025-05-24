import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import AuthGuard from './AuthGuard';

// Mock the useAuthContext hook
const mockUseAuthContext = vi.fn(() => ({
  isAuthenticated: true
}));

vi.mock('../hooks/context/useAuthContext.ts', () => ({
  useAuthContext: () => mockUseAuthContext()
}));

describe('AuthGuard', () => {
  it('renders children when user is authenticated', () => {
    render(
      <MemoryRouter>
        <AuthGuard>
          <div data-testid="protected-content">Protected Content</div>
        </AuthGuard>
      </MemoryRouter>
    );

    const protectedContent = screen.getByTestId('protected-content');
    expect(protectedContent).toBeInTheDocument();
    expect(protectedContent).toHaveTextContent('Protected Content');
  });

  it('redirects to login page when user is not authenticated', () => {
    // Override the mock to return isAuthenticated as false
    mockUseAuthContext.mockReturnValueOnce({
      isAuthenticated: false
    });

    // We need to use Routes to catch the Navigate component's redirection
    render(
      <MemoryRouter initialEntries={['/protected']}>
        <Routes>
          <Route
            path="/protected"
            element={
              <AuthGuard>
                <div data-testid="protected-content">Protected Content</div>
              </AuthGuard>
            }
          />
          <Route path="/login" element={<div data-testid="login-page">Login Page</div>} />
        </Routes>
      </MemoryRouter>
    );

    // The protected content should not be in the document
    expect(screen.queryByTestId('protected-content')).not.toBeInTheDocument();

    // The login page should be rendered instead
    const loginPage = screen.getByTestId('login-page');
    expect(loginPage).toBeInTheDocument();
    expect(loginPage).toHaveTextContent('Login Page');
  });
});
