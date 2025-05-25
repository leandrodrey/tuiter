import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { useLogout } from './useLogout';

// Mock the dependencies
const mockLogout = vi.fn();
const mockInfo = vi.fn();

vi.mock('./useAuthContext', () => ({
  useAuthContext: () => ({
    logout: mockLogout
  })
}));

vi.mock('./useToast', () => ({
  useToast: () => ({
    info: mockInfo
  })
}));

describe('useLogout', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('returns a function', () => {
    const { result } = renderHook(() => useLogout());
    expect(typeof result.current).toBe('function');
  });

  it('calls the default logout function and shows a toast when executed', () => {
    // Render the hook
    const { result } = renderHook(() => useLogout());

    // Execute the returned function
    act(() => {
      result.current();
    });

    // Check if the logout function was called
    expect(mockLogout).toHaveBeenCalledTimes(1);

    // Check if the toast was shown
    expect(mockInfo).toHaveBeenCalledTimes(1);
    expect(mockInfo).toHaveBeenCalledWith('You have been logged out successfully');
  });

  it('calls the custom logout function when provided', () => {
    // Create a custom logout function
    const customLogout = vi.fn();

    // Render the hook with the custom logout function
    const { result } = renderHook(() => useLogout(customLogout));

    // Execute the returned function
    act(() => {
      result.current();
    });

    // Check if the custom logout function was called
    expect(customLogout).toHaveBeenCalledTimes(1);

    // Check if the default logout function was not called
    expect(mockLogout).not.toHaveBeenCalled();

    // Check if the toast was shown
    expect(mockInfo).toHaveBeenCalledTimes(1);
    expect(mockInfo).toHaveBeenCalledWith('You have been logged out successfully');
  });
});
