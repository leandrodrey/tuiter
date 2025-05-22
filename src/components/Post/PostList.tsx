import {type JSX} from 'react';
import type {Post} from '../../types/postTypes';
import PostCard from './PostCard';

interface PostListProps {
    posts: Post[];
    onLike: (postId: number) => Promise<void>;
    onAddToFavorites: (author: string, avatarUrl: string) => void;
    postsWithReplies?: { post: Post; replies: Post[] }[];
}

const PostList = ({posts, onLike, onAddToFavorites, postsWithReplies}: PostListProps): JSX.Element => {
    if ((posts && posts.length === 0) && (!postsWithReplies || postsWithReplies.length === 0)) {
        return <p className="text-center text-gray-500 dark:text-gray-400 my-8">No posts available.</p>;
    }

    // If postsWithReplies is provided, use it instead of the flat posts array
    if (postsWithReplies && postsWithReplies.length > 0) {
        return (
            <div className="space-y-4 w-full max-w-2xl mx-auto">
                {postsWithReplies.map(({post, replies}) => (
                    <PostCard
                        key={post.id}
                        post={post}
                        replies={replies}
                        onLike={onLike}
                        onAddToFavorites={onAddToFavorites}
                    />
                ))}
            </div>
        );
    }

    // Fallback to the flat posts array if postsWithReplies is not provided
    return (
        <div className="space-y-4 w-full max-w-2xl mx-auto">
            {posts.map(post => (
                <PostCard
                    key={post.id}
                    post={post}
                    onLike={onLike}
                    onAddToFavorites={onAddToFavorites}
                />
            ))}
        </div>
    );
};

export default PostList;
