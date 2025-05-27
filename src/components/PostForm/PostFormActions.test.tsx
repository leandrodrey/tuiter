import {render, screen, fireEvent} from '@testing-library/react';
import {describe, it, expect, vi} from 'vitest';
import PostFormActions from './PostFormActions';
import {PostFormData} from '../../types/formTypes';

// Mock the UI components
vi.mock('../UI', () => ({
    CharCount: ({charCount, maxChars}) => (
        <div
            data-testid="char-count"
            data-char-count={charCount}
            data-max-chars={maxChars}
        >
            CharCount
        </div>
    ),
    SaveDraftButton: ({onClick, values, isDisabled}) => (
        <button
            data-testid="save-draft-button"
            data-is-disabled={isDisabled}
            onClick={() => onClick(values)}
        >
            Save Draft
        </button>
    ),
    ClearDraftButton: ({onClick, resetForm, isDisabled}) => (
        <button
            data-testid="clear-draft-button"
            data-is-disabled={isDisabled}
            onClick={() => onClick(resetForm)}
        >
            Clear Draft
        </button>
    ),
    TweetButton: ({type, disabled, className, children}) => (
        <button
            data-testid="tweet-button"
            type={type}
            disabled={disabled}
            className={className}
        >
            {children || 'Tweet'}
        </button>
    )
}));

vi.mock('../UI/Loader/Spinner.tsx', () => ({
    default: ({size, color}) => (
        <div
            data-testid="spinner"
            data-size={size}
            data-color={color}
        >
            Spinner
        </div>
    )
}));

describe('PostFormActions', () => {
    const mockValues: PostFormData = {
        message: 'Test message',
        media: []
    };

    const mockEmptyValues: PostFormData = {
        message: '',
        media: []
    };

    const mockResetForm = vi.fn();
    const mockOnSaveDraft = vi.fn();
    const mockOnClearDraft = vi.fn();

    it('renders correctly with non-empty message', () => {
        render(
            <PostFormActions
                isSubmitting={false}
                values={mockValues}
                resetForm={mockResetForm}
                onSaveDraft={mockOnSaveDraft}
                onClearDraft={mockOnClearDraft}
            />
        );

        // Check if the SaveDraftButton is rendered and enabled
        const saveDraftButton = screen.getByTestId('save-draft-button');
        expect(saveDraftButton).toBeInTheDocument();
        expect(saveDraftButton).toHaveAttribute('data-is-disabled', 'false');

        // Check if the ClearDraftButton is rendered and enabled
        const clearDraftButton = screen.getByTestId('clear-draft-button');
        expect(clearDraftButton).toBeInTheDocument();
        expect(clearDraftButton).toHaveAttribute('data-is-disabled', 'false');

        // Check if the CharCount is rendered with correct props
        const charCount = screen.getByTestId('char-count');
        expect(charCount).toBeInTheDocument();
        expect(charCount).toHaveAttribute('data-char-count', '12'); // 'Test message' length
        expect(charCount).toHaveAttribute('data-max-chars', '280');

        // Check if the TweetButton is rendered and enabled
        const tweetButton = screen.getByTestId('tweet-button');
        expect(tweetButton).toBeInTheDocument();
        expect(tweetButton).toHaveAttribute('type', 'submit');
        expect(tweetButton).not.toBeDisabled();
    });

    it('disables buttons when message is empty', () => {
        render(
            <PostFormActions
                isSubmitting={false}
                values={mockEmptyValues}
                resetForm={mockResetForm}
                onSaveDraft={mockOnSaveDraft}
                onClearDraft={mockOnClearDraft}
            />
        );

        // Check if the SaveDraftButton is disabled
        const saveDraftButton = screen.getByTestId('save-draft-button');
        expect(saveDraftButton).toHaveAttribute('data-is-disabled', 'true');

        // Check if the ClearDraftButton is disabled
        const clearDraftButton = screen.getByTestId('clear-draft-button');
        expect(clearDraftButton).toHaveAttribute('data-is-disabled', 'true');

        // Check if the CharCount is not rendered
        expect(screen.queryByTestId('char-count')).not.toBeInTheDocument();

        // Check if the TweetButton is disabled
        const tweetButton = screen.getByTestId('tweet-button');
        expect(tweetButton).toBeDisabled();
    });

    it('disables buttons when submitting', () => {
        render(
            <PostFormActions
                isSubmitting={true}
                values={mockValues}
                resetForm={mockResetForm}
                onSaveDraft={mockOnSaveDraft}
                onClearDraft={mockOnClearDraft}
            />
        );

        // Check if the SaveDraftButton is disabled
        const saveDraftButton = screen.getByTestId('save-draft-button');
        expect(saveDraftButton).toHaveAttribute('data-is-disabled', 'true');

        // Check if the ClearDraftButton is disabled
        const clearDraftButton = screen.getByTestId('clear-draft-button');
        expect(clearDraftButton).toHaveAttribute('data-is-disabled', 'true');

        // Check if the TweetButton is disabled and shows spinner
        const tweetButton = screen.getByTestId('tweet-button');
        expect(tweetButton).toBeDisabled();

        const spinner = screen.getByTestId('spinner');
        expect(spinner).toBeInTheDocument();
        expect(spinner).toHaveAttribute('data-size', 'sm');
        expect(spinner).toHaveAttribute('data-color', 'white');

        expect(screen.getByText('Posting...')).toBeInTheDocument();
    });

    it('disables TweetButton when message is over character limit', () => {
        const longMessage = 'a'.repeat(281); // 281 characters, over the 280 limit
        const mockOverLimitValues: PostFormData = {
            message: longMessage,
            media: []
        };

        render(
            <PostFormActions
                isSubmitting={false}
                values={mockOverLimitValues}
                resetForm={mockResetForm}
                onSaveDraft={mockOnSaveDraft}
                onClearDraft={mockOnClearDraft}
            />
        );

        // Check if the CharCount is rendered with correct props
        const charCount = screen.getByTestId('char-count');
        expect(charCount).toBeInTheDocument();
        expect(charCount).toHaveAttribute('data-char-count', '281');
        expect(charCount).toHaveAttribute('data-max-chars', '280');

        // Check if the TweetButton is disabled
        const tweetButton = screen.getByTestId('tweet-button');
        expect(tweetButton).toBeDisabled();
    });

    it('calls onSaveDraft when SaveDraftButton is clicked', () => {
        render(
            <PostFormActions
                isSubmitting={false}
                values={mockValues}
                resetForm={mockResetForm}
                onSaveDraft={mockOnSaveDraft}
                onClearDraft={mockOnClearDraft}
            />
        );

        const saveDraftButton = screen.getByTestId('save-draft-button');
        fireEvent.click(saveDraftButton);

        expect(mockOnSaveDraft).toHaveBeenCalledWith(mockValues);
    });

    it('calls onClearDraft when ClearDraftButton is clicked', () => {
        render(
            <PostFormActions
                isSubmitting={false}
                values={mockValues}
                resetForm={mockResetForm}
                onSaveDraft={mockOnSaveDraft}
                onClearDraft={mockOnClearDraft}
            />
        );

        const clearDraftButton = screen.getByTestId('clear-draft-button');
        fireEvent.click(clearDraftButton);

        expect(mockOnClearDraft).toHaveBeenCalledWith(mockResetForm);
    });
});
