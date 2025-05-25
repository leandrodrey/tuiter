import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import UserRegistrationPage from './UserRegistrationPage';

// Mock the hooks
const mockNavigate = vi.fn();

vi.mock('react-router-dom', () => ({
  useNavigate: vi.fn(() => mockNavigate)
}));

const mockToast = {
  success: vi.fn(),
  error: vi.fn(),
  info: vi.fn(),
  warning: vi.fn()
};

vi.mock('../../hooks/context/useToast.ts', () => ({
  useToast: vi.fn(() => mockToast)
}));

// Create a mock for useAuthContext with different authentication states
const useAuthContextMock = vi.fn();

vi.mock('../../hooks/context/useAuthContext.ts', () => ({
  useAuthContext: () => useAuthContextMock()
}));

// Default values for useUserRegistration hook
const mockHandleSubmit = vi.fn();
const mockInitialValues = {
  username: '',
  email: '',
  password: '',
  confirmPassword: '',
  avatar_url: ''
};

// Mock the useUserRegistration hook with different states
const useUserRegistrationMock = vi.fn();

vi.mock('./hooks/useUserRegistration.ts', () => ({
  useUserRegistration: () => useUserRegistrationMock()
}));

// Mock the components
vi.mock('../../components/UI', () => ({
  Loader: ({ text, fullScreen }) => (
    <div data-testid="loader" data-text={text} data-full-screen={fullScreen}>
      Loading...
    </div>
  ),
  PageHeader: ({ title, subtitle }) => (
    <div data-testid="page-header" data-title={title} data-subtitle={subtitle}>
      Page Header
    </div>
  )
}));

vi.mock('../../components/Registration/RegistrationForm', () => ({
  __esModule: true,
  default: ({ initialValues, onSubmit, error }) => (
    <div
      data-testid="registration-form"
      data-has-initial-values={!!initialValues}
      data-has-submit={!!onSubmit}
      data-error={error || 'none'}
    >
      Registration Form
    </div>
  )
}));

describe('UserRegistrationPage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('redirects to home page when user is authenticated', () => {
    // Set authenticated state
    useAuthContextMock.mockReturnValue({
      isAuthenticated: true
    });

    // Need to mock useUserRegistration even though we won't use its values
    useUserRegistrationMock.mockReturnValue({
      initialValues: mockInitialValues,
      isLoading: false,
      error: null,
      handleSubmit: mockHandleSubmit
    });

    render(<UserRegistrationPage />);

    // Verify navigate was called with home route
    expect(mockNavigate).toHaveBeenCalledWith('/', { replace: true });
  });

  it('renders loading state correctly', () => {
    // Set up the mocks
    useAuthContextMock.mockReturnValue({
      isAuthenticated: false
    });

    // Set up the mock to return loading state
    useUserRegistrationMock.mockReturnValue({
      initialValues: mockInitialValues,
      isLoading: true,
      error: null,
      handleSubmit: mockHandleSubmit
    });

    render(<UserRegistrationPage />);

    // Check if the loader is rendered
    const loader = screen.getByTestId('loader');
    expect(loader).toBeInTheDocument();
    expect(loader).toHaveAttribute('data-text', 'Processing registration...');
    expect(loader).toHaveAttribute('data-full-screen', 'true');
  });

  it('renders form correctly when not loading', () => {
    // Set up the mocks
    useAuthContextMock.mockReturnValue({
      isAuthenticated: false
    });

    // Set up the mock to return normal state
    useUserRegistrationMock.mockReturnValue({
      initialValues: mockInitialValues,
      isLoading: false,
      error: null,
      handleSubmit: mockHandleSubmit
    });

    render(<UserRegistrationPage />);

    // Check if the page header is rendered with correct props
    const pageHeader = screen.getByTestId('page-header');
    expect(pageHeader).toBeInTheDocument();
    expect(pageHeader).toHaveAttribute('data-title', 'Create an Account');
    expect(pageHeader).toHaveAttribute('data-subtitle', "It's free and always will be.");

    // Check if the registration form is rendered with correct props
    const registrationForm = screen.getByTestId('registration-form');
    expect(registrationForm).toBeInTheDocument();
    expect(registrationForm).toHaveAttribute('data-has-initial-values', 'true');
    expect(registrationForm).toHaveAttribute('data-has-submit', 'true');
    expect(registrationForm).toHaveAttribute('data-error', 'none');
  });

  it('renders form with error message when there is an error', () => {
    // Set up the mocks
    useAuthContextMock.mockReturnValue({
      isAuthenticated: false
    });

    // Set up the mock to return error state
    useUserRegistrationMock.mockReturnValue({
      initialValues: mockInitialValues,
      isLoading: false,
      error: 'Registration failed',
      handleSubmit: mockHandleSubmit
    });

    render(<UserRegistrationPage />);

    // Check if the registration form is rendered with error
    const registrationForm = screen.getByTestId('registration-form');
    expect(registrationForm).toBeInTheDocument();
    expect(registrationForm).toHaveAttribute('data-error', 'Registration failed');
  });
});
