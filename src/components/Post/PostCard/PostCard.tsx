import {type JSX} from 'react';
import type {Post} from '../../../types/postTypes.ts';
import PostCardHeader from '../PostCardHeader/PostCardHeader.tsx';
import PostContent from '../../PostContent/PostContent.tsx';
import {usePostContext} from "../../../pages/FeedPage/hooks/usePostContext.ts";
import PostActions from "../../PostActions/PostActions.tsx";

interface PostCardProps {
    post: Post;
}

/**
 * Component that renders a post card with its content and actions.
 * Uses the PostContext for interaction handlers if available, otherwise uses props.
 * This allows the component to be used both within and outside of a PostProvider context.
 *
 * @param {PostCardProps} props - Component props
 * @returns {JSX.Element} The post card component
 */
const PostCard = ({post}: PostCardProps): JSX.Element => {
    const {handleLikePost, handleAddToFavorites} = usePostContext();

    return (
        <article className="hover:bg-gray-800 transition duration-350 ease-in-out border-b border-gray-800">
            <PostCardHeader
                post={post}
                onAddToFavorites={handleAddToFavorites}
            />

            <PostContent message={post.message}/>

            <PostActions
                post={post}
                onLike={handleLikePost}
            />
        </article>
    );
};

export default PostCard;
