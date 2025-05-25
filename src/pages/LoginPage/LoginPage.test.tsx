import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import LoginPage from './LoginPage';

// Mock for useLocation and useNavigate
const mockNavigate = vi.fn();
const useLocationMock = vi.fn();
const useNavigateMock = vi.fn(() => mockNavigate);

// Mock for useAuthContext
const mockHandleLoginSubmit = vi.fn();
const useAuthContextMock = vi.fn();

// Mock the hooks
vi.mock('react-router-dom', () => ({
  useLocation: () => useLocationMock(),
  useNavigate: () => useNavigateMock()
}));

vi.mock('../../hooks/context/useAuthContext.ts', () => ({
  useAuthContext: () => useAuthContextMock()
}));

// Mock the components
vi.mock('../../components/UI', () => ({
  TuiterLogo: ({ className }) => (
    <div data-testid="tuiter-logo" className={className}>
      Tuiter Logo
    </div>
  )
}));

vi.mock('../../components/LoginForm/LoginForm.tsx', () => ({
  __esModule: true,
  default: ({ initialValues, validationSchema, onSubmit }) => (
    <div
      data-testid="login-form"
      data-has-initial-values={!!initialValues}
      data-has-validation-schema={!!validationSchema}
      data-has-submit={!!onSubmit}
    >
      Login Form
    </div>
  )
}));

describe('LoginPage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders login form when user is not authenticated', () => {
    // Set up the mocks
    useAuthContextMock.mockReturnValue({
      isAuthenticated: false,
      handleLoginSubmit: mockHandleLoginSubmit
    });

    useLocationMock.mockReturnValue({
      state: { from: { pathname: '/dashboard' } }
    });

    render(<LoginPage />);

    // Check if the logo is rendered
    const logo = screen.getByTestId('tuiter-logo');
    expect(logo).toBeInTheDocument();
    expect(logo).toHaveClass('h-10');
    expect(logo).toHaveClass('w-10');
    expect(logo).toHaveClass('sm:h-12');
    expect(logo).toHaveClass('sm:w-12');
    expect(logo).toHaveClass('text-white');

    // Check if the heading is rendered
    const heading = screen.getByText('Iniciar sesión en tuiter');
    expect(heading).toBeInTheDocument();

    // Check if the login form is rendered with correct props
    const loginForm = screen.getByTestId('login-form');
    expect(loginForm).toBeInTheDocument();
    expect(loginForm).toHaveAttribute('data-has-initial-values', 'true');
    expect(loginForm).toHaveAttribute('data-has-validation-schema', 'true');
    expect(loginForm).toHaveAttribute('data-has-submit', 'true');

    // Verify navigate was not called
    expect(mockNavigate).not.toHaveBeenCalled();
  });

  it('redirects to previous location when user is authenticated', () => {
    // Set up the mocks
    useAuthContextMock.mockReturnValue({
      isAuthenticated: true,
      handleLoginSubmit: mockHandleLoginSubmit
    });

    useLocationMock.mockReturnValue({
      state: { from: { pathname: '/dashboard' } }
    });

    render(<LoginPage />);

    // Verify navigate was called with correct parameters
    expect(mockNavigate).toHaveBeenCalledWith('/dashboard', { replace: true });

    // Login form should not be rendered
    expect(screen.queryByTestId('login-form')).not.toBeInTheDocument();
  });

  it('redirects to home when no previous location exists', () => {
    // Set up the mocks
    useAuthContextMock.mockReturnValue({
      isAuthenticated: true,
      handleLoginSubmit: mockHandleLoginSubmit
    });

    useLocationMock.mockReturnValue({
      state: null
    });

    render(<LoginPage />);

    // Verify navigate was called with home route
    expect(mockNavigate).toHaveBeenCalledWith('/', { replace: true });
  });
});
