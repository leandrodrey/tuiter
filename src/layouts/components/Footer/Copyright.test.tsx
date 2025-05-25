import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Copyright from './Copyright';

describe('Copyright', () => {
  it('renders correctly with default props', () => {
    render(<Copyright />);

    const copyright = screen.getByText(/© \d{4} - Tuiter: A Twitter-like platform/);
    expect(copyright).toBeInTheDocument();
    expect(copyright).toHaveClass('text-xs');
    expect(copyright).toHaveClass('sm:text-sm');
    expect(copyright).toHaveClass('md:text-base');
  });

  it('renders with custom year', () => {
    render(<Copyright year={2023} />);

    const copyright = screen.getByText(/© 2023 - Tuiter: A Twitter-like platform/);
    expect(copyright).toBeInTheDocument();
  });

  it('renders with custom text', () => {
    const customText = 'Custom Copyright Text';
    render(<Copyright text={customText} />);

    const copyright = screen.getByText(new RegExp(`© \\d{4} - ${customText}`));
    expect(copyright).toBeInTheDocument();
  });

  it('renders with custom className', () => {
    const customClass = 'custom-class';
    render(<Copyright className={customClass} />);

    const copyright = screen.getByText(/© \d{4} - Tuiter: A Twitter-like platform/);
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
    render(<Copyright />);

    const copyright = screen.getByText(new RegExp(`© ${currentYear} - `));
    expect(copyright).toBeInTheDocument();
  });
});
