import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Formik, Form } from 'formik';
import RegistrationFormFields from './RegistrationFormFields';
import { registrationInitialValues } from '../../validations/userSchemas';

// Mock Formik's ErrorMessage component
vi.mock('formik', async () => {
  const actual = await vi.importActual('formik');
  return {
    ...actual,
    ErrorMessage: ({ name, children }) =>
      children ? children(`Error for ${name}`) : <div data-testid={`error-${name}`}>Error for {name}</div>
  };
});

describe('RegistrationFormFields', () => {
  const initialValues = registrationInitialValues;

  const renderWithFormik = (isSubmitting = false) => {
    return render(
      <Formik initialValues={initialValues} onSubmit={() => {}}>
        {() => (
          <Form>
            <RegistrationFormFields isSubmitting={isSubmitting} />
          </Form>
        )}
      </Formik>
    );
  };

  it('renders all form fields correctly', () => {
    renderWithFormik();

    // Check if all fields are rendered
    const usernameField = screen.getByLabelText(/username/i);
    expect(usernameField).toBeInTheDocument();
    expect(usernameField).toHaveAttribute('name', 'username');
    expect(usernameField).not.toBeDisabled();

    const emailField = screen.getByLabelText(/email/i);
    expect(emailField).toBeInTheDocument();
    expect(emailField).toHaveAttribute('name', 'email');
    expect(emailField).not.toBeDisabled();

    const passwordField = screen.getByLabelText(/^password$/i);
    expect(passwordField).toBeInTheDocument();
    expect(passwordField).toHaveAttribute('name', 'password');
    expect(passwordField).not.toBeDisabled();

    const confirmPasswordField = screen.getByLabelText(/confirm password/i);
    expect(confirmPasswordField).toBeInTheDocument();
    expect(confirmPasswordField).toHaveAttribute('name', 'confirmPassword');
    expect(confirmPasswordField).not.toBeDisabled();

    const avatarUrlField = screen.getByLabelText(/avatar url/i);
    expect(avatarUrlField).toBeInTheDocument();
    expect(avatarUrlField).toHaveAttribute('name', 'avatar_url');
    expect(avatarUrlField).not.toBeDisabled();
  });

  it('disables all fields when isSubmitting is true', () => {
    renderWithFormik(true);

    // Check if all fields are disabled
    const usernameField = screen.getByLabelText(/username/i);
    expect(usernameField).toBeDisabled();

    const emailField = screen.getByLabelText(/email/i);
    expect(emailField).toBeDisabled();

    const passwordField = screen.getByLabelText(/^password$/i);
    expect(passwordField).toBeDisabled();

    const confirmPasswordField = screen.getByLabelText(/confirm password/i);
    expect(confirmPasswordField).toBeDisabled();

    const avatarUrlField = screen.getByLabelText(/avatar url/i);
    expect(avatarUrlField).toBeDisabled();
  });

  it('shows error messages when they exist', () => {
    renderWithFormik();

    // Check if error messages are rendered correctly
    const usernameError = screen.getByText('Error for username');
    expect(usernameError).toBeInTheDocument();

    const emailError = screen.getByText('Error for email');
    expect(emailError).toBeInTheDocument();

    const passwordError = screen.getByText('Error for password');
    expect(passwordError).toBeInTheDocument();

    const confirmPasswordError = screen.getByText('Error for confirmPassword');
    expect(confirmPasswordError).toBeInTheDocument();

    const avatarUrlError = screen.getByText('Error for avatar_url');
    expect(avatarUrlError).toBeInTheDocument();
  });
});
