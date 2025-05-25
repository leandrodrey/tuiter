import { renderHook } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { useFavoriteStatus } from './useFavoriteStatus';
import { FAVORITE_USERS_KEY } from '../../constants/storageConstants';
import { UserContext } from '../../context/UserContext';

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

// Mock addEventListener and removeEventListener
window.addEventListener = vi.fn();
window.removeEventListener = vi.fn();

describe('useFavoriteStatus', () => {
  const userSpecificKey = `${FAVORITE_USERS_KEY}_${mockUserInformation.email}`;
  const testAuthor = 'testuser';

  beforeEach(() => {
    vi.clearAllMocks();
    localStorageMock.clear();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('returns false when the user is not in favorites', () => {
    // Set up localStorage to return an empty array
    localStorageMock.getItem.mockReturnValueOnce('[]');

    // Render the hook with the UserContext provider
    const { result } = renderHook(() => useFavoriteStatus(testAuthor), { wrapper });

    // Check if the hook returns false
    expect(result.current).toBe(false);

    // Check if localStorage.getItem was called with the correct key
    expect(localStorageMock.getItem).toHaveBeenCalledWith(userSpecificKey);
  });

  it('returns true when the user is in favorites', () => {
    // Set up localStorage to return an array with the test user
    localStorageMock.getItem.mockReturnValueOnce(JSON.stringify([{ author: testAuthor }]));

    // Render the hook with the UserContext provider
    const { result } = renderHook(() => useFavoriteStatus(testAuthor), { wrapper });

    // Check if the hook returns true
    expect(result.current).toBe(true);

    // Check if localStorage.getItem was called with the correct key
    expect(localStorageMock.getItem).toHaveBeenCalledWith(userSpecificKey);
  });

  it('adds event listener for storage events', () => {
    // Render the hook with the UserContext provider
    renderHook(() => useFavoriteStatus(testAuthor), { wrapper });

    // Check if addEventListener was called with the correct arguments
    expect(window.addEventListener).toHaveBeenCalledWith('storage', expect.any(Function));
  });

  it('removes event listener on cleanup', () => {
    // Render the hook with the UserContext provider and get the unmount function
    const { unmount } = renderHook(() => useFavoriteStatus(testAuthor), { wrapper });

    // Unmount the hook
    unmount();

    // Check if removeEventListener was called with the correct arguments
    expect(window.removeEventListener).toHaveBeenCalledWith('storage', expect.any(Function));
  });
});
