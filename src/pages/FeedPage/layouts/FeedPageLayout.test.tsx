import {render, screen} from '@testing-library/react';
import {describe, it, expect, vi} from 'vitest';
import FeedPageLayout from './FeedPageLayout';

// Mock the PostProvider component
vi.mock('../context/PostProvider', () => ({
    PostProvider: ({children}) => (
        <div data-testid="mock-post-provider">{children}</div>
    )
}));

describe('FeedPageLayout', () => {
    it('renders children wrapped in PostProvider', () => {
        render(
            <FeedPageLayout>
                <div data-testid="test-child">Test Child Content</div>
            </FeedPageLayout>
        );

        // Check if the PostProvider is rendered
        const postProvider = screen.getByTestId('mock-post-provider');
        expect(postProvider).toBeInTheDocument();

        // Check if the children are rendered inside the PostProvider
        const childElement = screen.getByTestId('test-child');
        expect(childElement).toBeInTheDocument();
        expect(childElement).toHaveTextContent('Test Child Content');
        expect(postProvider).toContainElement(childElement);
    });

    it('passes children correctly to PostProvider', () => {
        render(
            <FeedPageLayout>
                <div>First Child</div>
                <div>Second Child</div>
            </FeedPageLayout>
        );

        const postProvider = screen.getByTestId('mock-post-provider');
        expect(postProvider).toHaveTextContent('First Child');
        expect(postProvider).toHaveTextContent('Second Child');
    });
});
