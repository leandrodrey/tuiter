import {type JSX} from 'react';
import type {Post} from '../../types/postTypes';
import PostCard from './PostCard';

/**
 * Interface defining the props for the PostList component.
 */
interface PostListProps {
    /** Array of posts with their associated replies */
    postsWithReplies: { post: Post; replies: Post[] }[];
    /** Function to handle liking a post */
    onLike: (postId: number) => Promise<void>;
    /** Function to add a user to favorites */
    onAddToFavorites: (author: string, avatarUrl: string) => void;
}

/**
 * Component that renders a list of posts with their replies.
 * Displays a message when no posts are available.
 * @param {PostListProps} props - The component props
 * @returns A list of posts or a message indicating no posts are available
 */
const PostList = ({postsWithReplies, onLike, onAddToFavorites}: PostListProps): JSX.Element => {
    if (postsWithReplies.length === 0) {
        return <p className="text-center text-gray-500 dark:text-gray-400 my-8">No posts available.</p>;
    }

    return (
        <div className="space-y-4 w-full max-w-2xl mx-auto">
            {postsWithReplies.map(({post, replies}, index) => (
                <div
                    key={post.id.toString()}
                >
                    <PostCard
                        post={post}
                        replies={replies}
                        onLike={onLike}
                        onAddToFavorites={onAddToFavorites}
                    />
                </div>
            ))}
        </div>
    );
};

export default PostList;
