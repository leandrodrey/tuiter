import {type JSX} from 'react';
import type {Post} from '../../../types/postTypes.ts';
import {Avatar} from '../../UI';
import {Link} from 'react-router-dom';

interface PostHeaderReplyProps {
    post: Post;
}

/**
 * PostCardHeaderReply component that displays the header section of a reply post card.
 * Shows the author's avatar, name, username, post date, and a "Reply" label.
 * Used specifically for reply posts to distinguish them from regular posts.
 *
 * @param {Object} props - Component props
 * @param {Post} props.post - The reply post data containing author information and content
 * @returns {JSX.Element} The reply post card header component
 */
const PostCardHeaderReply = ({post}: PostHeaderReplyProps): JSX.Element => {
    return (
        <div className="flex flex-shrink-0 p-3 pb-0">
            <Link to="#" className="flex-shrink-0 group block">
                <div className="flex items-center">
                    <div>
                        <Avatar username={post.author} avatarUrl={post.avatar_url} size="sm"/>
                    </div>
                    <div className="ml-2">
                        <p className="text-sm leading-6 font-medium text-white">
                            {post.author}
                            <span className="ml-1 text-xs leading-5 font-medium text-gray-400 group-hover:text-gray-300 transition ease-in-out duration-150">
                                @{post.author.replace(/\s+/g, '')} · {new Date(post.date).toLocaleDateString()}
                            </span>
                            <span className="ml-1 text-xs text-blue-400">
                                Reply
                            </span>
                        </p>
                    </div>
                </div>
            </Link>
        </div>
    );
};

export default PostCardHeaderReply;
