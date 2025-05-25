import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import NotFound from './NotFoundPage';

// Mock the hooks
const mockNavigate = vi.fn();

vi.mock('react-router-dom', () => ({
  useNavigate: vi.fn(() => mockNavigate)
}));

// Mock the components
vi.mock('../../components/UI', () => ({
  TuiterLogo: ({ className }) => (
    <div data-testid="tuiter-logo" className={className}>
      Tuiter Logo
    </div>
  ),
  SubmitButton: ({ onClick, type, className, children }) => (
    <button
      data-testid="submit-button"
      onClick={onClick}
      type={type}
      className={className}
    >
      {children}
    </button>
  )
}));

describe('NotFoundPage', () => {
  it('renders correctly with all components', () => {
    render(<NotFound />);

    // Check if the logo is rendered with correct classes
    const logo = screen.getByTestId('tuiter-logo');
    expect(logo).toBeInTheDocument();
    expect(logo).toHaveClass('h-16');
    expect(logo).toHaveClass('w-16');
    expect(logo).toHaveClass('sm:h-20');
    expect(logo).toHaveClass('sm:w-20');
    expect(logo).toHaveClass('mx-auto');
    expect(logo).toHaveClass('mb-6');
    expect(logo).toHaveClass('text-blue-400');

    // Check if the 404 heading is rendered
    const heading = screen.getByText('404');
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveClass('text-9xl');
    expect(heading).toHaveClass('font-bold');
    expect(heading).toHaveClass('text-blue-500');

    // Check if the error messages are rendered
    const errorMessage1 = screen.getByText("This page doesn't exist");
    expect(errorMessage1).toBeInTheDocument();

    const errorMessage2 = screen.getByText("Please check the URL or go back to the homepage.");
    expect(errorMessage2).toBeInTheDocument();

    // Check if the button is rendered
    const button = screen.getByTestId('submit-button');
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent('Back to Home');
  });

  it('navigates to home page when button is clicked', () => {
    render(<NotFound />);

    // Get the button and click it
    const button = screen.getByTestId('submit-button');
    fireEvent.click(button);

    // Verify navigate was called with home route
    expect(mockNavigate).toHaveBeenCalledWith('/');
  });
});
