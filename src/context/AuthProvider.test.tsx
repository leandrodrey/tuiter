import { render, screen, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import * as React from 'react';
import { AuthProvider } from './AuthProvider';
import { AuthContext } from './AuthContext';
import { USER_TOKEN_KEY } from '../constants/authConstants';

// Mock dependencies
vi.mock('../utils/authUtils', () => ({
  setHttpAuthToken: vi.fn()
}));

vi.mock('../services/UserService', () => ({
  apiLogin: vi.fn()
}));

vi.mock('../hooks/context/useToast', () => ({
  useToast: () => ({
    success: vi.fn(),
    error: vi.fn(),
    info: vi.fn(),
    warning: vi.fn()
  })
}));

describe('AuthProvider', () => {
  // Save original localStorage methods
  const originalGetItem = localStorage.getItem;
  const originalSetItem = localStorage.setItem;
  const originalRemoveItem = localStorage.removeItem;

  beforeEach(() => {
    // Create a mock implementation of localStorage
    const localStorageMock = {
      getItem: vi.fn(),
      setItem: vi.fn(),
      removeItem: vi.fn()
    };

    // Replace the global localStorage with our mock
    Object.defineProperty(window, 'localStorage', {
      value: localStorageMock,
      writable: true
    });

    // Clear mocks before each test
    vi.clearAllMocks();
  });

  afterEach(() => {
    // Restore original localStorage methods
    localStorage.getItem = originalGetItem;
    localStorage.setItem = originalSetItem;
    localStorage.removeItem = originalRemoveItem;
  });

  it('should render children', () => {
    render(
      <AuthProvider>
        <div data-testid="test-child">Test Child</div>
      </AuthProvider>
    );

    expect(screen.getByTestId('test-child')).toBeInTheDocument();
    expect(screen.getByText('Test Child')).toBeInTheDocument();
  });

  it('should provide auth context value', () => {
    // Create a test component that consumes the context
    const TestConsumer = () => {
      const context = React.useContext(AuthContext);

      if (!context) {
        return <div>No context</div>;
      }

      return (
        <div>
          <div data-testid="is-loading">{context.isLoadingAuth.toString()}</div>
          <div data-testid="is-authenticated">{context.isAuthenticated.toString()}</div>
          <div data-testid="user-token">{context.userToken || 'no-token'}</div>
          <button data-testid="login-btn" onClick={() => context.login('test-token')}>Login</button>
          <button data-testid="logout-btn" onClick={context.logout}>Logout</button>
        </div>
      );
    };

    render(
      <AuthProvider>
        <TestConsumer />
      </AuthProvider>
    );

    // Check initial state - isLoadingAuth is false when there's no token
    expect(screen.getByTestId('is-loading')).toHaveTextContent('false');

    // Test login function
    act(() => {
      screen.getByTestId('login-btn').click();
    });

    // Check state after login
    expect(screen.getByTestId('is-authenticated')).toHaveTextContent('true');
    expect(screen.getByTestId('user-token')).toHaveTextContent('test-token');
    expect(localStorage.setItem).toHaveBeenCalledWith('user_token', 'test-token');

    // Test logout function
    act(() => {
      screen.getByTestId('logout-btn').click();
    });

    // Check state after logout
    expect(screen.getByTestId('is-authenticated')).toHaveTextContent('false');
    expect(screen.getByTestId('user-token')).toHaveTextContent('no-token');
    expect(localStorage.removeItem).toHaveBeenCalledWith(USER_TOKEN_KEY);
  });

  it('should handle login submission', async () => {
    // Mock the apiLogin function
    const { apiLogin } = await import('../services/UserService');
    (apiLogin as unknown as ReturnType<typeof vi.fn>).mockResolvedValue({
      token: 'test-token',
      name: 'Test User'
    });

    // Create a test component that consumes the context
    const TestConsumer = () => {
      const context = React.useContext(AuthContext);

      if (!context) {
        return <div>No context</div>;
      }

      return (
        <div>
          <div data-testid="is-authenticated">{context.isAuthenticated.toString()}</div>
          <div data-testid="user-token">{context.userToken || 'no-token'}</div>
          <button
            data-testid="submit-login-btn"
            onClick={() => context.handleLoginSubmit(
              { email: 'test@example.com', password: 'password' },
              { setSubmitting: vi.fn(), resetForm: vi.fn() }
            )}
          >
            Submit Login
          </button>
        </div>
      );
    };

    render(
      <AuthProvider>
        <TestConsumer />
      </AuthProvider>
    );

    // Test handleLoginSubmit function
    await act(async () => {
      screen.getByTestId('submit-login-btn').click();
    });

    // Check that apiLogin was called with correct parameters
    expect(apiLogin).toHaveBeenCalledWith({
      email: 'test@example.com',
      password: 'password'
    });

    // Check state after login submission
    expect(screen.getByTestId('is-authenticated')).toHaveTextContent('true');
    expect(screen.getByTestId('user-token')).toHaveTextContent('test-token');
    expect(localStorage.setItem).toHaveBeenCalledWith('user_token', 'test-token');
  });

  it('should handle login errors', async () => {
    // Mock the apiLogin function to throw an error
    const { apiLogin } = await import('../services/UserService');
    const mockError = new Error('Login failed');
    (apiLogin as unknown as ReturnType<typeof vi.fn>).mockRejectedValue(mockError);

    // Mock console.error to prevent error output in tests
    const originalConsoleError = console.error;
    console.error = vi.fn();

    // Create a test component that consumes the context
    const TestConsumer = () => {
      const context = React.useContext(AuthContext);

      if (!context) {
        return <div>No context</div>;
      }

      return (
        <div>
          <div data-testid="is-authenticated">{context.isAuthenticated.toString()}</div>
          <button
            data-testid="submit-login-btn"
            onClick={() => context.handleLoginSubmit(
              { email: 'test@example.com', password: 'wrong-password' },
              { setSubmitting: vi.fn(), resetForm: vi.fn() }
            )}
          >
            Submit Login
          </button>
        </div>
      );
    };

    render(
      <AuthProvider>
        <TestConsumer />
      </AuthProvider>
    );

    // Test handleLoginSubmit function with error
    await act(async () => {
      screen.getByTestId('submit-login-btn').click();
    });

    // Check that apiLogin was called
    expect(apiLogin).toHaveBeenCalled();

    // Check that console.error was called with the error
    expect(console.error).toHaveBeenCalledWith('Login error:', mockError);

    // Check that authentication state remains false
    expect(screen.getByTestId('is-authenticated')).toHaveTextContent('false');

    // Restore console.error
    console.error = originalConsoleError;
  });
});
