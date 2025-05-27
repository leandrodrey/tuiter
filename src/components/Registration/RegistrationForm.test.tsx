import {render, screen} from '@testing-library/react';
import {describe, it, expect, vi} from 'vitest';
import RegistrationForm from './RegistrationForm';
import {registrationInitialValues} from '../../validations/userSchemas';

// Mock the child components
vi.mock('./RegistrationFormFields', () => ({
    default: ({isSubmitting}) => (
        <div
            data-testid="registration-form-fields"
            data-is-submitting={isSubmitting.toString()}
        >
            Form Fields
        </div>
    )
}));

vi.mock('./RegistrationActions', () => ({
    default: ({isSubmitting}) => (
        <div
            data-testid="registration-actions"
            data-is-submitting={isSubmitting.toString()}
        >
            Form Actions
        </div>
    )
}));

describe('RegistrationForm', () => {
    const mockOnSubmit = vi.fn();
    const initialValues = registrationInitialValues;

    it('renders correctly with all components', () => {
        render(
            <RegistrationForm
                onSubmit={mockOnSubmit}
                error={null}
            />
        );

        // Check if the form container is rendered
        const formContainer = screen.getByText('Form Fields').closest('form');
        expect(formContainer).toBeInTheDocument();
        expect(formContainer).toHaveClass('space-y-6');

        // Check if the form fields are rendered
        const formFields = screen.getByTestId('registration-form-fields');
        expect(formFields).toBeInTheDocument();
        expect(formFields).toHaveAttribute('data-is-submitting', 'false');

        // Check if the form actions are rendered
        const formActions = screen.getByTestId('registration-actions');
        expect(formActions).toBeInTheDocument();
        expect(formActions).toHaveAttribute('data-is-submitting', 'false');
    });

    it('displays error message when error prop is provided', () => {
        const errorMessage = 'Test error message';
        render(
            <RegistrationForm
                onSubmit={mockOnSubmit}
                error={errorMessage}
            />
        );

        // Check if the error message is displayed
        const errorElement = screen.getByText(errorMessage);
        expect(errorElement).toBeInTheDocument();

        // Check if the error container has the correct classes
        const errorContainer = screen.getByText(errorMessage).closest('div');
        expect(errorContainer).toHaveClass('mb-4');
        expect(errorContainer).toHaveClass('p-3');
        expect(errorContainer).toHaveClass('bg-red-900/30');
        expect(errorContainer).toHaveClass('border');
        expect(errorContainer).toHaveClass('border-red-800');
        expect(errorContainer).toHaveClass('rounded-md');
        expect(errorContainer).toHaveClass('text-red-200');
    });

    it('does not display error message when error is null', () => {
        render(
            <RegistrationForm
                onSubmit={mockOnSubmit}
                error={null}
            />
        );

        // Check that no error message is displayed
        const errorContainer = screen.queryByText(/error/i);
        expect(errorContainer).not.toBeInTheDocument();
    });

    it('uses provided initialValues when passed as prop', () => {
        const customInitialValues = {
            ...initialValues,
            username: 'testuser',
            email: 'test@example.com'
        };

        render(
            <RegistrationForm
                onSubmit={mockOnSubmit}
                error={null}
                initialValues={customInitialValues}
            />
        );

        // We can't directly test the initialValues since they're passed to Formik
        // But we can check that the component renders without errors
        const formContainer = screen.getByText('Form Fields').closest('form');
        expect(formContainer).toBeInTheDocument();
    });
});
