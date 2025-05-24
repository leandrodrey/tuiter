import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import SaveDraftButton from './SaveDraftButton';
import type { PostFormData } from '../../../types/formTypes';

describe('SaveDraftButton', () => {
  // Default props for testing
  const defaultValues: PostFormData = {
    message: 'Test draft message'
  };

  const defaultProps = {
    onClick: vi.fn(),
    values: defaultValues,
    isDisabled: false
  };

  // Reset mocks before each test
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders correctly with required props', () => {
    render(<SaveDraftButton {...defaultProps} />);

    // Check if button is rendered
    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();

    // Check if text is rendered
    expect(screen.getByText('Save')).toBeInTheDocument();

    // Check if SVG icon is rendered
    const svgIcon = document.querySelector('svg');
    expect(svgIcon).toBeInTheDocument();
  });

  it('calls onClick with values when clicked', () => {
    render(<SaveDraftButton {...defaultProps} />);

    // Click the button
    const button = screen.getByRole('button');
    fireEvent.click(button);

    // Check if onClick was called with the correct values
    expect(defaultProps.onClick).toHaveBeenCalledTimes(1);
    expect(defaultProps.onClick).toHaveBeenCalledWith(defaultValues);
  });

  it('is disabled when isDisabled is true', () => {
    render(<SaveDraftButton {...defaultProps} isDisabled={true} />);

    // Check if button is disabled
    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
  });

  it('is not disabled when isDisabled is false', () => {
    render(<SaveDraftButton {...defaultProps} isDisabled={false} />);

    // Check if button is not disabled
    const button = screen.getByRole('button');
    expect(button).not.toBeDisabled();
  });

  it('has correct button type', () => {
    render(<SaveDraftButton {...defaultProps} />);

    // Check if button has type="button"
    const button = screen.getByRole('button');
    expect(button).toHaveAttribute('type', 'button');
  });

  it('has correct classes for styling', () => {
    render(<SaveDraftButton {...defaultProps} />);

    // Check if button has the correct classes
    const button = screen.getByRole('button');
    expect(button.className).toContain('mt-1');
    expect(button.className).toContain('group');
    expect(button.className).toContain('flex');
    expect(button.className).toContain('items-center');
    expect(button.className).toContain('text-blue-400');
    expect(button.className).toContain('hover:bg-gray-800');
    expect(button.className).toContain('hover:text-blue-300');
  });
});
