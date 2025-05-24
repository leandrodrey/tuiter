import { render, screen, act } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import LoginForm from './LoginForm';
import * as Formik from 'formik';
import * as Yup from 'yup';
import type { LoginFormData } from '../../types/formTypes';

// Mock the dependencies
vi.mock('./LoginFormFields', () => ({
  default: vi.fn(() => <div data-testid="login-form-fields-mock" />)
}));

vi.mock('../UI', () => ({
  SubmitButton: vi.fn(({ children, isSubmitting, loadingText }) => (
    <button
      type="submit"
      disabled={isSubmitting}
      data-testid="submit-button-mock"
      data-loading-text={loadingText}
    >
      {children}
    </button>
  )),
  RegistrationLink: vi.fn(() => <div data-testid="registration-link-mock" />)
}));

describe('LoginForm', () => {
  const defaultProps = {
    initialValues: {
      email: '',
      password: ''
    },
    validationSchema: Yup.object({
      email: Yup.string().required('Email is required'),
      password: Yup.string().required('Password is required')
    }),
    onSubmit: vi.fn().mockResolvedValue(undefined)
  };

  it('renders correctly with required props', () => {
    act(() => {
      render(<LoginForm {...defaultProps} />);
    });

    // Check if the form is rendered
    const form = screen.getByTestId('login-form-fields-mock').closest('form');
    expect(form).toBeInTheDocument();

    // Check if the LoginFormFields component is rendered
    const loginFormFields = screen.getByTestId('login-form-fields-mock');
    expect(loginFormFields).toBeInTheDocument();

    // Check if the SubmitButton component is rendered
    const submitButton = screen.getByTestId('submit-button-mock');
    expect(submitButton).toBeInTheDocument();
    expect(submitButton).toHaveTextContent('Iniciar sesión');
    expect(submitButton).toHaveAttribute('data-loading-text', 'Iniciando sesión...');

    // Check if the RegistrationLink component is rendered
    const registrationLink = screen.getByTestId('registration-link-mock');
    expect(registrationLink).toBeInTheDocument();
  });

  it('passes onSubmit to Formik', () => {
    // Create a mock for onSubmit
    const onSubmit = vi.fn().mockResolvedValue(undefined);

    // Spy on Formik
    const formikSpy = vi.spyOn(Formik, 'Formik');

    // Render the component with the mock
    act(() => {
      render(
        <LoginForm
          {...defaultProps}
          onSubmit={onSubmit}
        />
      );
    });

    // Check if Formik was called with the onSubmit prop
    expect(formikSpy).toHaveBeenCalled();
    const callArgs = formikSpy.mock.calls[0][0];
    expect(callArgs.onSubmit).toBe(onSubmit);

    // Clean up
    formikSpy.mockRestore();
  });

  it('passes initialValues to Formik', () => {
    const customInitialValues: LoginFormData = {
      email: 'test@example.com',
      password: 'password123'
    };

    const formikSpy = vi.spyOn(Formik, 'Formik');

    act(() => {
      render(<LoginForm {...defaultProps} initialValues={customInitialValues} />);
    });

    expect(formikSpy).toHaveBeenCalled();
    const callArgs = formikSpy.mock.calls[0][0];
    expect(callArgs.initialValues).toEqual(customInitialValues);

    formikSpy.mockRestore();
  });

  it('passes validationSchema to Formik', () => {
    const customValidationSchema = Yup.object({
      email: Yup.string().email('Invalid email').required('Email is required'),
      password: Yup.string().min(8, 'Password must be at least 8 characters').required('Password is required')
    });

    const formikSpy = vi.spyOn(Formik, 'Formik');

    act(() => {
      render(<LoginForm {...defaultProps} validationSchema={customValidationSchema} />);
    });

    expect(formikSpy).toHaveBeenCalled();
    const callArgs = formikSpy.mock.calls[0][0];
    expect(callArgs.validationSchema).toBe(customValidationSchema);

    formikSpy.mockRestore();
  });
});
