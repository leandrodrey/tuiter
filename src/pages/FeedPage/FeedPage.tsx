import {type JSX} from 'react';
import PostList from '../../components/Post/PostList';
import Loader from '../../components/UI/Loader';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useFeedPosts } from '../../hooks/feed/useFeedPosts.ts';
import { usePostInteractions } from '../../hooks/feed/usePostInteractions.ts';

const FeedPage = (): JSX.Element => {

    const {
        postsWithReplies,
        setPostsWithReplies,
        loading,
        error,
        hasMore,
        initialLoading,
        fetchMorePosts,
        refreshFeed
    } = useFeedPosts();

    const {
        handleLikePost,
        handleAddToFavorites
    } = usePostInteractions(postsWithReplies, setPostsWithReplies);

    if (initialLoading) return <Loader text="Loading posts..." fullScreen={true}/>;

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
            <h1 className="text-3xl font-bold text-center mb-8 text-gray-900 dark:text-white">Post Feed</h1>

            <InfiniteScroll
                dataLength={postsWithReplies.length}
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
                style={{ scrollBehavior: 'smooth' }}
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
                <PostList
                    postsWithReplies={postsWithReplies}
                    onLike={handleLikePost}
                    onAddToFavorites={handleAddToFavorites}
                />
            </InfiniteScroll>
        </div>
    );
};

export default FeedPage;
