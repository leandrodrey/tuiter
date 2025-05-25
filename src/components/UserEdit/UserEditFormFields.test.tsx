import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Formik, Form } from 'formik';
import UserEditFormFields from './UserEditFormFields';
import { userEditEmptyValues } from '../../validations/userSchemas';

// Mock Formik's ErrorMessage component
vi.mock('formik', async () => {
  const actual = await vi.importActual('formik');
  return {
    ...actual,
    ErrorMessage: ({ name, children }) =>
      children ? children(`Error for ${name}`) : <div data-testid={`error-${name}`}>Error for {name}</div>
  };
});

describe('UserEditFormFields', () => {
  const initialValues = userEditEmptyValues;

  const renderWithFormik = (isSubmitting = false, values = initialValues) => {
    return render(
      <Formik initialValues={values} onSubmit={() => {}}>
        {() => (
          <Form>
            <UserEditFormFields isSubmitting={isSubmitting} values={values} />
          </Form>
        )}
      </Formik>
    );
  };

  it('renders all form fields correctly', () => {
    renderWithFormik();

    // Check if all fields are rendered
    const nameField = screen.getByLabelText(/username/i);
    expect(nameField).toBeInTheDocument();
    expect(nameField).toHaveAttribute('name', 'name');
    expect(nameField).not.toBeDisabled();

    const emailField = screen.getByLabelText(/email/i);
    expect(emailField).toBeInTheDocument();
    expect(emailField).toHaveAttribute('name', 'email');
    expect(emailField).not.toBeDisabled();

    const avatarUrlField = screen.getByLabelText(/avatar url/i);
    expect(avatarUrlField).toBeInTheDocument();
    expect(avatarUrlField).toHaveAttribute('name', 'avatar_url');
    expect(avatarUrlField).not.toBeDisabled();

    const passwordField = screen.getByLabelText(/New Password \(leave blank to keep current\)/i);
    expect(passwordField).toBeInTheDocument();
    expect(passwordField).toHaveAttribute('name', 'password');
    expect(passwordField).not.toBeDisabled();

    const confirmPasswordField = screen.getByLabelText(/confirm new password/i);
    expect(confirmPasswordField).toBeInTheDocument();
    expect(confirmPasswordField).toHaveAttribute('name', 'confirmPassword');
    expect(confirmPasswordField).toBeDisabled(); // Should be disabled when password is empty
  });

  it('disables all fields when isSubmitting is true', () => {
    renderWithFormik(true);

    // Check if all fields are disabled
    const nameField = screen.getByLabelText(/username/i);
    expect(nameField).toBeDisabled();

    const emailField = screen.getByLabelText(/email/i);
    expect(emailField).toBeDisabled();

    const avatarUrlField = screen.getByLabelText(/avatar url/i);
    expect(avatarUrlField).toBeDisabled();

    const passwordField = screen.getByLabelText(/New Password \(leave blank to keep current\)/i);
    expect(passwordField).toBeDisabled();

    const confirmPasswordField = screen.getByLabelText(/confirm new password/i);
    expect(confirmPasswordField).toBeDisabled();
  });

  it('enables confirmPassword field when password has a value', () => {
    const valuesWithPassword = {
      ...initialValues,
      password: 'password123'
    };

    renderWithFormik(false, valuesWithPassword);

    const confirmPasswordField = screen.getByLabelText(/confirm new password/i);
    expect(confirmPasswordField).not.toBeDisabled();
  });

  it('disables confirmPassword field when password is empty', () => {
    const valuesWithEmptyPassword = {
      ...initialValues,
      password: ''
    };

    renderWithFormik(false, valuesWithEmptyPassword);

    const confirmPasswordField = screen.getByLabelText(/confirm new password/i);
    expect(confirmPasswordField).toBeDisabled();
  });
});
