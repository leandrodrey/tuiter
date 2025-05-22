import {type JSX} from 'react';
import type {Post} from '../../types/postTypes';

interface PostHeaderReplyProps {
    post: Post;
}

const PostHeaderReply = ({post}: PostHeaderReplyProps): JSX.Element => {
    // Styles specific for replies
    const avatarSize = "w-8 h-8";
    const authorTextSize = "text-sm";

    return (
        <div className="flex items-start mb-3">
            <img
                src={post.avatar_url}
                alt={`${post.author}'s avatar`}
                className={`${avatarSize} rounded-full mr-3`}
            />
            <div className="flex-1">
                <div className="flex items-center">
                    <h3 className={`${authorTextSize} text-gray-900 dark:text-white`}>{post.author}</h3>
                    <span className="text-sm text-gray-500 ml-2">
                        {new Date(post.date).toLocaleString()}
                    </span>
                    <span className="text-xs text-blue-500 ml-2">
                        Reply
                    </span>
                </div>
            </div>
            {/* No "Add to Favorites" button for replies */}
        </div>
    );
};

export default PostHeaderReply;
