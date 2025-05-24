import {render} from '@testing-library/react';
import {describe, it, expect} from 'vitest';
import PersonIcon from './PersonIcon';

describe('PersonIcon', () => {
    it('renders correctly with required props', () => {
        render(<PersonIcon isFavorite={false}/>);

        // Check if the SVG is rendered
        const svg = document.querySelector('svg');
        expect(svg).toBeInTheDocument();
        expect(svg).toHaveClass('w-7');
        expect(svg).toHaveClass('h-7');
    });

    it('has periwinkle color when not favorite', () => {
        render(<PersonIcon isFavorite={false}/>);

        const svg = document.querySelector('svg');
        expect(svg).toHaveClass('text-periwinkle');
        expect(svg).not.toHaveClass('text-red-600');
    });

    it('has red color when favorite', () => {
        render(<PersonIcon isFavorite={true}/>);

        const svg = document.querySelector('svg');
        expect(svg).toHaveClass('text-red-600');
        expect(svg).not.toHaveClass('text-periwinkle');
    });

    it('applies custom className when provided', () => {
        render(<PersonIcon isFavorite={false} className="custom-class"/>);

        const svg = document.querySelector('svg');
        expect(svg).toHaveClass('custom-class');
    });

    it('has correct viewBox attribute', () => {
        render(<PersonIcon isFavorite={false}/>);

        const svg = document.querySelector('svg');
        expect(svg).toHaveAttribute('viewBox', '0 0 24 24');
    });

    it('has correct fill attribute', () => {
        render(<PersonIcon isFavorite={false}/>);

        const svg = document.querySelector('svg');
        expect(svg).toHaveAttribute('fill', 'currentColor');
    });
});
