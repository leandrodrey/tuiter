import {type JSX} from 'react';
import type {Post} from '../../../types/postTypes.ts';
import {FavoriteButton, Avatar} from '../../UI';
import {Link} from 'react-router-dom';

interface PostHeaderProps {
    post: Post;
    onAddToFavorites: (author: string, avatarUrl: string) => void;
}

const PostHeader = ({post, onAddToFavorites}: PostHeaderProps): JSX.Element => {
    return (
        <div className="flex flex-shrink-0 p-2 sm:p-4 pb-0">
            <Link to="#" className="flex-shrink-0 group block">
                <div className="flex items-center">
                    <div>
                        <Avatar username={post.author} avatarUrl={post.avatar_url} size="md"/>
                    </div>
                    <div className="ml-2 sm:ml-3">
                        <p className="text-base sm:text-xl leading-6 font-medium text-white flex flex-wrap items-center">
                            <span className="mr-1">{post.author}</span>
                            <span className="text-xs sm:text-sm leading-5 font-medium text-gray-400 group-hover:text-gray-300 transition ease-in-out duration-150">
                                @{post.author.replace(/\s+/g, '')} · {new Date(post.date).toLocaleDateString()}
                            </span>
                        </p>
                    </div>
                </div>
            </Link>
            <div className="ml-auto">
                <FavoriteButton
                    author={post.author}
                    avatarUrl={post.avatar_url}
                    onAddToFavorites={onAddToFavorites}
                />
            </div>
        </div>
    );
};

export default PostHeader;
