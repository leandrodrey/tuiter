import {renderHook} from '@testing-library/react';
import {describe, it, expect, vi} from 'vitest';
import {usePostContext} from './usePostContext';
import {PostContext} from '../context/PostContext';
import {ReactNode} from 'react';

// Mock context value
const mockContextValue = {
    posts: [],
    loading: false,
    error: null,
    hasMore: true,
    initialLoading: false,
    fetchMorePosts: vi.fn(),
    refreshFeed: vi.fn(),
    handleLikePost: vi.fn(),
    handleAddToFavorites: vi.fn()
};

// Wrapper component with context provider
const wrapper = ({children}: { children: ReactNode }) => (
    <PostContext.Provider value={mockContextValue}>
        {children}
    </PostContext.Provider>
);

describe('usePostContext', () => {
    it('returns the context value when used within a PostProvider', () => {
        const {result} = renderHook(() => usePostContext(), {wrapper});

        expect(result.current).toBe(mockContextValue);
        expect(result.current.posts).toEqual([]);
        expect(result.current.loading).toBe(false);
        expect(result.current.error).toBeNull();
        expect(result.current.hasMore).toBe(true);
        expect(result.current.initialLoading).toBe(false);
        expect(typeof result.current.fetchMorePosts).toBe('function');
        expect(typeof result.current.refreshFeed).toBe('function');
        expect(typeof result.current.handleLikePost).toBe('function');
        expect(typeof result.current.handleAddToFavorites).toBe('function');
    });

    it('throws an error when used outside of a PostProvider', () => {
        // Suppress console.error for this test to avoid noisy output
        const originalConsoleError = console.error;
        console.error = vi.fn();

        expect(() => {
            renderHook(() => usePostContext());
        }).toThrow('usePostContext must be used within a PostProvider');

        // Restore console.error
        console.error = originalConsoleError;
    });
});
