import {type JSX} from 'react';
import type {Post} from '../../types/postTypes';
import {Avatar} from '../../components/UI';

interface PostHeaderReplyProps {
    post: Post;
}

const PostHeaderReply = ({post}: PostHeaderReplyProps): JSX.Element => {
    // Styles specific for replies
    const authorTextSize = "text-sm";

    return (
        <div className="flex items-start mb-3">
            <Avatar
                username={post.author}
                avatarUrl={post.avatar_url}
                size="sm"
                className="mr-3"
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
