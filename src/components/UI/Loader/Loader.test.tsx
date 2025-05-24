import {render, screen} from '@testing-library/react';
import {describe, it, expect, vi} from 'vitest';
import Loader from './Loader';

// Mock the Spinner component
vi.mock('./Spinner.tsx', () => ({
    default: vi.fn(({size, color}) => (
        <div
            data-testid="spinner-mock"
            data-size={size}
            data-color={color}
        />
    ))
}));

describe('Loader', () => {
    it('renders correctly with default props', () => {
        render(<Loader/>);

        // Check if the container is rendered
        const container = screen.getByTestId('spinner-mock').parentElement;
        expect(container).toBeInTheDocument();
        expect(container).toHaveClass('flex');
        expect(container).toHaveClass('flex-col');
        expect(container).toHaveClass('items-center');
        expect(container).toHaveClass('justify-center');
        expect(container).toHaveClass('p-4');
        expect(container).not.toHaveClass('fixed');

        // Check if the Spinner is rendered with default props
        const spinner = screen.getByTestId('spinner-mock');
        expect(spinner).toHaveAttribute('data-size', 'md');
        expect(spinner).toHaveAttribute('data-color', 'primary');

        // Check if the default text is rendered
        const text = screen.getByText('Loading...');
        expect(text).toBeInTheDocument();
        expect(text).toHaveClass('mt-2');
        expect(text).toHaveClass('text-gray-600');
    });

    it('renders as fullScreen when fullScreen=true', () => {
        render(<Loader fullScreen={true}/>);

        const container = screen.getByTestId('spinner-mock').parentElement;
        expect(container).toHaveClass('fixed');
        expect(container).toHaveClass('inset-0');
        expect(container).toHaveClass('bg-white');
        expect(container).toHaveClass('bg-opacity-80');
        expect(container).toHaveClass('z-50');
        expect(container).not.toHaveClass('p-4');
    });

    it('renders with custom text when provided', () => {
        const customText = 'Custom loading text';
        render(<Loader text={customText}/>);

        const text = screen.getByText(customText);
        expect(text).toBeInTheDocument();
    });

    it('does not render text when text is empty', () => {
        render(<Loader text=""/>);

        const textElements = screen.queryAllByText(/./);
        const hasLoadingText = textElements.some(el =>
            el.textContent === 'Loading...' &&
            !el.className.includes('!absolute') // Exclude the hidden text in Spinner
        );
        expect(hasLoadingText).toBe(false);
    });

    it('passes spinnerSize prop to Spinner', () => {
        render(<Loader spinnerSize="lg"/>);

        const spinner = screen.getByTestId('spinner-mock');
        expect(spinner).toHaveAttribute('data-size', 'lg');
    });

    it('passes spinnerColor prop to Spinner', () => {
        render(<Loader spinnerColor="white"/>);

        const spinner = screen.getByTestId('spinner-mock');
        expect(spinner).toHaveAttribute('data-color', 'white');
    });
});
