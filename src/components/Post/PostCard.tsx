import {type JSX} from 'react';
import type {Post} from '../../types/postTypes';
import PostHeader from './PostHeader';
import PostContent from './PostContent';
import PostActions from './PostActions';

interface PostCardProps {
    post: Post;
    onLike: (postId: string) => Promise<void>;
    onAddToFavorites: (author: string | undefined, avatarUrl: string | undefined) => void;
}

const PostCard = ({post, onLike, onAddToFavorites}: PostCardProps): JSX.Element => {
    return (
        <div className="border border-gray-200 dark:border-gray-800 rounded-lg p-4 mb-4 hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors">
            <PostHeader
                post={post}
                onAddToFavorites={onAddToFavorites}
            />
            <PostContent message={post.message}/>
            <PostActions
                post={post}
                onLike={onLike}
            />
        </div>
    );
};

export default PostCard;
