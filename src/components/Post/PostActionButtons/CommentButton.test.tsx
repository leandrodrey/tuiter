import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import CommentButton from './CommentButton';

describe('CommentButton', () => {
  const defaultProps = {
    postId: 1,
    repliesCount: 5
  };

  it('renders correctly with required props', () => {
    render(<CommentButton {...defaultProps} />);

    // Check if the component is rendered
    const container = screen.getByRole('link');
    expect(container).toBeInTheDocument();
    expect(container).toHaveAttribute('href', '/posts/1/reply');
    expect(container).toHaveClass('flex');
    expect(container).toHaveClass('items-center');

    // Check if the SVG icon is rendered
    const svg = container.querySelector('svg');
    expect(svg).toBeInTheDocument();
    expect(svg).toHaveClass('w-5');
    expect(svg).toHaveClass('h-5');
    expect(svg).toHaveClass('mr-2');

    // Check if the replies count is displayed
    expect(container).toHaveTextContent('5');
  });

  it('does not display replies count when it is 0', () => {
    render(<CommentButton postId={1} repliesCount={0} />);

    const container = screen.getByRole('link');
    expect(container).toHaveTextContent('');
  });

  it('renders an empty div when parentId is provided', () => {
    const { container } = render(
      <CommentButton postId={1} repliesCount={5} parentId={2} />
    );

    // Check if an empty div is rendered
    const emptyDiv = container.querySelector('div');
    expect(emptyDiv).toBeInTheDocument();
    expect(emptyDiv).toHaveClass('flex-1');
    expect(emptyDiv).toBeEmptyDOMElement();

    // Check that the link is not rendered
    const link = container.querySelector('a');
    expect(link).not.toBeInTheDocument();
  });

  // The CommentButton component doesn't accept data-testid directly
  // This test is removed as it's not applicable
});
