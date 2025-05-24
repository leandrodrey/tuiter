import {render, screen} from '@testing-library/react';
import {describe, it, expect, vi} from 'vitest';
import NavLink from './NavLink';

// Mock the Link component from react-router-dom
vi.mock('react-router-dom', () => ({
    Link: vi.fn(({to, className, children}) => (
        <a
            href={to}
            className={className}
            data-testid="mock-link"
        >
            {children}
        </a>
    ))
}));

describe('NavLink', () => {
    it('renders correctly with required props when active', () => {
        render(<NavLink to="/home" isActive={true}>Home</NavLink>);

        // Check if the link is rendered
        const link = screen.getByTestId('mock-link');
        expect(link).toBeInTheDocument();
        expect(link).toHaveAttribute('href', '/home');
        expect(link).toHaveTextContent('Home');

        // Check active classes
        expect(link).toHaveClass('text-blue-500');
        expect(link).toHaveClass('bg-blue-50');
        expect(link).toHaveClass('dark:bg-blue-900/20');
        expect(link).not.toHaveClass('text-gray-700');
        expect(link).not.toHaveClass('hover:bg-gray-100');
    });

    it('renders correctly with required props when not active', () => {
        render(<NavLink to="/home" isActive={false}>Home</NavLink>);

        // Check if the link is rendered
        const link = screen.getByTestId('mock-link');
        expect(link).toBeInTheDocument();
        expect(link).toHaveAttribute('href', '/home');
        expect(link).toHaveTextContent('Home');

        // Check inactive classes
        expect(link).toHaveClass('text-gray-700');
        expect(link).toHaveClass('hover:bg-gray-100');
        expect(link).toHaveClass('dark:text-gray-300');
        expect(link).toHaveClass('dark:hover:bg-gray-800');
        expect(link).not.toHaveClass('text-blue-500');
        expect(link).not.toHaveClass('bg-blue-50');
    });

    it('applies custom className when provided', () => {
        render(<NavLink to="/home" isActive={false} className="custom-class">Home</NavLink>);

        const link = screen.getByTestId('mock-link');
        expect(link).toHaveClass('custom-class');
    });

    it('renders children correctly', () => {
        render(
            <NavLink to="/home" isActive={false}>
                <span data-testid="child-element">Child Content</span>
            </NavLink>
        );

        const childElement = screen.getByTestId('child-element');
        expect(childElement).toBeInTheDocument();
        expect(childElement).toHaveTextContent('Child Content');
    });

    it('has common classes regardless of active state', () => {
        render(<NavLink to="/home" isActive={true}>Home</NavLink>);

        const link = screen.getByTestId('mock-link');
        expect(link).toHaveClass('px-3');
        expect(link).toHaveClass('py-2');
        expect(link).toHaveClass('text-sm');
        expect(link).toHaveClass('font-medium');
        expect(link).toHaveClass('rounded-full');
        expect(link).toHaveClass('transition-colors');
    });
});
