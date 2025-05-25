import {type JSX} from 'react';

interface PostContentProps {
    message: string;
}

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
