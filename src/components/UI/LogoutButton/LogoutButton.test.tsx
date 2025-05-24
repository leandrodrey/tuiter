import {render, screen, fireEvent} from '@testing-library/react';
import {describe, it, expect, vi} from 'vitest';
import LogoutButton from './LogoutButton';

describe('LogoutButton', () => {
    it('renders correctly with default props', () => {
        const onLogout = vi.fn();
        render(<LogoutButton onLogout={onLogout}/>);

        // Check if the button is rendered
        const button = screen.getByRole('button');
        expect(button).toBeInTheDocument();
        expect(button).toHaveAttribute('aria-label', 'Logout');
        expect(button).toHaveAttribute('title', 'Logout');

        // Check default classes
        expect(button).toHaveClass('text-gray-400');
        expect(button).toHaveClass('hover:text-white');
        expect(button).toHaveClass('transition-colors');
        expect(button).toHaveClass('cursor-pointer');

        // Check if the SVG is rendered with default size
        const svg = button.querySelector('svg');
        expect(svg).toBeInTheDocument();
        expect(svg).toHaveClass('h-5');
        expect(svg).toHaveClass('w-5');
    });

    it('calls onLogout when clicked', () => {
        const onLogout = vi.fn();
        render(<LogoutButton onLogout={onLogout}/>);

        const button = screen.getByRole('button');
        fireEvent.click(button);

        expect(onLogout).toHaveBeenCalledTimes(1);
    });

    it('applies custom className when provided', () => {
        const onLogout = vi.fn();
        render(<LogoutButton onLogout={onLogout} className="custom-class"/>);

        const button = screen.getByRole('button');
        expect(button).toHaveClass('custom-class');
    });

    it('renders with small size when size="sm"', () => {
        const onLogout = vi.fn();
        render(<LogoutButton onLogout={onLogout} size="sm"/>);

        const svg = screen.getByRole('button').querySelector('svg');
        expect(svg).toHaveClass('h-4');
        expect(svg).toHaveClass('w-4');
        expect(svg).not.toHaveClass('h-5');
        expect(svg).not.toHaveClass('w-5');
    });

    it('renders with large size when size="lg"', () => {
        const onLogout = vi.fn();
        render(<LogoutButton onLogout={onLogout} size="lg"/>);

        const svg = screen.getByRole('button').querySelector('svg');
        expect(svg).toHaveClass('h-6');
        expect(svg).toHaveClass('w-6');
        expect(svg).not.toHaveClass('h-5');
        expect(svg).not.toHaveClass('w-5');
    });

    it('renders with red color when color="red"', () => {
        const onLogout = vi.fn();
        render(<LogoutButton onLogout={onLogout} color="red"/>);

        const button = screen.getByRole('button');
        expect(button).toHaveClass('text-red-400');
        expect(button).toHaveClass('hover:text-red-700');
        expect(button).not.toHaveClass('text-gray-400');
        expect(button).not.toHaveClass('hover:text-white');
    });
});
