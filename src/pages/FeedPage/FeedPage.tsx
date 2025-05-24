import {type JSX} from 'react';
import PostList from '../../components/Post/PostList';
import {Loader, PageHeader} from '../../components/UI';
import InfiniteScroll from 'react-infinite-scroll-component';
import {usePostContext} from './hooks/usePostContext.ts';

/**
 * FeedPage component that displays the post feed
 * Uses the post context provided by FeedPageLayout
 */
const FeedPage = (): JSX.Element => {
    const {
        posts,
        loading,
        error,
        hasMore,
        fetchMorePosts,
        refreshFeed
    } = usePostContext();

    if (error) {
        return (
            <div className="p-4 text-center">
                <p className="text-red-500 dark:text-red-400 mb-4">{error}</p>
                <button
                    onClick={refreshFeed}
                    className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md transition-colors"
                    disabled={loading}
                >
                    {loading ? 'Retrying...' : 'Retry'}
                </button>
            </div>
        );
    }

    return (
        <div>
            <PageHeader title="Post Feed" subtitle="See what's happening in the community"/>

            <InfiniteScroll
                dataLength={posts.length}
                next={fetchMorePosts}
                hasMore={hasMore}
                loader={
                    <div className="text-center py-4 animate-pulse transition-opacity duration-300 ease-in-out">
                        <Loader text="Loading more posts..." spinnerSize="md" spinnerColor="primary"/>
                    </div>
                }
                endMessage={
                    <p className="text-center text-gray-500 dark:text-gray-400 my-8">
                        <b>You've seen all posts!</b>
                    </p>
                }
                scrollThreshold={0.8}
                className="overflow-hidden"
                style={{scrollBehavior: 'smooth'}}
                pullDownToRefresh
                pullDownToRefreshThreshold={50}
                pullDownToRefreshContent={
                    <h3 className="text-center text-gray-500 dark:text-gray-400 my-4">
                        &#8595; Pull down to refresh
                    </h3>
                }
                releaseToRefreshContent={
                    <h3 className="text-center text-gray-500 dark:text-gray-400 my-4">
                        &#8593; Release to refresh
                    </h3>
                }
                refreshFunction={refreshFeed}
            >
                <PostList />
            </InfiniteScroll>
        </div>
    );
};

export default FeedPage;
