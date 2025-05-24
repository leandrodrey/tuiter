import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import PageHeader from './PageHeader';

describe('PageHeader', () => {
  it('renders with required title prop', () => {
    render(<PageHeader title="Test Title" />);

    // Check if title is rendered
    const titleElement = screen.getByText('Test Title');
    expect(titleElement).toBeInTheDocument();
    expect(titleElement.tagName).toBe('H2');
    expect(titleElement).toHaveClass('text-xl font-semibold text-white');
  });

  it('renders with optional subtitle', () => {
    render(<PageHeader title="Test Title" subtitle="Test Subtitle" />);

    // Check if subtitle is rendered
    const subtitleElement = screen.getByText('Test Subtitle');
    expect(subtitleElement).toBeInTheDocument();
    expect(subtitleElement.tagName).toBe('P');
    expect(subtitleElement).toHaveClass('text-sm text-gray-400');
  });

  it('does not render subtitle when not provided', () => {
    render(<PageHeader title="Test Title" />);

    // Check that subtitle container is not in the document
    const subtitleContainer = screen.queryByTestId('subtitle-container');
    expect(subtitleContainer).not.toBeInTheDocument();
  });

  it('renders children when provided', () => {
    render(
      <PageHeader title="Test Title">
        <div data-testid="test-child">Child Content</div>
      </PageHeader>
    );

    // Check if children are rendered
    const childElement = screen.getByTestId('test-child');
    expect(childElement).toBeInTheDocument();
    expect(childElement).toHaveTextContent('Child Content');
  });

  it('does not render children container when no children provided', () => {
    render(<PageHeader title="Test Title" />);

    // Check that children container is not in the document
    const childrenContainer = screen.queryByTestId('children-container');
    expect(childrenContainer).not.toBeInTheDocument();
  });

  it('applies custom className when provided', () => {
    const { container } = render(<PageHeader title="Test Title" className="custom-class" />);

    // Check if the custom class is applied to the root element
    // The className is applied to the outermost div, which is the first child of the container
    const rootElement = container.firstChild as HTMLElement;
    expect(rootElement).toHaveClass('custom-class');
  });
});
