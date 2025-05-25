import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import PostContent from './PostContent';

describe('PostContent', () => {
  it('renders the message correctly', () => {
    const testMessage = 'This is a test message';
    render(<PostContent message={testMessage} />);

    // Check if the message is displayed
    const messageElement = screen.getByText(testMessage);
    expect(messageElement).toBeInTheDocument();
    expect(messageElement).toHaveClass('text-sm');
    expect(messageElement).toHaveClass('text-white');
    expect(messageElement).toHaveClass('whitespace-pre-wrap');
  });

  it('applies the correct styling', () => {
    render(<PostContent message="Test" />);

    // Check if the container has the correct classes
    const container = screen.getByText('Test').parentElement;
    expect(container).toHaveClass('pl-10');
    expect(container).toHaveClass('sm:pl-12');
    expect(container).toHaveClass('md:pl-16');
    expect(container).toHaveClass('pr-2');
    expect(container).toHaveClass('sm:pr-4');
  });

  it('handles long messages with proper wrapping', () => {
    const longMessage = 'This is a very long message that should be wrapped properly when displayed in the component. It contains multiple words and should demonstrate the text wrapping behavior.';
    render(<PostContent message={longMessage} />);

    const messageElement = screen.getByText(longMessage);
    expect(messageElement).toHaveClass('break-words');
    expect(messageElement).toHaveClass('whitespace-pre-wrap');
  });
});
