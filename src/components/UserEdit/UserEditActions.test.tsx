import {render, screen} from '@testing-library/react';
import {describe, it, expect, vi} from 'vitest';
import UserEditActions from './UserEditActions';


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

describe('UserEditActions', () => {
    it('renders the submit button correctly when not submitting', () => {
        render(<UserEditActions isSubmitting={false} />);

        const submitButton = screen.getByTestId('submit-button');
        expect(submitButton).toBeInTheDocument();
        expect(submitButton).toHaveAttribute('data-is-submitting', 'false');
        expect(submitButton).toHaveAttribute('data-loading-text', 'Updating...');
        expect(submitButton).not.toBeDisabled();
        expect(submitButton).toHaveTextContent('Update Profile');
    });

    it('renders the submit button correctly when submitting', () => {
        render(<UserEditActions isSubmitting={true} />);

        const submitButton = screen.getByTestId('submit-button');
        expect(submitButton).toBeInTheDocument();
        expect(submitButton).toHaveAttribute('data-is-submitting', 'true');
        expect(submitButton).toHaveAttribute('data-loading-text', 'Updating...');
        expect(submitButton).toBeDisabled();
        expect(submitButton).toHaveTextContent('Updating...');
    });

    it('renders with the correct container class', () => {
        const {container} = render(<UserEditActions isSubmitting={false} />);

        const actionContainer = container.firstChild;
        expect(actionContainer).toHaveClass('pt-6');
    });
});
