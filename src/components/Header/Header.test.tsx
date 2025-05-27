import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Header from './Header';

// Mock the useOnClickOutside hook
vi.mock('../../hooks/useOnClickOutside', () => ({
  useOnClickOutside: vi.fn()
}));

// Mock the ToggleMenu component
vi.mock('../SideNav', () => ({
  ToggleMenu: vi.fn(({ collapsed }) => (
    <div data-testid="mock-toggle-menu" data-collapsed={collapsed}>
      Toggle Menu Mock
    </div>
  ))
}));

// Mock the MenuIcon component
vi.mock('../UI', () => ({
  MenuIcon: vi.fn(({ className }) => (
    <div data-testid="mock-menu-icon" className={className}>
      Menu Icon
    </div>
  ))
}));

describe('Header', () => {
  it('renders correctly with default state', () => {
    render(<Header />);

    // Check if the header is rendered
    const header = screen.getByRole('banner');
    expect(header).toBeInTheDocument();
    expect(header).toHaveClass('text-white');
    expect(header).toHaveClass('h-auto');
    expect(header).toHaveClass('z-50');

    // Check if the toggle button is rendered
    const toggleButton = screen.getByRole('button');
    expect(toggleButton).toBeInTheDocument();
    expect(toggleButton).toHaveAttribute('aria-label', 'Collapse menu');

    // Check if the menu icon is rendered
    const menuIcon = screen.getByTestId('mock-menu-icon');
    expect(menuIcon).toBeInTheDocument();
    expect(menuIcon).toHaveClass('h-6');
    expect(menuIcon).toHaveClass('w-6');
    expect(menuIcon).toHaveClass('text-white');

    // Check if the ToggleMenu is rendered with collapsed=false
    const toggleMenu = screen.getByTestId('mock-toggle-menu');
    expect(toggleMenu).toBeInTheDocument();
    expect(toggleMenu).toHaveAttribute('data-collapsed', 'false');
  });

  it('toggles the collapsed state when the button is clicked', () => {
    render(<Header />);

    // Get the toggle button
    const toggleButton = screen.getByRole('button');

    // Initially, the menu should not be collapsed
    let toggleMenu = screen.getByTestId('mock-toggle-menu');
    expect(toggleMenu).toHaveAttribute('data-collapsed', 'false');
    expect(toggleButton).toHaveAttribute('aria-label', 'Collapse menu');

    // Click the toggle button
    fireEvent.click(toggleButton);

    // After clicking, the menu should be collapsed
    toggleMenu = screen.getByTestId('mock-toggle-menu');
    expect(toggleMenu).toHaveAttribute('data-collapsed', 'true');
    expect(toggleButton).toHaveAttribute('aria-label', 'Expand menu');

    // Click the toggle button again
    fireEvent.click(toggleButton);

    // After clicking again, the menu should be expanded
    toggleMenu = screen.getByTestId('mock-toggle-menu');
    expect(toggleMenu).toHaveAttribute('data-collapsed', 'false');
    expect(toggleButton).toHaveAttribute('aria-label', 'Collapse menu');
  });

});
