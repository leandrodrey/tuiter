import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import UserEditForm from './UserEditForm';
import { userEditEmptyValues } from '../../validations/userSchemas';

// Mock the child components
vi.mock('./UserEditFormFields', () => ({
  default: ({ isSubmitting, values }) => (
    <div
      data-testid="user-edit-form-fields"
      data-is-submitting={isSubmitting.toString()}
      data-values={JSON.stringify(values)}
    >
      Form Fields
    </div>
  )
}));

vi.mock('./UserEditActions', () => ({
  default: ({ isSubmitting }) => (
    <div
      data-testid="user-edit-actions"
      data-is-submitting={isSubmitting.toString()}
    >
      Form Actions
    </div>
  )
}));

describe('UserEditForm', () => {
  const mockOnSubmit = vi.fn();
  const initialValues = userEditEmptyValues;

  it('renders correctly with all components', () => {
    render(
      <UserEditForm
        initialValues={initialValues}
        onSubmit={mockOnSubmit}
        error={null}
      />
    );

    // Check if the form container is rendered
    const formContainer = screen.getByText('Form Fields').closest('form');
    expect(formContainer).toBeInTheDocument();
    expect(formContainer).toHaveClass('space-y-6');

    // Check if the form fields are rendered
    const formFields = screen.getByTestId('user-edit-form-fields');
    expect(formFields).toBeInTheDocument();
    expect(formFields).toHaveAttribute('data-is-submitting', 'false');

    // Check if the form actions are rendered
    const formActions = screen.getByTestId('user-edit-actions');
    expect(formActions).toBeInTheDocument();
    expect(formActions).toHaveAttribute('data-is-submitting', 'false');
  });

  it('displays error message when error prop is provided', () => {
    const errorMessage = 'Test error message';
    render(
      <UserEditForm
        initialValues={initialValues}
        onSubmit={mockOnSubmit}
        error={errorMessage}
      />
    );

    // Check if the error message is displayed
    const errorElement = screen.getByText(errorMessage);
    expect(errorElement).toBeInTheDocument();

    // Check if the error container has the correct classes
    const errorContainer = screen.getByText(errorMessage).closest('div');
    expect(errorContainer).toHaveClass('p-4');
    expect(errorContainer).toHaveClass('mb-6');
    expect(errorContainer).toHaveClass('text-red-400');
  });

  it('does not display error message when error is null', () => {
    render(
      <UserEditForm
        initialValues={initialValues}
        onSubmit={mockOnSubmit}
        error={null}
      />
    );

    // Check that no error message is displayed
    const errorContainer = screen.queryByText(/error/i);
    expect(errorContainer).not.toBeInTheDocument();
  });
});
