import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import SubmitButton from './SubmitButton';

describe('SubmitButton', () => {
  it('renders correctly with default props', () => {
    render(<SubmitButton>Submit</SubmitButton>);
    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent('Submit');
    expect(button).not.toBeDisabled();
    expect(button).toHaveAttribute('type', 'submit');
  });

  it('renders with custom className', () => {
    render(<SubmitButton className="custom-class">Submit</SubmitButton>);
    const button = screen.getByRole('button');
    expect(button.className).toContain('custom-class');
  });

  it('can be disabled', () => {
    render(<SubmitButton disabled>Submit</SubmitButton>);
    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
  });

  it('can be a button type instead of submit', () => {
    render(<SubmitButton type="button">Submit</SubmitButton>);
    const button = screen.getByRole('button');
    expect(button).toHaveAttribute('type', 'button');
  });

  it('calls onClick when clicked', () => {
    const handleClick = vi.fn();
    render(<SubmitButton onClick={handleClick}>Submit</SubmitButton>);
    const button = screen.getByRole('button');
    fireEvent.click(button);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('shows loading state when isSubmitting is true', () => {
    render(<SubmitButton isSubmitting>Submit</SubmitButton>);
    const loadingText = screen.getByText('Cargando...');
    expect(loadingText).toBeInTheDocument();
    expect(screen.queryByText('Submit')).not.toBeInTheDocument();
    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
  });

  it('shows custom loading text when provided', () => {
    render(<SubmitButton isSubmitting loadingText="Custom Loading...">Submit</SubmitButton>);
    const loadingText = screen.getByText('Custom Loading...');
    expect(loadingText).toBeInTheDocument();
  });
});
