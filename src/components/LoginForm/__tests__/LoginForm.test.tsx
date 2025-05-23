import { describe, it, expect, vi } from 'vitest';
import { render, screen, waitFor } from '../../../test/utils';
import LoginForm from '../LoginForm';
import * as Yup from 'yup';

// Mock the child components to isolate the LoginForm component
vi.mock('../LoginFormFields', () => ({
  default: () => <div data-testid="login-form-fields">LoginFormFields</div>
}));

vi.mock('../../UI', () => ({
  SubmitButton: ({ children, isSubmitting }) => (
    <button data-testid="submit-button" disabled={isSubmitting}>
      {isSubmitting ? 'Iniciando sesión...' : children}
    </button>
  ),
  RegistrationLink: () => <div data-testid="registration-link">RegistrationLink</div>
}));

describe('LoginForm', () => {
  // Define test data
  const initialValues = {
    email: '',
    password: ''
  };

  const validationSchema = Yup.object({
    email: Yup.string().required('Email is required'),
    password: Yup.string().required('Password is required')
  });

  const onSubmit = vi.fn(async () => {
    // Mock implementation
  });

  it('renders correctly', () => {
    render(
      <LoginForm
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      />
    );

    // Check if all components are rendered
    expect(screen.getByTestId('login-form-fields')).toBeInTheDocument();
    expect(screen.getByTestId('submit-button')).toBeInTheDocument();
    expect(screen.getByTestId('registration-link')).toBeInTheDocument();
    expect(screen.getByText('Iniciar sesión')).toBeInTheDocument();
  });

  it('disables submit button when form is submitting', async () => {
    const { user } = render(
      <LoginForm
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={async (values, helpers) => {
          // Simulate a delay to show loading state
          await new Promise(resolve => setTimeout(resolve, 100));
          await onSubmit(values, helpers);
        }}
      />
    );

    // Submit the form
    const submitButton = screen.getByTestId('submit-button');
    await user.click(submitButton);

    // Check if button is disabled and shows loading text
    expect(submitButton).toBeDisabled();
    expect(submitButton).toHaveTextContent('Iniciando sesión...');

    // Wait for submission to complete
    await waitFor(() => {
      expect(submitButton).not.toBeDisabled();
      expect(submitButton).toHaveTextContent('Iniciar sesión');
    });
  });
});
