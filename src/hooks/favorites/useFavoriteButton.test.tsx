import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { useFavoriteButton } from './useFavoriteButton';
import { UserContext } from '../../context/UserContext';

// Mock the useFavoriteStatus hook
const mockIsFavorite = vi.fn();
vi.mock('./useFavoriteStatus', () => ({
  useFavoriteStatus: () => mockIsFavorite()
}));

// Mock the UserContext value
const mockUserInformation = {
  email: 'test@example.com'
};

const mockUserContext = {
  userInformation: mockUserInformation,
  updateUserInformation: vi.fn()
};

// Create a wrapper component that provides the mocked UserContext
const wrapper = ({ children }) => (
  <UserContext.Provider value={mockUserContext}>
    {children}
  </UserContext.Provider>
);

// Mock localStorage
const localStorageMock = (() => {
  let store = {};
  return {
    getItem: vi.fn((key) => store[key] || null),
    setItem: vi.fn((key, value) => {
      store[key] = value.toString();
    }),
    clear: vi.fn(() => {
      store = {};
    })
  };
})();

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock
});

describe('useFavoriteButton', () => {
  const testAuthor = 'testuser';
  const testAvatarUrl = 'https://example.com/avatar.jpg';
  const onAddToFavorites = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    localStorageMock.clear();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('initializes with the correct state', () => {
    // Set up the mock to return false (not a favorite)
    mockIsFavorite.mockReturnValue(false);

    // Render the hook with the UserContext provider
    const { result } = renderHook(() =>
      useFavoriteButton(testAuthor, testAvatarUrl, onAddToFavorites),
      { wrapper }
    );

    // Check initial state
    expect(result.current.isFavorite).toBe(false);
    expect(result.current.isHovered).toBe(false);
    expect(typeof result.current.handleClick).toBe('function');
    expect(typeof result.current.handleMouseEnter).toBe('function');
    expect(typeof result.current.handleMouseLeave).toBe('function');
  });

  it('updates isFavorite when useFavoriteStatus changes', () => {
    // First render with isFavorite = false
    mockIsFavorite.mockReturnValue(false);

    const { result, rerender } = renderHook(() =>
      useFavoriteButton(testAuthor, testAvatarUrl, onAddToFavorites),
      { wrapper }
    );

    expect(result.current.isFavorite).toBe(false);

    // Update the mock to return true and rerender
    mockIsFavorite.mockReturnValue(true);
    rerender();

    expect(result.current.isFavorite).toBe(true);
  });

  it('updates isHovered state on mouse enter and leave', () => {
    mockIsFavorite.mockReturnValue(false);

    const { result } = renderHook(() =>
      useFavoriteButton(testAuthor, testAvatarUrl, onAddToFavorites),
      { wrapper }
    );

    // Initial state
    expect(result.current.isHovered).toBe(false);

    // Mouse enter
    act(() => {
      result.current.handleMouseEnter();
    });
    expect(result.current.isHovered).toBe(true);

    // Mouse leave
    act(() => {
      result.current.handleMouseLeave();
    });
    expect(result.current.isHovered).toBe(false);
  });

  it('calls onAddToFavorites when handleClick is called', () => {
    mockIsFavorite.mockReturnValue(false);

    // Set up localStorage to return an empty array
    localStorageMock.getItem.mockReturnValue('[]');

    const { result } = renderHook(() =>
      useFavoriteButton(testAuthor, testAvatarUrl, onAddToFavorites),
      { wrapper }
    );

    // Call handleClick
    act(() => {
      result.current.handleClick();
    });

    // Check if onAddToFavorites was called with the correct arguments
    expect(onAddToFavorites).toHaveBeenCalledWith(testAuthor, testAvatarUrl);

    // Check if isFavorite was updated
    expect(result.current.isFavorite).toBe(true);
  });

  it('updates isFavorite to true when the user is already in favorites', () => {
    mockIsFavorite.mockReturnValue(true);

    // Set up localStorage to return an array with the test user
    localStorageMock.getItem.mockReturnValue(JSON.stringify([{ author: testAuthor }]));

    const { result } = renderHook(() =>
      useFavoriteButton(testAuthor, testAvatarUrl, onAddToFavorites),
      { wrapper }
    );

    // Call handleClick
    act(() => {
      result.current.handleClick();
    });

    // Check if isFavorite remains true
    expect(result.current.isFavorite).toBe(true);
  });
});
