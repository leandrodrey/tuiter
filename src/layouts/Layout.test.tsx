import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Layout from './Layout';

// Mock the components used in Layout
vi.mock('./components/Header/Header.tsx', () => ({
  default: () => <div data-testid="header-mock">Header Mock</div>
}));

vi.mock('./components/Main/Main.tsx', () => ({
  default: ({ children }) => <div data-testid="main-mock">{children}</div>
}));

vi.mock('./components/Footer/Footer.tsx', () => ({
  default: () => <div data-testid="footer-mock">Footer Mock</div>
}));

describe('Layout', () => {
  it('renders correctly with children', () => {
    render(
      <Layout>
        <div data-testid="test-children">Test Children</div>
      </Layout>
    );

    // Check if the layout container is rendered with the correct classes
    const layoutContainer = screen.getByTestId('layout-container');
    expect(layoutContainer).toBeInTheDocument();
    expect(layoutContainer).toHaveClass('min-h-screen');
    expect(layoutContainer).toHaveClass('flex');
    expect(layoutContainer).toHaveClass('flex-col');
    expect(layoutContainer).toHaveClass('bg-[#15202b]');

    // Check if the header is rendered
    const header = screen.getByTestId('header-mock');
    expect(header).toBeInTheDocument();

    // Check if the main content is rendered
    const main = screen.getByTestId('main-mock');
    expect(main).toBeInTheDocument();

    // Check if the children are rendered inside the main content
    const children = screen.getByTestId('test-children');
    expect(children).toBeInTheDocument();
    expect(main).toContainElement(children);

    // Check if the footer is rendered
    const footer = screen.getByTestId('footer-mock');
    expect(footer).toBeInTheDocument();
  });

  it('passes children to Main component', () => {
    render(
      <Layout>
        <div data-testid="test-children">Test Children</div>
      </Layout>
    );

    const main = screen.getByTestId('main-mock');
    const children = screen.getByTestId('test-children');
    expect(main).toContainElement(children);
  });
});
