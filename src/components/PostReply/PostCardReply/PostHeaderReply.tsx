import {type JSX} from 'react';
import type {Post} from '../../../types/postTypes.ts';
import {Avatar} from '../../UI';
import {Link} from 'react-router-dom';

interface PostHeaderReplyProps {
    post: Post;
}

const PostHeaderReply = ({post}: PostHeaderReplyProps): JSX.Element => {
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

export default PostHeaderReply;
