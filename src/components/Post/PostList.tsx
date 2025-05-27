import {type JSX} from 'react';
import PostCard from './PostCard/PostCard.tsx';
import {EmptyMessage} from '../../components/UI';
import {usePostContext} from '../../pages/FeedPage/hooks/usePostContext.ts';

/**
 * Component that renders a list of posts with their replies.
 * Displays a message when no posts are available.
 * Uses the PostContext to access posts.
 *
 * @returns A list of posts or a message indicating no posts are available
 */
const PostList = (): JSX.Element => {
    const {posts} = usePostContext();

    if (posts.length === 0) {
        return <EmptyMessage/>;
    }

    return (
        <div className="space-y-4 w-full max-w-2xl mx-auto">
            {posts.map((post) => (
                <div key={post.id}>
                    <PostCard
                        post={post}
                    />
                </div>
            ))}
        </div>
    );
};

export default PostList;
