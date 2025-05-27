import {renderHook} from '@testing-library/react';
import {describe, it, expect} from 'vitest';
import {usePostProcessor} from './usePostProcessor';
import type {Post} from '../../types/postTypes';

describe('usePostProcessor', () => {
    // Sample post data for testing
    const parentPost1: Post = {
        id: 1,
        parent_id: 0,
        message: 'Parent post 1',
        author: 'user1',
        created_at: '2023-01-01T00:00:00Z',
        likes: 5,
        liked: false,
        replies_count: 2
    };

    const parentPost2: Post = {
        id: 2,
        parent_id: 0,
        message: 'Parent post 2',
        author: 'user2',
        created_at: '2023-01-02T00:00:00Z',
        likes: 3,
        liked: true,
        replies_count: 1
    };

    const reply1ToPost1: Post = {
        id: 3,
        parent_id: 1,
        message: 'Reply 1 to post 1',
        author: 'user3',
        created_at: '2023-01-01T01:00:00Z',
        likes: 2,
        liked: false,
        replies_count: 0
    };

    const reply2ToPost1: Post = {
        id: 4,
        parent_id: 1,
        message: 'Reply 2 to post 1',
        author: 'user4',
        created_at: '2023-01-01T02:00:00Z',
        likes: 1,
        liked: true,
        replies_count: 0
    };

    const reply1ToPost2: Post = {
        id: 5,
        parent_id: 2,
        message: 'Reply 1 to post 2',
        author: 'user5',
        created_at: '2023-01-02T01:00:00Z',
        likes: 0,
        liked: false,
        replies_count: 0
    };

    const replyToNonExistentPost: Post = {
        id: 6,
        parent_id: 999,
        message: 'Reply to non-existent post',
        author: 'user6',
        created_at: '2023-01-03T00:00:00Z',
        likes: 0,
        liked: false,
        replies_count: 0
    };

    it('returns an empty array when given an empty array', () => {
        // Render the hook
        const {result} = renderHook(() => usePostProcessor());

        // Process an empty array
        const processed = result.current.processPostsResponse([]);

        // Check if the result is an empty array
        expect(processed).toEqual([]);
    });

    it('processes an array with only parent posts (no replies)', () => {
        // Render the hook
        const {result} = renderHook(() => usePostProcessor());

        // Process an array with only parent posts
        const posts = [parentPost1, parentPost2];
        const processed = result.current.processPostsResponse(posts);

        // Check if the result has the correct structure
        expect(processed).toHaveLength(2);

        // Check the first post
        expect(processed[0].post).toEqual(parentPost1);
        expect(processed[0].replies).toEqual([]);
        expect(processed[0].key).toBe('1');

        // Check the second post
        expect(processed[1].post).toEqual(parentPost2);
        expect(processed[1].replies).toEqual([]);
        expect(processed[1].key).toBe('2');
    });

    it('processes an array with parent posts and their replies', () => {
        // Render the hook
        const {result} = renderHook(() => usePostProcessor());

        // Process an array with parent posts and replies
        const posts = [
            parentPost1,
            parentPost2,
            reply1ToPost1,
            reply2ToPost1,
            reply1ToPost2
        ];
        const processed = result.current.processPostsResponse(posts);

        // Check if the result has the correct structure
        expect(processed).toHaveLength(2);

        // Check the first post and its replies
        expect(processed[0].post).toEqual(parentPost1);
        expect(processed[0].replies).toHaveLength(2);
        expect(processed[0].replies).toContainEqual(reply1ToPost1);
        expect(processed[0].replies).toContainEqual(reply2ToPost1);
        expect(processed[0].key).toBe('1');

        // Check the second post and its reply
        expect(processed[1].post).toEqual(parentPost2);
        expect(processed[1].replies).toHaveLength(1);
        expect(processed[1].replies).toContainEqual(reply1ToPost2);
        expect(processed[1].key).toBe('2');
    });

    it('handles replies to non-existent parent posts', () => {
        // Render the hook
        const {result} = renderHook(() => usePostProcessor());

        // Process an array with a reply to a non-existent parent post
        const posts = [
            parentPost1,
            replyToNonExistentPost
        ];
        const processed = result.current.processPostsResponse(posts);

        // Check if the result has the correct structure
        expect(processed).toHaveLength(1);

        // Check the parent post
        expect(processed[0].post).toEqual(parentPost1);
        expect(processed[0].replies).toHaveLength(0);

        // The reply to the non-existent post should not appear in the result
        const allReplies = processed.flatMap(p => p.replies);
        expect(allReplies).not.toContainEqual(replyToNonExistentPost);
    });

    it('processes posts in the correct order', () => {
        // Render the hook
        const {result} = renderHook(() => usePostProcessor());

        // Process an array with posts in a different order
        const posts = [
            reply1ToPost1,
            parentPost2,
            reply1ToPost2,
            parentPost1,
            reply2ToPost1
        ];
        const processed = result.current.processPostsResponse(posts);

        // Check if the result has the correct structure and order
        expect(processed).toHaveLength(2);

        // The order of parent posts should match the order in the input array
        expect(processed[0].post).toEqual(parentPost2);
        expect(processed[1].post).toEqual(parentPost1);

        // Check the replies for the first post
        expect(processed[0].replies).toHaveLength(1);
        expect(processed[0].replies[0]).toEqual(reply1ToPost2);

        // Check the replies for the second post
        expect(processed[1].replies).toHaveLength(2);
        expect(processed[1].replies).toContainEqual(reply1ToPost1);
        expect(processed[1].replies).toContainEqual(reply2ToPost1);
    });
});
