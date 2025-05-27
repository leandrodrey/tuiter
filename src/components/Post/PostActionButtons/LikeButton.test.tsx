import {render, screen, fireEvent} from '@testing-library/react';
import {describe, it, expect, vi, beforeEach} from 'vitest';
import LikeButton from './LikeButton';

describe('LikeButton', () => {
    const defaultProps = {
        onClick: vi.fn(),
        isLiked: false,
        likesCount: 5
    };

    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('renders correctly with required props', () => {
        render(<LikeButton {...defaultProps} />);

        // Check if the component is rendered
        const button = screen.getByRole('button');
        expect(button).toBeInTheDocument();
        expect(button).toHaveAttribute('title', 'Like this post');
        expect(button).toHaveClass('flex');
        expect(button).toHaveClass('items-center');
        expect(button).toHaveClass('cursor-pointer');

        // Check if the SVG icon is rendered
        const svg = button.querySelector('svg');
        expect(svg).toBeInTheDocument();
        expect(svg).toHaveClass('w-5');
        expect(svg).toHaveClass('h-5');
        expect(svg).toHaveClass('mr-2');

        // Check if the likes count is displayed
        expect(button).toHaveTextContent('5');
    });

    it('applies correct classes when isLiked is true', () => {
        render(<LikeButton {...defaultProps} isLiked={true}/>);

        const button = screen.getByRole('button');
        expect(button).toHaveClass('flex');
        expect(button).toHaveClass('items-center');
        expect(button).toHaveClass('text-red-600');
        expect(button).not.toHaveClass('cursor-pointer');
    });

    it('does not display likes count when it is 0', () => {
        render(<LikeButton {...defaultProps} likesCount={0}/>);

        const button = screen.getByRole('button');
        expect(button).toHaveTextContent('');
    });

    it('calls onClick when clicked', () => {
        render(<LikeButton {...defaultProps} />);

        const button = screen.getByRole('button');
        fireEvent.click(button);

        expect(defaultProps.onClick).toHaveBeenCalledTimes(1);
    });

    it('has correct parent container classes', () => {
        const {container} = render(<LikeButton {...defaultProps} />);

        const parentDiv = container.firstChild as HTMLElement;
        expect(parentDiv).toHaveClass('flex-1');
        expect(parentDiv).toHaveClass('flex');
        expect(parentDiv).toHaveClass('items-center');
        expect(parentDiv).toHaveClass('text-xs');
        expect(parentDiv).toHaveClass('text-gray-400');
        expect(parentDiv).toHaveClass('hover:text-red-600');
        expect(parentDiv).toHaveClass('transition');
        expect(parentDiv).toHaveClass('duration-350');
        expect(parentDiv).toHaveClass('ease-in-out');
    });

    // The LikeButton component doesn't accept data-testid directly
    // This test is removed as it's not applicable
});
