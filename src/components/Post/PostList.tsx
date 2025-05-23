import {type JSX} from 'react';
import type {Post} from '../../types/postTypes';
import PostCard from './PostCard';
import {EmptyMessage} from '../../components/UI';

/**
 * Interface defining the props for the PostList component.
 */
interface PostListProps {
    /** Array of posts with their associated replies */
    posts: { post: Post; replies: Post[] }[];
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
const PostList = ({posts, onLike, onAddToFavorites}: PostListProps): JSX.Element => {
    if (posts.length === 0) {
        return <EmptyMessage />;
    }

    return (
        <div className="space-y-4 w-full max-w-2xl mx-auto">
            {posts.map(({post, replies}) => (
                <div key={post.id}>
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
