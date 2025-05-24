import {render} from '@testing-library/react';
import {describe, it, expect} from 'vitest';
import HeartIcon from './HeartIcon';

describe('HeartIcon', () => {
    it('renders correctly with required props', () => {
        render(<HeartIcon isFavorite={false}/>);

        // Check if the SVG is rendered
        const svg = document.querySelector('svg');
        expect(svg).toBeInTheDocument();
        expect(svg).toHaveClass('w-3');
        expect(svg).toHaveClass('h-3');
    });

    it('has periwinkle color when not favorite and not hovered', () => {
        render(<HeartIcon isFavorite={false} isHovered={false}/>);

        const svg = document.querySelector('svg');
        expect(svg).toHaveClass('text-periwinkle');
        expect(svg).not.toHaveClass('text-red-600');
    });

    it('has red color when not favorite but hovered', () => {
        render(<HeartIcon isFavorite={false} isHovered={true}/>);

        const svg = document.querySelector('svg');
        expect(svg).toHaveClass('text-red-600');
        expect(svg).not.toHaveClass('text-periwinkle');
    });

    it('has red color when favorite regardless of hover state', () => {
        render(<HeartIcon isFavorite={true} isHovered={false}/>);

        const svg = document.querySelector('svg');
        expect(svg).toHaveClass('text-red-600');
        expect(svg).not.toHaveClass('text-periwinkle');
    });

    it('has red color when favorite and hovered', () => {
        render(<HeartIcon isFavorite={true} isHovered={true}/>);

        const svg = document.querySelector('svg');
        expect(svg).toHaveClass('text-red-600');
        expect(svg).not.toHaveClass('text-periwinkle');
    });

    it('applies custom className when provided', () => {
        render(<HeartIcon isFavorite={false} className="custom-class"/>);

        const svg = document.querySelector('svg');
        expect(svg).toHaveClass('custom-class');
    });

    it('uses default isHovered value when not provided', () => {
        render(<HeartIcon isFavorite={false}/>);

        const svg = document.querySelector('svg');
        expect(svg).toHaveClass('text-periwinkle');
        expect(svg).not.toHaveClass('text-red-600');
    });
});
