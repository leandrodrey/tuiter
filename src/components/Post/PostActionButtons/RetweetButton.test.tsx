import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import RetweetButton from './RetweetButton';

describe('RetweetButton', () => {
  const defaultProps = {
    onClick: vi.fn()
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders correctly with required props', () => {
    render(<RetweetButton {...defaultProps} />);

    // Check if the component is rendered
    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass('flex');
    expect(button).toHaveClass('items-center');
    expect(button).toHaveClass('cursor-pointer');

    // Check if the SVG icon is rendered
    const svg = button.querySelector('svg');
    expect(svg).toBeInTheDocument();
    expect(svg).toHaveClass('w-5');
    expect(svg).toHaveClass('h-5');
    expect(svg).toHaveClass('mr-2');
  });

  it('calls onClick when clicked', () => {
    render(<RetweetButton {...defaultProps} />);

    const button = screen.getByRole('button');
    fireEvent.click(button);

    expect(defaultProps.onClick).toHaveBeenCalledTimes(1);
  });

  it('has correct parent container classes', () => {
    const { container } = render(<RetweetButton {...defaultProps} />);

    const parentDiv = container.firstChild as HTMLElement;
    expect(parentDiv).toHaveClass('flex-1');
    expect(parentDiv).toHaveClass('flex');
    expect(parentDiv).toHaveClass('items-center');
    expect(parentDiv).toHaveClass('text-xs');
    expect(parentDiv).toHaveClass('text-gray-400');
    expect(parentDiv).toHaveClass('hover:text-green-400');
    expect(parentDiv).toHaveClass('transition');
    expect(parentDiv).toHaveClass('duration-350');
    expect(parentDiv).toHaveClass('ease-in-out');
  });

  // The RetweetButton component doesn't accept data-testid directly
  // This test is removed as it's not applicable
});
