import {type JSX} from 'react';

interface PostContentProps {
    message: string;
}

/**
 * PostContent component that displays the content of a post.
 * Renders the message with appropriate styling for readability.
 *
 * @param {Object} props - Component props
 * @param {string} props.message - The text content of the post to display
 * @returns {JSX.Element} The post content component
 */
const PostContent = ({message}: PostContentProps): JSX.Element => {
    return (
        <div className="pl-10 sm:pl-12 md:pl-16 pr-2 sm:pr-4">
            <p className="text-sm sm:text-base width-auto font-medium text-white flex-shrink whitespace-pre-wrap break-words">
                {message}
            </p>
        </div>
    );
};

export default PostContent;
