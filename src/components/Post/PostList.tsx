import {type JSX} from 'react';
import type {Post} from '../../types/postTypes';
import PostCard from './PostCard';

interface PostListProps {
    postsWithReplies: { post: Post; replies: Post[] }[];
    onLike: (postId: number) => Promise<void>;
    onAddToFavorites: (author: string, avatarUrl: string) => void;
}

const PostList = ({postsWithReplies, onLike, onAddToFavorites}: PostListProps): JSX.Element => {
    if (postsWithReplies.length === 0) {
        return <p className="text-center text-gray-500 dark:text-gray-400 my-8">No posts available.</p>;
    }

    return (
        <div className="space-y-4 w-full max-w-2xl mx-auto">
            {postsWithReplies.map(({post, replies}, index) => (
                <div
                    key={post.id}
                    className="animate-fadeIn transition-all duration-300 ease-in-out"
                    style={{animationDelay: `${index * 100}ms`}}
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
