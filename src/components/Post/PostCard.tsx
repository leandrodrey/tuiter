import {type JSX} from 'react';
import type {Post} from '../../types/postTypes';
import PostActions from './PostActions';
import PostReplies from './PostReplies';
import {Loader, FavoriteButton} from '../../components/UI';
import {usePostReplies} from '../../hooks/post-replies/usePostReplies';

interface PostCardProps {
    post: Post;
    onLike: (postId: number) => Promise<void>;
    onAddToFavorites: (author: string, avatarUrl: string) => void;
    replies?: Post[];
}

const PostCard = ({post, onLike, onAddToFavorites, replies: initialReplies = []}: PostCardProps): JSX.Element => {
    const {
        showReplies,
        replies,
        loadingReplies,
        handleToggleReplies
    } = usePostReplies(post.id, initialReplies);

    return (
        <article className="flex max-w-xl flex-col items-start justify-between border border-gray-200 dark:border-gray-800 rounded-lg p-4 mb-4 hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors duration-300 ease-in-out">
            <div className="flex flex-col sm:flex-row justify-between items-start w-full gap-4 sm:gap-0">
                <div className="flex items-center gap-x-4 text-xs">
                    <time dateTime={post.date} className="text-gray-500">
                        {new Date(post.date).toLocaleDateString()}
                    </time>
                    <a href="#" className="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100">
                        Tuiter
                    </a>
                </div>

                <div className="relative flex items-center gap-x-4">
                    <img
                        src={post.avatar_url}
                        alt={post.author}
                        className="size-10 rounded-full bg-gray-50"
                    />
                    <div className="text-sm/6">
                        <p className="font-semibold text-gray-900 dark:text-white">
                            <a href="#">
                                <span className="absolute inset-0"></span>
                                {post.author}
                            </a>
                        </p>
                        <p className="text-gray-600 dark:text-gray-400">Tuiter User</p>
                    </div>
                    <div className="ml-2">
                        <FavoriteButton
                            author={post.author}
                            avatarUrl={post.avatar_url}
                            onAddToFavorites={onAddToFavorites}
                        />
                    </div>
                </div>
            </div>

            <div className="w-full mt-4">
                <div className="group relative">
                    <p className="line-clamp-3 text-sm/6 text-gray-600 dark:text-gray-200 whitespace-pre-wrap break-words">
                        {post.message}
                    </p>
                </div>
            </div>

            <div className="mt-4 w-full">
                <PostActions
                    post={post}
                    onLike={onLike}
                    onToggleReplies={handleToggleReplies}
                />
            </div>

            {/* Show loading indicator when fetching replies */}
            {loadingReplies && (
                <div className="mt-4 text-center w-full">
                    <Loader text="Loading replies..." spinnerSize="sm" />
                </div>
            )}

            {/* Render replies if they should be shown */}
            {showReplies && replies.length > 0 && (
                <div className="mt-4 w-full">
                    <PostReplies
                        replies={replies}
                        onLike={onLike}
                    />
                </div>
            )}

            {/* Show message when no replies are available */}
            {showReplies && !loadingReplies && replies.length === 0 && (
                <div className="mt-4 text-center text-gray-500 dark:text-gray-400 w-full">
                    <p>No replies yet. Be the first to reply!</p>
                </div>
            )}
        </article>
    );
};

export default PostCard;
