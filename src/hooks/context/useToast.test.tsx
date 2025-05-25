import { renderHook } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { useToast } from './useToast';
import { ToastContext } from '../../context/ToastContext';

// Mock the ToastContext value
const mockToastContext = {
  success: vi.fn(),
  error: vi.fn(),
  info: vi.fn(),
  warning: vi.fn()
};

// Create a wrapper component that provides the mocked ToastContext
const wrapper = ({ children }) => (
  <ToastContext.Provider value={mockToastContext}>
    {children}
  </ToastContext.Provider>
);

describe('useToast', () => {
  it('returns the toast context when used within ToastProvider', () => {
    // Use renderHook to test the hook
    const { result } = renderHook(() => useToast(), { wrapper });

    // Check if the hook returns the correct context value
    expect(result.current).toEqual(mockToastContext);
    expect(typeof result.current.success).toBe('function');
    expect(typeof result.current.error).toBe('function');
    expect(typeof result.current.info).toBe('function');
    expect(typeof result.current.warning).toBe('function');
  });

  it('throws an error when used outside of ToastProvider', () => {
    // Mock console.error to prevent error output during test
    const originalConsoleError = console.error;
    console.error = vi.fn();

    // Expect the hook to throw an error when used without a provider
    expect(() => {
      renderHook(() => useToast());
    }).toThrow('useToast must be used within a ToastProvider');

    // Restore console.error
    console.error = originalConsoleError;
  });
});
