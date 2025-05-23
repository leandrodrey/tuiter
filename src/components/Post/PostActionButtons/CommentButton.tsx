import {type JSX} from 'react';

interface CommentButtonProps {
    postId: number;
    repliesCount: number;
    parentId?: number;
}

/**
 * Comment button component for post actions
 * Displays a comment icon and the number of replies
 * Links to the reply page for the post
 * Does not display for posts that are already replies (have a parent_id)
 *
 * @param {Object} props - Component props
 * @param {number} props.postId - The ID of the post
 * @param {number} props.repliesCount - The number of replies to the post
 * @param {number} props.parentId - The ID of the parent post, if this post is a reply
 * @returns {JSX.Element} The comment button component
 */
const CommentButton = ({postId, repliesCount, parentId}: CommentButtonProps): JSX.Element => {
    // Don't show the comment button for posts that are already replies
    if (parentId) {
        return <div className="flex-1"></div>;
    }

    return (
        <div className="flex-1 flex items-center text-xs text-gray-400 hover:text-blue-400 transition duration-350 ease-in-out">
            <a href={`/posts/${postId}/reply`} className="flex items-center">
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 mr-2">
                    <g>
                        <path d="M14.046 2.242l-4.148-.01h-.002c-4.374 0-7.8 3.427-7.8 7.802 0 4.098 3.186 7.206 7.465 7.37v3.828c0 .108.044.286.12.403.142.225.384.347.632.347.138 0 .277-.038.402-.118.264-.168 6.473-4.14 8.088-5.506 1.902-1.61 3.04-3.97 3.043-6.312v-.017c-.006-4.367-3.43-7.787-7.8-7.788zm3.787 12.972c-1.134.96-4.862 3.405-6.772 4.643V16.67c0-.414-.335-.75-.75-.75h-.396c-3.66 0-6.318-2.476-6.318-5.886 0-3.534 2.768-6.302 6.3-6.302l4.147.01h.002c3.532 0 6.3 2.766 6.302 6.296-.003 1.91-.942 3.844-2.514 5.176z"></path>
                    </g>
                </svg>
                {repliesCount > 0 ? repliesCount : ''}
            </a>
        </div>
    );
};

export default CommentButton;
