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
        <div className="post-card">
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
