import {render, screen} from '@testing-library/react';
import {describe, it, expect} from 'vitest';
import {MemoryRouter} from 'react-router-dom';
import RegistrationLink from './RegistrationLink';

describe('RegistrationLink', () => {
    it('renders correctly', () => {
        render(
            <MemoryRouter>
                <RegistrationLink/>
            </MemoryRouter>
        );

        // Check if the container div is rendered
        const container = screen.getByText('¿No tienes cuenta?').parentElement;
        expect(container).toBeInTheDocument();
        expect(container).toHaveClass('flex');
        expect(container).toHaveClass('items-center');
        expect(container).toHaveClass('justify-center');
        expect(container).toHaveClass('mt-3');
        expect(container).toHaveClass('sm:mt-4');
    });

    it('renders the prompt text', () => {
        render(
            <MemoryRouter>
                <RegistrationLink/>
            </MemoryRouter>
        );

        const promptText = screen.getByText('¿No tienes cuenta?');
        expect(promptText).toBeInTheDocument();
        expect(promptText).toHaveClass('text-gray-500');
        expect(promptText).toHaveClass('text-xs');
        expect(promptText).toHaveClass('sm:text-sm');
    });

    it('renders the registration link', () => {
        render(
            <MemoryRouter>
                <RegistrationLink/>
            </MemoryRouter>
        );

        const link = screen.getByText('Regístrate');
        expect(link).toBeInTheDocument();
        expect(link).toHaveClass('font-semibold');
        expect(link).toHaveClass('text-blue-500');
        expect(link).toHaveClass('ml-1');
        expect(link).toHaveClass('sm:ml-2');
        expect(link).toHaveClass('text-xs');
        expect(link).toHaveClass('sm:text-sm');
        expect(link).toHaveClass('hover:underline');
        expect(link).toHaveAttribute('href', '/users/register');
    });

    it('has the correct link destination', () => {
        render(
            <MemoryRouter>
                <RegistrationLink/>
            </MemoryRouter>
        );

        const link = screen.getByText('Regístrate');
        expect(link).toHaveAttribute('href', '/users/register');
    });
});
