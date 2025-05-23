import {type ReactNode, type JSX} from 'react';
import {PostReplyProvider} from '../context/PostReplyProvider';

interface PostReplyLayoutProps {
    children: ReactNode;
}

/**
 * Layout component that wraps its children with the PostReplyProvider.
 * Use this layout for routes that need access to post reply data.
 *
 * @param {PostReplyLayoutProps} props - Component props
 * @returns {JSX.Element} Layout component with PostReplyProvider
 */
const PostReplyLayout = ({children}: PostReplyLayoutProps): JSX.Element => {
    return (
        <PostReplyProvider>
            {children}
        </PostReplyProvider>
    );
};

export default PostReplyLayout;
