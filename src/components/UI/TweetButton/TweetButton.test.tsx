import {render, screen, fireEvent} from '@testing-library/react';
import {describe, it, expect, vi} from 'vitest';
import TweetButton from './TweetButton';

describe('TweetButton', () => {
    it('renders correctly with default props', () => {
        render(<TweetButton/>);

        // Check if the button is rendered
        const button = screen.getByRole('button');
        expect(button).toBeInTheDocument();
        expect(button).toHaveAttribute('type', 'button');
        expect(button).not.toBeDisabled();

        // Check default classes
        expect(button).toHaveClass('bg-blue-400');
        expect(button).toHaveClass('hover:bg-blue-500');
        expect(button).toHaveClass('text-white');
        expect(button).toHaveClass('font-bold');
        expect(button).toHaveClass('rounded-full');

        // Check if "Tweet" text is rendered for larger screens
        const largeScreenText = screen.getByText('Tweet');
        expect(largeScreenText).toBeInTheDocument();
        expect(largeScreenText).toHaveClass('hidden');
        expect(largeScreenText).toHaveClass('md:inline');

        // Check if SVG icon is rendered for smaller screens
        const svg = button.querySelector('svg');
        expect(svg).toBeInTheDocument();
        if (svg) {
            expect(svg.parentElement).toHaveClass('md:hidden');
        }
    });

    it('calls onClick when clicked', () => {
        const handleClick = vi.fn();
        render(<TweetButton onClick={handleClick}/>);

        const button = screen.getByRole('button');
        fireEvent.click(button);

        expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('can be disabled', () => {
        render(<TweetButton disabled={true}/>);

        const button = screen.getByRole('button');
        expect(button).toBeDisabled();
    });

    it('can be a submit button', () => {
        render(<TweetButton type="submit"/>);

        const button = screen.getByRole('button');
        expect(button).toHaveAttribute('type', 'submit');
    });

    it('applies custom className when provided', () => {
        render(<TweetButton className="custom-class"/>);

        const button = screen.getByRole('button');
        expect(button).toHaveClass('custom-class');
    });

    it('renders children when provided instead of default content', () => {
        render(<TweetButton>Custom Button Text</TweetButton>);

        const button = screen.getByRole('button');
        expect(button).toHaveTextContent('Custom Button Text');
        expect(screen.queryByText('Tweet')).not.toBeInTheDocument();
        expect(button.querySelector('svg')).not.toBeInTheDocument();
    });
});
