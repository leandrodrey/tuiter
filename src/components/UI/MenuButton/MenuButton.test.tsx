import {render, screen, fireEvent} from '@testing-library/react';
import {describe, it, expect, vi} from 'vitest';
import MenuButton from './MenuButton';

// Mock the MenuIcon component
vi.mock('../Icons', () => ({
    MenuIcon: vi.fn(({className}) => (
        <div data-testid="mock-menu-icon" className={className}>
            Menu Icon
        </div>
    ))
}));

describe('MenuButton', () => {
    it('renders correctly with default state', () => {
        const handleClick = vi.fn();
        render(<MenuButton onClick={handleClick} collapsed={false} />);

        // Check if the button is rendered
        const button = screen.getByRole('button');
        expect(button).toBeInTheDocument();
        expect(button).toHaveAttribute('aria-label', 'Collapse menu');

        // Check if the menu icon is rendered
        const menuIcon = screen.getByTestId('mock-menu-icon');
        expect(menuIcon).toBeInTheDocument();
        expect(menuIcon).toHaveClass('h-6');
        expect(menuIcon).toHaveClass('w-6');
        expect(menuIcon).toHaveClass('text-white');
    });

    it('calls onClick when clicked', () => {
        const handleClick = vi.fn();
        render(<MenuButton onClick={handleClick} collapsed={false} />);

        // Get the button
        const button = screen.getByRole('button');

        // Click the button
        fireEvent.click(button);

        // Check that onClick was called
        expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('renders with correct aria-label when collapsed is true', () => {
        const handleClick = vi.fn();
        render(<MenuButton onClick={handleClick} collapsed={true} />);

        // Check if the button has the correct aria-label
        const button = screen.getByRole('button');
        expect(button).toHaveAttribute('aria-label', 'Expand menu');
    });
});
