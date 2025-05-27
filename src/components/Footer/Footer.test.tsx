import {render, screen} from '@testing-library/react';
import {describe, it, expect, vi} from 'vitest';
import '@testing-library/jest-dom';
import Footer from './Footer';

// Mock the components used in Footer
vi.mock('../UI', () => ({
    TuiterLogo: ({className}) => <div data-testid="tuiter-logo" className={className}>Tuiter Logo</div>
}));

vi.mock('./Copyright', () => ({
    default: () => <div data-testid="copyright-mock">Copyright Mock</div>
}));

describe('Footer', () => {
    it('renders correctly with all components', () => {
        render(<Footer/>);

        // Check if the footer element is rendered
        const footer = screen.getByRole('contentinfo');
        expect(footer).toBeInTheDocument();
        expect(footer).toHaveClass('border-t');
        expect(footer).toHaveClass('border-gray-800');
        expect(footer).toHaveClass('mt-auto');

        // Check if the container div is rendered with correct classes
        const container = screen.getByTestId('footer-container');
        expect(container).toBeInTheDocument();
        expect(container).toHaveClass('max-w-7xl');
        expect(container).toHaveClass('mx-auto');
        expect(container).toHaveClass('px-4');
        expect(container).toHaveClass('sm:px-6');
        expect(container).toHaveClass('lg:px-8');
        expect(container).toHaveClass('py-3');
        expect(container).toHaveClass('sm:py-4');
        expect(container).toHaveClass('text-center');
        expect(container).toHaveClass('text-gray-400');

        // Check if the flex container is rendered
        const flexContainer = screen.getByTestId('footer-flex-container');
        expect(flexContainer).toBeInTheDocument();
        expect(flexContainer).toHaveClass('flex');
        expect(flexContainer).toHaveClass('flex-wrap');
        expect(flexContainer).toHaveClass('justify-center');
        expect(flexContainer).toHaveClass('items-center');
        expect(flexContainer).toHaveClass('mb-1');
        expect(flexContainer).toHaveClass('sm:mb-2');

        // Check if the logo is rendered
        const logo = screen.getByTestId('tuiter-logo');
        expect(logo).toBeInTheDocument();
        expect(logo).toHaveClass('h-5');
        expect(logo).toHaveClass('w-5');
        expect(logo).toHaveClass('sm:h-6');
        expect(logo).toHaveClass('sm:w-6');
        expect(logo).toHaveClass('mr-1');
        expect(logo).toHaveClass('sm:mr-2');
        expect(logo).toHaveClass('text-blue-400');

        // Check if the copyright component is rendered
        const copyright = screen.getByTestId('copyright-mock');
        expect(copyright).toBeInTheDocument();
    });

    it('renders the TuiterLogo with correct classes', () => {
        render(<Footer/>);

        const logo = screen.getByTestId('tuiter-logo');
        expect(logo).toHaveClass('h-5');
        expect(logo).toHaveClass('w-5');
        expect(logo).toHaveClass('sm:h-6');
        expect(logo).toHaveClass('sm:w-6');
        expect(logo).toHaveClass('mr-1');
        expect(logo).toHaveClass('sm:mr-2');
        expect(logo).toHaveClass('text-blue-400');
    });

    it('renders the Copyright component', () => {
        render(<Footer/>);

        const copyright = screen.getByTestId('copyright-mock');
        expect(copyright).toBeInTheDocument();
    });
});
