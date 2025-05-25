import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import LoginFormFields from './LoginFormFields.tsx';

// Mock the formik components
const useFormikContextMock = vi.fn().mockReturnValue({ isSubmitting: false });
const FieldMock = vi.fn(({ type, id, name, placeholder, disabled, className }) => (
  <input
    type={type}
    id={id}
    name={name}
    placeholder={placeholder}
    disabled={disabled}
    className={className}
    data-testid={`field-${name}`}
  />
));
const ErrorMessageMock = vi.fn(({ name, children }) => {
  if (typeof children === 'function') {
    return children(`Error message for ${name}`);
  }
  return null;
});

// Define types for the props
interface FieldProps {
  type: string;
  id: string;
  name: string;
  placeholder: string;
  disabled: boolean;
  className: string;
}

interface ErrorMessageProps {
  name: string;
  children?: ((message: string) => React.ReactNode) | React.ReactNode;
}

vi.mock('formik', () => ({
  useFormikContext: () => useFormikContextMock(),
  Field: (props: FieldProps) => FieldMock(props),
  ErrorMessage: (props: ErrorMessageProps) => ErrorMessageMock(props)
}));

describe('LoginFormFields', () => {
  it('renders email and password fields', () => {
    // The default mock for useFormikContext returns { isSubmitting: false }
    render(<LoginFormFields />);

    // Check if the email field is rendered
    const emailField = screen.getByTestId('field-email');
    expect(emailField).toBeInTheDocument();
    expect(emailField).toHaveAttribute('type', 'email');
    expect(emailField).toHaveAttribute('id', 'email');
    expect(emailField).toHaveAttribute('name', 'email');
    expect(emailField).toHaveAttribute('placeholder', 'Correo electrónico');
    expect(emailField).not.toBeDisabled();

    // Check if the password field is rendered
    const passwordField = screen.getByTestId('field-password');
    expect(passwordField).toBeInTheDocument();
    expect(passwordField).toHaveAttribute('type', 'password');
    expect(passwordField).toHaveAttribute('id', 'password');
    expect(passwordField).toHaveAttribute('name', 'password');
    expect(passwordField).toHaveAttribute('placeholder', 'Contraseña');
    expect(passwordField).not.toBeDisabled();
  });

  it('disables fields when isSubmitting is true', () => {
    // Override the default mock for useFormikContext to return { isSubmitting: true }
    useFormikContextMock.mockReturnValue({ isSubmitting: true });

    render(<LoginFormFields />);

    // Check if the email field is disabled
    const emailField = screen.getByTestId('field-email');
    expect(emailField).toBeDisabled();

    // Check if the password field is disabled
    const passwordField = screen.getByTestId('field-password');
    expect(passwordField).toBeDisabled();
  });

  it('applies correct classes to the fields', () => {
    // The default mock for useFormikContext returns { isSubmitting: false }
    // We don't need to override it for this test

    // Clear the mock before rendering
    FieldMock.mockClear();

    render(<LoginFormFields />);

    // Find the calls to FieldMock for email and password fields
    const emailFieldCall = FieldMock.mock.calls.find(call => call[0].name === 'email');
    const passwordFieldCall = FieldMock.mock.calls.find(call => call[0].name === 'password');

    // Check if the email field has the correct classes
    expect(emailFieldCall).toBeDefined();

    // Only check the className if emailFieldCall is defined
    if (emailFieldCall) {
      expect(emailFieldCall[0].className).toContain('w-full');
      expect(emailFieldCall[0].className).toContain('p-2');
      expect(emailFieldCall[0].className).toContain('sm:p-3');
      expect(emailFieldCall[0].className).toContain('text-sm');
      expect(emailFieldCall[0].className).toContain('sm:text-base');
      expect(emailFieldCall[0].className).toContain('bg-gray-900');
      expect(emailFieldCall[0].className).toContain('rounded-md');
      expect(emailFieldCall[0].className).toContain('border');
      expect(emailFieldCall[0].className).toContain('border-gray-700');
      expect(emailFieldCall[0].className).toContain('focus:border-blue-500');
      expect(emailFieldCall[0].className).toContain('focus:ring-2');
      expect(emailFieldCall[0].className).toContain('focus:ring-blue-500/30');
      expect(emailFieldCall[0].className).toContain('text-white');
      expect(emailFieldCall[0].className).toContain('placeholder-gray-500');
      expect(emailFieldCall[0].className).toContain('transition-colors');
    }

    // Check if the password field has the correct classes
    expect(passwordFieldCall).toBeDefined();

    // Only check the className if passwordFieldCall is defined
    if (passwordFieldCall) {
      expect(passwordFieldCall[0].className).toContain('w-full');
      expect(passwordFieldCall[0].className).toContain('p-2');
      expect(passwordFieldCall[0].className).toContain('sm:p-3');
      expect(passwordFieldCall[0].className).toContain('text-sm');
      expect(passwordFieldCall[0].className).toContain('sm:text-base');
      expect(passwordFieldCall[0].className).toContain('bg-gray-900');
      expect(passwordFieldCall[0].className).toContain('rounded-md');
      expect(passwordFieldCall[0].className).toContain('border');
      expect(passwordFieldCall[0].className).toContain('border-gray-700');
      expect(passwordFieldCall[0].className).toContain('focus:border-blue-500');
      expect(passwordFieldCall[0].className).toContain('focus:ring-2');
      expect(passwordFieldCall[0].className).toContain('focus:ring-blue-500/30');
      expect(passwordFieldCall[0].className).toContain('text-white');
      expect(passwordFieldCall[0].className).toContain('placeholder-gray-500');
      expect(passwordFieldCall[0].className).toContain('transition-colors');
    }
  });

  // Note: Testing error messages would require more complex setup with Formik's context
  // and is beyond the scope of this basic test
});
