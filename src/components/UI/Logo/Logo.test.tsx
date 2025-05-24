import {render} from '@testing-library/react';
import {describe, it, expect} from 'vitest';
import Logo from './Logo';

describe('Logo', () => {
    it('renders correctly with default props', () => {
        const {container} = render(<Logo/>);

        // Check if the container div is rendered with correct classes
        const logoContainer = container.firstChild as HTMLElement;
        expect(logoContainer).toBeInTheDocument();
        expect(logoContainer).toHaveClass('flex');
        expect(logoContainer).toHaveClass('items-center');

        // Check if the SVG is rendered with correct classes
        const svg = logoContainer.querySelector('svg');
        expect(svg).toBeInTheDocument();
        expect(svg).toHaveClass('h-8');
        expect(svg).toHaveClass('w-8');
        expect(svg).toHaveClass('text-blue-500');
    });

    it('applies custom className when provided', () => {
        const {container} = render(<Logo className="custom-class"/>);

        const logoContainer = container.firstChild as HTMLElement;
        expect(logoContainer).toHaveClass('custom-class');
        expect(logoContainer).toHaveClass('flex');
        expect(logoContainer).toHaveClass('items-center');
    });

    it('has correct viewBox attribute', () => {
        const {container} = render(<Logo/>);

        const svg = container.querySelector('svg');
        expect(svg).toHaveAttribute('viewBox', '0 0 24 24');
    });

    it('has correct fill attribute', () => {
        const {container} = render(<Logo/>);

        const svg = container.querySelector('svg');
        expect(svg).toHaveAttribute('fill', 'currentColor');
    });

    it('contains the Twitter/X logo path', () => {
        const {container} = render(<Logo/>);

        const path = container.querySelector('path');
        expect(path).toBeInTheDocument();
        expect(path).toHaveAttribute('d', expect.stringContaining('M23.643 4.937'));
    });
});
