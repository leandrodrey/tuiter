import {render, screen, fireEvent} from '@testing-library/react';
import {describe, it, expect, vi, beforeEach} from 'vitest';
import FavoriteButton from './FavoriteButton';

// Define the type for the hook return value
type UseFavoriteButtonReturn = {
    isFavorite: boolean;
    isHovered: boolean;
    handleClick: () => void;
    handleMouseEnter: () => void;
    handleMouseLeave: () => void;
};

// Import the hook first so we can get its type
import {useFavoriteButton} from '../../../hooks/favorites/useFavoriteButton';

// Mock the useFavoriteButton hook
vi.mock('../../../hooks/favorites/useFavoriteButton', () => ({
    useFavoriteButton: vi.fn()
}));

// Get the mocked hook with proper typing
// Using a more specific type that matches the structure of the mocked function
type MockFunction = {
    mockReturnValue: (value: UseFavoriteButtonReturn) => void;
};
const mockedUseFavoriteButton = useFavoriteButton as unknown as MockFunction;

describe('FavoriteButton', () => {
    // Default props for testing
    const defaultProps = {
        author: 'testuser',
        avatarUrl: 'https://example.com/avatar.jpg',
        onAddToFavorites: vi.fn()
    };

    // Reset mocks before each test
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('renders correctly with required props when not a favorite', () => {
        // Mock the hook to return not a favorite
        const mockHook: UseFavoriteButtonReturn = {
            isFavorite: false,
            isHovered: false,
            handleClick: vi.fn(),
            handleMouseEnter: vi.fn(),
            handleMouseLeave: vi.fn()
        };
        mockedUseFavoriteButton.mockReturnValue(mockHook);

        render(<FavoriteButton {...defaultProps} />);

        // Check if button is rendered
        const button = screen.getByRole('button');
        expect(button).toBeInTheDocument();

        // Check title and aria-label
        expect(button).toHaveAttribute('title', 'Add testuser to favorites');
        expect(button).toHaveAttribute('aria-label', 'Add testuser to favorites');
    });

    it('renders correctly when user is a favorite', () => {
        // Mock the hook to return a favorite
        const mockHook: UseFavoriteButtonReturn = {
            isFavorite: true,
            isHovered: false,
            handleClick: vi.fn(),
            handleMouseEnter: vi.fn(),
            handleMouseLeave: vi.fn()
        };
        mockedUseFavoriteButton.mockReturnValue(mockHook);

        render(<FavoriteButton {...defaultProps} />);

        // Check title and aria-label
        const button = screen.getByRole('button');
        expect(button).toHaveAttribute('title', 'testuser is in your favorites');
        expect(button).toHaveAttribute('aria-label', 'testuser is in your favorites');
    });

    it('applies custom className when provided', () => {
        // Mock the hook
        const mockHook: UseFavoriteButtonReturn = {
            isFavorite: false,
            isHovered: false,
            handleClick: vi.fn(),
            handleMouseEnter: vi.fn(),
            handleMouseLeave: vi.fn()
        };
        mockedUseFavoriteButton.mockReturnValue(mockHook);

        render(<FavoriteButton {...defaultProps} className="custom-class"/>);

        // Check if custom class is applied
        const button = screen.getByRole('button');
        expect(button.className).toContain('custom-class');
    });

    it('calls handleClick when clicked', () => {
        // Mock the hook with a spy on handleClick
        const handleClick = vi.fn();
        const mockHook: UseFavoriteButtonReturn = {
            isFavorite: false,
            isHovered: false,
            handleClick,
            handleMouseEnter: vi.fn(),
            handleMouseLeave: vi.fn()
        };
        mockedUseFavoriteButton.mockReturnValue(mockHook);

        render(<FavoriteButton {...defaultProps} />);

        // Click the button
        const button = screen.getByRole('button');
        fireEvent.click(button);

        // Check if handleClick was called
        expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('calls handleMouseEnter when mouse enters', () => {
        // Mock the hook with a spy on handleMouseEnter
        const handleMouseEnter = vi.fn();
        const mockHook: UseFavoriteButtonReturn = {
            isFavorite: false,
            isHovered: false,
            handleClick: vi.fn(),
            handleMouseEnter,
            handleMouseLeave: vi.fn()
        };
        mockedUseFavoriteButton.mockReturnValue(mockHook);

        render(<FavoriteButton {...defaultProps} />);

        // Trigger mouse enter
        const button = screen.getByRole('button');
        fireEvent.mouseEnter(button);

        // Check if handleMouseEnter was called
        expect(handleMouseEnter).toHaveBeenCalledTimes(1);
    });

    it('calls handleMouseLeave when mouse leaves', () => {
        // Mock the hook with a spy on handleMouseLeave
        const handleMouseLeave = vi.fn();
        const mockHook: UseFavoriteButtonReturn = {
            isFavorite: false,
            isHovered: false,
            handleClick: vi.fn(),
            handleMouseEnter: vi.fn(),
            handleMouseLeave
        };
        mockedUseFavoriteButton.mockReturnValue(mockHook);

        render(<FavoriteButton {...defaultProps} />);

        // Trigger mouse leave
        const button = screen.getByRole('button');
        fireEvent.mouseLeave(button);

        // Check if handleMouseLeave was called
        expect(handleMouseLeave).toHaveBeenCalledTimes(1);
    });

    it('passes correct props to useFavoriteButton hook', () => {
        // Mock the hook
        const mockHook: UseFavoriteButtonReturn = {
            isFavorite: false,
            isHovered: false,
            handleClick: vi.fn(),
            handleMouseEnter: vi.fn(),
            handleMouseLeave: vi.fn()
        };
        mockedUseFavoriteButton.mockReturnValue(mockHook);

        render(<FavoriteButton {...defaultProps} />);

        // Check if useFavoriteButton was called with correct props
        expect(useFavoriteButton).toHaveBeenCalledWith(
            defaultProps.author,
            defaultProps.avatarUrl,
            defaultProps.onAddToFavorites
        );
    });
});
