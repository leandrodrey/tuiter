import {type JSX} from 'react';

interface LikeButtonProps {
    onClick: () => void;
    isLiked: boolean;
    likesCount: number;
}

/**
 * Like button component for post actions
 * Displays a heart icon and the number of likes
 * Handles the like/unlike action
 *
 * @param {Object} props - Component props
 * @param {Function} props.onClick - Function to call when the button is clicked
 * @param {boolean} props.isLiked - Whether the post is liked by the current user
 * @param {number} props.likesCount - The number of likes on the post
 * @returns {JSX.Element} The like button component
 */
const LikeButton = ({onClick, isLiked, likesCount}: LikeButtonProps): JSX.Element => {
    return (
        <div className="flex-1 flex items-center text-xs text-gray-400 hover:text-red-600 transition duration-350 ease-in-out">
            <button
                onClick={onClick}
                className={isLiked ? 'flex items-center text-red-600' : 'flex items-center cursor-pointer'}
                title="Like this post"
            >
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 mr-2">
                    <g>
                        <path d="M12 21.638h-.014C9.403 21.59 1.95 14.856 1.95 8.478c0-3.064 2.525-5.754 5.403-5.754 2.29 0 3.83 1.58 4.646 2.73.814-1.148 2.354-2.73 4.645-2.73 2.88 0 5.404 2.69 5.404 5.755 0 6.376-7.454 13.11-10.037 13.157H12zM7.354 4.225c-2.08 0-3.903 1.988-3.903 4.255 0 5.74 7.034 11.596 8.55 11.658 1.518-.062 8.55-5.917 8.55-11.658 0-2.267-1.823-4.255-3.903-4.255-2.528 0-3.94 2.936-3.952 2.965-.23.562-1.156.562-1.387 0-.014-.03-1.425-2.965-3.954-2.965z"></path>
                    </g>
                </svg>
                {likesCount > 0 ? likesCount : ''}
            </button>
        </div>
    );
};

export default LikeButton;
