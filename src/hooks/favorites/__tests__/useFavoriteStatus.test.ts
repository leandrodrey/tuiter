import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useFavoriteStatus } from '../useFavoriteStatus';
import { useUser } from '../../context/useUser';
import { FAVORITE_USERS_KEY } from '../../../constants/storageConstants';

// Mock the useUser hook
vi.mock('../../context/useUser', () => ({
  useUser: vi.fn()
}));

describe('useFavoriteStatus', () => {
  // Mock user data
  const mockUser = {
    email: 'test@example.com',
    username: 'testuser'
  };

  // Mock localStorage
  const localStorageMock = (() => {
    let store: Record<string, string> = {};
    return {
      getItem: vi.fn((key: string) => store[key] || null),
      setItem: vi.fn((key: string, value: string) => {
        store[key] = value;
      }),
      clear: vi.fn(() => {
        store = {};
      }),
      removeItem: vi.fn((key: string) => {
        delete store[key];
      }),
      key: vi.fn((index: number) => Object.keys(store)[index] || null),
      length: 0
    };
  })();

  // Setup before each test
  beforeEach(() => {
    // Mock localStorage
    Object.defineProperty(window, 'localStorage', { value: localStorageMock });

    // Reset mocks
    vi.clearAllMocks();

    // Mock useUser to return test user
    (useUser as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      userInformation: mockUser
    });
  });

  // Cleanup after each test
  afterEach(() => {
    localStorageMock.clear();
  });

  it('should return false when user is not in favorites', () => {
    // Setup empty favorites
    localStorageMock.getItem.mockReturnValueOnce('[]');

    // Render the hook
    const { result } = renderHook(() => useFavoriteStatus('otheruser'));

    // Check result
    expect(result.current).toBe(false);
    expect(localStorageMock.getItem).toHaveBeenCalledWith(`${FAVORITE_USERS_KEY}_${mockUser.email}`);
  });

  it('should return true when user is in favorites', () => {
    // Setup favorites with the user
    const favorites = [{ author: 'otheruser', someData: 'data' }];
    localStorageMock.getItem.mockReturnValueOnce(JSON.stringify(favorites));

    // Render the hook
    const { result } = renderHook(() => useFavoriteStatus('otheruser'));

    // Check result
    expect(result.current).toBe(true);
  });

  it('should update when localStorage changes', () => {
    // Setup initial empty favorites
    localStorageMock.getItem.mockReturnValueOnce('[]');

    // Render the hook
    const { result } = renderHook(() => useFavoriteStatus('otheruser'));

    // Initial state should be false
    expect(result.current).toBe(false);

    // Simulate localStorage change
    act(() => {
      // Update mock to return user in favorites
      localStorageMock.getItem.mockReturnValueOnce(JSON.stringify([{ author: 'otheruser' }]));

      // Dispatch storage event
      const storageEvent = new Event('storage') as StorageEvent;
      Object.defineProperty(storageEvent, 'key', {
        value: `${FAVORITE_USERS_KEY}_${mockUser.email}`
      });
      window.dispatchEvent(storageEvent);
    });

    // Now it should be true
    expect(result.current).toBe(true);
  });

  it('should use default key when user is not logged in', () => {
    // Mock useUser to return no user
    (useUser as unknown as ReturnType<typeof vi.fn>).mockReturnValueOnce({
      userInformation: null
    });

    // Setup favorites
    localStorageMock.getItem.mockReturnValueOnce('[]');

    // Render the hook
    renderHook(() => useFavoriteStatus('otheruser'));

    // Check that the default key was used
    expect(localStorageMock.getItem).toHaveBeenCalledWith(FAVORITE_USERS_KEY);
  });
});
