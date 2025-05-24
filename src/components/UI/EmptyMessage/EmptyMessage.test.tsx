import {render, screen} from '@testing-library/react';
import {describe, it, expect} from 'vitest';
import EmptyMessage from './EmptyMessage';

describe('EmptyMessage', () => {
    it('renders with default message when no children provided', () => {
        render(<EmptyMessage/>);
        const message = screen.getByText('No posts available.');
        expect(message).toBeInTheDocument();
        expect(message.tagName).toBe('P');
        expect(message.className).toContain('text-center');
        expect(message.className).toContain('text-gray-500');
        expect(message.className).toContain('dark:text-gray-400');
        expect(message.className).toContain('my-8');
    });

    it('renders with custom message when children provided', () => {
        const customMessage = 'Custom empty message';
        render(<EmptyMessage>{customMessage}</EmptyMessage>);
        const message = screen.getByText(customMessage);
        expect(message).toBeInTheDocument();
    });

    it('applies custom className when provided', () => {
        render(<EmptyMessage className="custom-class"/>);
        const message = screen.getByText('No posts available.');
        expect(message.className).toContain('custom-class');
    });

    it('renders with custom message and custom className', () => {
        const customMessage = 'Custom empty message';
        render(<EmptyMessage className="custom-class">{customMessage}</EmptyMessage>);
        const message = screen.getByText(customMessage);
        expect(message).toBeInTheDocument();
        expect(message.className).toContain('custom-class');
    });
});
