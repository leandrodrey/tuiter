import {render, screen} from '@testing-library/react';
import {describe, it, expect} from 'vitest';
import Copyright from './Copyright';

describe('Copyright', () => {
    it('renders correctly with default props', () => {
        const defaultText = 'Tuiter: A Twitter-like platform';
        render(<Copyright text={defaultText}/>);

        const copyright = screen.getByText(new RegExp(`© \\d{4} - ${defaultText}`));
        expect(copyright).toBeInTheDocument();
        expect(copyright).toHaveClass('text-xs');
        expect(copyright).toHaveClass('sm:text-sm');
        expect(copyright).toHaveClass('md:text-base');
    });

    it('renders with custom year', () => {
        const defaultText = 'Tuiter: A Twitter-like platform';
        render(<Copyright year={2023} text={defaultText}/>);

        const copyright = screen.getByText(`© 2023 - ${defaultText}`);
        expect(copyright).toBeInTheDocument();
    });

    it('renders with custom text', () => {
        const customText = 'Custom Copyright Text';
        render(<Copyright text={customText}/>);

        const copyright = screen.getByText(new RegExp(`© \\d{4} - ${customText}`));
        expect(copyright).toBeInTheDocument();
    });

    it('renders with custom className', () => {
        const customClass = 'custom-class';
        const defaultText = 'Tuiter: A Twitter-like platform';
        render(<Copyright className={customClass} text={defaultText}/>);

        const copyright = screen.getByText(new RegExp(`© \\d{4} - ${defaultText}`));
        expect(copyright).toHaveClass(customClass);
        expect(copyright).not.toHaveClass('text-xs');
        expect(copyright).not.toHaveClass('sm:text-sm');
        expect(copyright).not.toHaveClass('md:text-base');
    });

    it('renders with all custom props', () => {
        const customYear = 2022;
        const customText = 'All Rights Reserved';
        const customClass = 'text-lg font-bold';

        render(
            <Copyright
                year={customYear}
                text={customText}
                className={customClass}
            />
        );

        const copyright = screen.getByText(`© ${customYear} - ${customText}`);
        expect(copyright).toBeInTheDocument();
        expect(copyright).toHaveClass(customClass);
        expect(copyright).not.toHaveClass('text-xs');
    });

    it('uses current year by default', () => {
        const currentYear = new Date().getFullYear();
        const defaultText = 'Tuiter: A Twitter-like platform';
        render(<Copyright text={defaultText}/>);

        const copyright = screen.getByText(`© ${currentYear} - ${defaultText}`);
        expect(copyright).toBeInTheDocument();
    });
});
