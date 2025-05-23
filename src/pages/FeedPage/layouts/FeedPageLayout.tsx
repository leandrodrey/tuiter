import {type ReactNode, type JSX} from 'react';
import {PostProvider} from '../context/PostProvider.tsx';

interface FeedPageLayoutProps {
    children: ReactNode;
}

/**
 * Layout component that wraps its children with the PostProvider.
 * Use this layout for routes that need access to post data.
 *
 * @param {FeedPageLayoutProps} props - Component props
 * @returns {JSX.Element} Layout component with PostProvider
 */
const FeedPageLayout = ({children}: FeedPageLayoutProps): JSX.Element => {
    return (
        <PostProvider>
            {children}
        </PostProvider>
    );
};

export default FeedPageLayout;
