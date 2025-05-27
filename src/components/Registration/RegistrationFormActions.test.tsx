import {render, screen} from '@testing-library/react';
import {describe, it, expect, vi} from 'vitest';
import RegistrationFormActions from './RegistrationFormActions';

// Mock the SubmitButton component
vi.mock('../UI', () => ({
    SubmitButton: ({isSubmitting, loadingText, children}) => (
        <button
            data-testid="submit-button"
            data-is-submitting={isSubmitting.toString()}
            data-loading-text={loadingText}
            disabled={isSubmitting}
        >
            {isSubmitting ? loadingText : children}
        </button>
    )
}));

describe('RegistrationFormActions', () => {
    it('renders the submit button correctly when not submitting', () => {
        render(<RegistrationFormActions isSubmitting={false} />);

        const submitButton = screen.getByTestId('submit-button');
        expect(submitButton).toBeInTheDocument();
        expect(submitButton).toHaveAttribute('data-is-submitting', 'false');
        expect(submitButton).toHaveAttribute('data-loading-text', 'Registering...');
        expect(submitButton).not.toBeDisabled();
        expect(submitButton).toHaveTextContent('Register');
    });

    it('renders the submit button correctly when submitting', () => {
        render(<RegistrationFormActions isSubmitting={true} />);

        const submitButton = screen.getByTestId('submit-button');
        expect(submitButton).toBeInTheDocument();
        expect(submitButton).toHaveAttribute('data-is-submitting', 'true');
        expect(submitButton).toHaveAttribute('data-loading-text', 'Registering...');
        expect(submitButton).toBeDisabled();
        expect(submitButton).toHaveTextContent('Registering...');
    });
});
