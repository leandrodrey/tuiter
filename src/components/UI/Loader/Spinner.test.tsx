import {render, screen} from '@testing-library/react';
import {describe, it, expect} from 'vitest';
import Spinner from './Spinner';

describe('Spinner', () => {
    it('renders correctly with default props', () => {
        render(<Spinner/>);

        // Check if the spinner is rendered
        const spinner = screen.getByRole('status');
        expect(spinner).toBeInTheDocument();

        // Check default classes
        expect(spinner).toHaveClass('w-8');
        expect(spinner).toHaveClass('h-8');
        expect(spinner).toHaveClass('text-blue-500');
        expect(spinner).toHaveClass('animate-spin');
    });

    it('renders with small size when size="sm"', () => {
        render(<Spinner size="sm"/>);

        const spinner = screen.getByRole('status');
        expect(spinner).toHaveClass('w-4');
        expect(spinner).toHaveClass('h-4');
        expect(spinner).not.toHaveClass('w-8');
        expect(spinner).not.toHaveClass('h-8');
    });

    it('renders with large size when size="lg"', () => {
        render(<Spinner size="lg"/>);

        const spinner = screen.getByRole('status');
        expect(spinner).toHaveClass('w-12');
        expect(spinner).toHaveClass('h-12');
        expect(spinner).not.toHaveClass('w-8');
        expect(spinner).not.toHaveClass('h-8');
    });

    it('renders with secondary color when color="secondary"', () => {
        render(<Spinner color="secondary"/>);

        const spinner = screen.getByRole('status');
        expect(spinner).toHaveClass('text-gray-500');
        expect(spinner).not.toHaveClass('text-blue-500');
    });

    it('renders with white color when color="white"', () => {
        render(<Spinner color="white"/>);

        const spinner = screen.getByRole('status');
        expect(spinner).toHaveClass('text-white');
        expect(spinner).not.toHaveClass('text-blue-500');
    });

    it('includes visually hidden loading text for accessibility', () => {
        render(<Spinner/>);

        const loadingText = screen.getByText('Loading...');
        expect(loadingText).toBeInTheDocument();
        expect(loadingText).toHaveClass('!absolute');
        expect(loadingText).toHaveClass('!overflow-hidden');
    });
});
