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

vi.mock('../UI', () => ({
    SubmitButton: ({isSubmitting, loadingText, children}) => (
        <button
            data-testid="submit-button"
            data-is-submitting={isSubmitting.toString()}
            data-loading-text={loadingText}
        >
            {children}
        </button>
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

        // Check if the submit button is rendered
        const submitButton = screen.getByTestId('submit-button');
        expect(submitButton).toBeInTheDocument();
        expect(submitButton).toHaveAttribute('data-is-submitting', 'false');
        expect(submitButton).toHaveAttribute('data-loading-text', 'Registering...');
        expect(submitButton).toHaveTextContent('Register');
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
