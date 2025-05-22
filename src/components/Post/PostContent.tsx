import {type JSX} from 'react';

interface PostContentProps {
    message: string;
}

const PostContent = ({message}: PostContentProps): JSX.Element => {
    return (
        <div className="post-content">
            <p>{message}</p>
        </div>
    );
};

export default PostContent;
