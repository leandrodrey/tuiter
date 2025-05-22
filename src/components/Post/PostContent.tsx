import {type JSX} from 'react';

interface PostContentProps {
    message: string;
}

const PostContent = ({message}: PostContentProps): JSX.Element => {
    return (
        <div className="mb-3">
            <p className="text-gray-800 dark:text-gray-200 whitespace-pre-wrap break-words">{message}</p>
        </div>
    );
};

export default PostContent;
