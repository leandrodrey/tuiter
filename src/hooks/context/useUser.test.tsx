import { renderHook } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { useUser } from './useUser';
import { UserContext } from '../../context/UserContext';

// Mock the UserContext value
const mockUserContext = {
  userInformation: {
    id: 1,
    name: 'Test User',
    username: 'testuser',
    email: 'test@example.com',
    avatar_url: 'https://example.com/avatar.jpg'
  },
  updateUserInformation: vi.fn()
};

// Create a wrapper component that provides the mocked UserContext
const wrapper = ({ children }) => (
  <UserContext.Provider value={mockUserContext}>
    {children}
  </UserContext.Provider>
);

describe('useUser', () => {
  it('returns the user context when used within UserProvider', () => {
    // Use renderHook to test the hook
    const { result } = renderHook(() => useUser(), { wrapper });

    // Check if the hook returns the correct context value
    expect(result.current).toEqual(mockUserContext);
    expect(result.current.userInformation).toEqual(mockUserContext.userInformation);
    expect(typeof result.current.updateUserInformation).toBe('function');
  });

  it('throws an error when used outside of UserProvider', () => {
    // Mock console.error to prevent error output during test
    const originalConsoleError = console.error;
    console.error = vi.fn();

    // Expect the hook to throw an error when used without a provider
    expect(() => {
      renderHook(() => useUser());
    }).toThrow('useUser must be used within a UserProvider');

    // Restore console.error
    console.error = originalConsoleError;
  });
});
