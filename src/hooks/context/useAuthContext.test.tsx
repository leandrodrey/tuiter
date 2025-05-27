import {renderHook} from '@testing-library/react';
import {describe, it, expect, vi} from 'vitest';
import {useAuthContext} from './useAuthContext';
import {AuthContext} from '../../context/AuthContext';

// Mock the AuthContext value
const mockAuthContext = {
    isAuthenticated: true,
    login: vi.fn(),
    logout: vi.fn(),
    token: 'mock-token'
};

// Create a wrapper component that provides the mocked AuthContext
const wrapper = ({children}) => (
    <AuthContext.Provider value={mockAuthContext}>
        {children}
    </AuthContext.Provider>
);

describe('useAuthContext', () => {
    it('returns the auth context when used within AuthProvider', () => {
        // Use renderHook to test the hook
        const {result} = renderHook(() => useAuthContext(), {wrapper});

        // Check if the hook returns the correct context value
        expect(result.current).toEqual(mockAuthContext);
        expect(result.current.isAuthenticated).toBe(true);
        expect(result.current.token).toBe('mock-token');
        expect(typeof result.current.login).toBe('function');
        expect(typeof result.current.logout).toBe('function');
    });

    it('throws an error when used outside of AuthProvider', () => {
        // Mock console.error to prevent error output during test
        const originalConsoleError = console.error;
        console.error = vi.fn();

        // Expect the hook to throw an error when used without a provider
        expect(() => {
            renderHook(() => useAuthContext());
        }).toThrow('useAuthContext must be used within an AuthProvider');

        // Restore console.error
        console.error = originalConsoleError;
    });
});
