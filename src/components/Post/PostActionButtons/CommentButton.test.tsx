import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import CommentButton from './CommentButton.tsx';
import { BrowserRouter } from 'react-router-dom';

describe('CommentButton', () => {
  const defaultProps = {
    postId: 1
  };

  it('renders correctly with required props', () => {
    render(
      <BrowserRouter>
        <CommentButton {...defaultProps} />
      </BrowserRouter>
    );

    // Check if the component is rendered with the correct classes
    const container = screen.getByTestId('comment-button-container');
    expect(container).toBeInTheDocument();
    expect(container).toHaveClass('flex-1');
    expect(container).toHaveClass('flex');
    expect(container).toHaveClass('items-center');
    expect(container).toHaveClass('text-xs');
    expect(container).toHaveClass('text-gray-400');
    expect(container).toHaveClass('hover:text-blue-400');
    expect(container).toHaveClass('transition');
    expect(container).toHaveClass('duration-350');
    expect(container).toHaveClass('ease-in-out');

    // Check if the link is rendered correctly
    const link = container.querySelector('a');
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '/posts/1/reply');
    expect(link).toHaveClass('flex');
    expect(link).toHaveClass('items-center');

    // Check if the SVG icon is rendered
    const svg = link.querySelector('svg');
    expect(svg).toBeInTheDocument();
    expect(svg).toHaveClass('w-5');
    expect(svg).toHaveClass('h-5');
    expect(svg).toHaveClass('mr-2');
  });

  it('renders correctly with optional parentId prop', () => {
    const propsWithParentId = {
      ...defaultProps,
      parentId: 2
    };

    render(
      <BrowserRouter>
        <CommentButton {...propsWithParentId} />
      </BrowserRouter>
    );

    // The link should still point to the same URL since parentId doesn't affect the URL in the current implementation
    const container = screen.getByTestId('comment-button-container');
    const link = container.querySelector('a');
    expect(link).toHaveAttribute('href', '/posts/1/reply');
  });
});
