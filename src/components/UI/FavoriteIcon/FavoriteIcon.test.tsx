import {render, screen} from '@testing-library/react';
import {describe, it, expect, vi} from 'vitest';
import FavoriteIcon from './FavoriteIcon';

// Mock the PersonIcon and HeartIcon components
vi.mock('../PersonIcon/PersonIcon', () => ({
    default: vi.fn(({isFavorite, className}) => (
        <div
            data-testid="person-icon-mock"
            data-is-favorite={isFavorite}
            className={className}
        />
    ))
}));

vi.mock('../HeartIcon/HeartIcon', () => ({
    default: vi.fn(({isFavorite, isHovered, className}) => (
        <div
            data-testid="heart-icon-mock"
            data-is-favorite={isFavorite}
            data-is-hovered={isHovered}
            className={className}
        />
    ))
}));

describe('FavoriteIcon', () => {
    it('renders correctly with required props', () => {
        render(<FavoriteIcon isFavorite={false}/>);

        // Check if the component renders
        const container = screen.getByTestId('person-icon-mock').parentElement;
        expect(container).toBeInTheDocument();
        expect(container).toHaveClass('relative');
        expect(container).toHaveClass('transition-colors');
        expect(container).toHaveClass('duration-200');
    });

    it('passes isFavorite prop to PersonIcon', () => {
        render(<FavoriteIcon isFavorite={true}/>);

        const personIcon = screen.getByTestId('person-icon-mock');
        expect(personIcon).toHaveAttribute('data-is-favorite', 'true');
    });

    it('passes isFavorite and effectiveIsHovered props to HeartIcon', () => {
        render(<FavoriteIcon isFavorite={false} isHovered={true}/>);

        const heartIcon = screen.getByTestId('heart-icon-mock');
        expect(heartIcon).toHaveAttribute('data-is-favorite', 'false');
        expect(heartIcon).toHaveAttribute('data-is-hovered', 'true');
    });

    it('calculates effectiveIsHovered as false when isFavorite is true', () => {
        render(<FavoriteIcon isFavorite={true} isHovered={true}/>);

        const heartIcon = screen.getByTestId('heart-icon-mock');
        expect(heartIcon).toHaveAttribute('data-is-favorite', 'true');
        expect(heartIcon).toHaveAttribute('data-is-hovered', 'false');
    });

    it('applies custom className when provided', () => {
        render(<FavoriteIcon isFavorite={false} className="custom-class"/>);

        const container = screen.getByTestId('person-icon-mock').parentElement;
        expect(container).toHaveClass('custom-class');
    });

    it('positions HeartIcon correctly with absolute positioning', () => {
        render(<FavoriteIcon isFavorite={false}/>);

        const heartIcon = screen.getByTestId('heart-icon-mock');
        expect(heartIcon).toHaveClass('absolute');
        expect(heartIcon).toHaveClass('top-1/4');
        expect(heartIcon).toHaveClass('right-0');
        expect(heartIcon).toHaveClass('transform');
        expect(heartIcon).toHaveClass('-translate-y-1/2');
    });
});
