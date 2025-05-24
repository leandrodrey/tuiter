import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import CharCount from './CharCount';

describe('CharCount', () => {
  it('renders correctly with character count under limit', () => {
    render(<CharCount charCount={50} maxChars={100} />);
    const charCount = screen.getByText('50/100');
    expect(charCount).toBeInTheDocument();
    expect(charCount.className).toContain('text-gray-400');
    expect(charCount.className).not.toContain('text-red-500');
  });

  it('renders correctly with character count at limit', () => {
    render(<CharCount charCount={100} maxChars={100} />);
    const charCount = screen.getByText('100/100');
    expect(charCount).toBeInTheDocument();
    expect(charCount.className).toContain('text-gray-400');
    expect(charCount.className).not.toContain('text-red-500');
  });

  it('renders correctly with character count over limit', () => {
    render(<CharCount charCount={110} maxChars={100} />);
    const charCount = screen.getByText('110/100');
    expect(charCount).toBeInTheDocument();
    expect(charCount.className).toContain('text-red-500');
    expect(charCount.className).not.toContain('text-gray-400');
  });

  it('always includes text-sm class', () => {
    render(<CharCount charCount={50} maxChars={100} />);
    const charCount = screen.getByText('50/100');
    expect(charCount.className).toContain('text-sm');
  });
});
