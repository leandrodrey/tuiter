import { useEffect, useState, type JSX } from 'react';
import { apiGetFeed } from '../../services/FeedService.ts';
import { apiAddLikeToTuit, apiRemoveLikeFromTuit } from '../../services/TuitsService.ts';

interface Post {
  id: string;
  message: string;
  user_id: string;
  created_at: string;
  // Additional properties we'll add to the TuitResponse
  author?: string;
  avatar_url?: string;
  likes_count?: number;
  is_liked?: boolean;
}

const FeedPage = (): JSX.Element => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const response = await apiGetFeed({ page: 1 });

        // Transform the response to match our Post interface with additional properties
        const transformedPosts = response.map(tuit => ({
          ...tuit,
          author: `User ${tuit.user_id}`, // In a real app, you'd fetch user details
          avatar_url: 'https://via.placeholder.com/50',
          likes_count: 0, // In a real app, this would come from the API
          is_liked: false // In a real app, this would come from the API
        }));

        setPosts(transformedPosts);
      } catch (err) {
        setError('Failed to load posts. Please try again later.');
        console.error('Error fetching posts:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const handleLikePost = async (postId: string) => {
    try {
      // Check if the post is already liked
      const post = posts.find(p => p.id === postId);

      if (post && post.is_liked) {
        // Unlike the post
        await apiRemoveLikeFromTuit(postId);

        // Update the posts state to reflect the unlike
        setPosts(prevPosts =>
          prevPosts.map(p =>
            p.id === postId
              ? { ...p, likes_count: (p.likes_count || 0) - 1, is_liked: false }
              : p
          )
        );
      } else {
        // Like the post
        await apiAddLikeToTuit(postId);

        // Update the posts state to reflect the like
        setPosts(prevPosts =>
          prevPosts.map(p =>
            p.id === postId
              ? { ...p, likes_count: (p.likes_count || 0) + 1, is_liked: true }
              : p
          )
        );
      }
    } catch (err) {
      console.error('Error toggling like on post:', err);
    }
  };

  const handleAddToFavorites = (author: string | undefined, avatarUrl: string | undefined) => {
    // Get existing favorites from localStorage
    const existingFavorites = JSON.parse(localStorage.getItem('favoriteUsers') || '[]');

    // Check if user is already in favorites
    const isAlreadyFavorite = existingFavorites.some(
      (favorite: { author: string }) => favorite.author === author
    );

    if (!isAlreadyFavorite) {
      // Add to favorites
      const updatedFavorites = [...existingFavorites, { author, avatar_url: avatarUrl }];
      localStorage.setItem('favoriteUsers', JSON.stringify(updatedFavorites));
      alert(`${author} added to favorites!`);
    } else {
      alert(`${author} is already in your favorites!`);
    }
  };

  if (loading) return <div>Loading posts...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="feed-container">
      <h1>Post Feed</h1>

      {posts.length === 0 ? (
        <p>No posts available.</p>
      ) : (
        <div className="posts-list">
          {posts.map(post => (
            <div key={post.id} className="post-card">
              <div className="post-header">
                <img
                  src={post.avatar_url || 'https://via.placeholder.com/50'}
                  alt={`${post.author}'s avatar`}
                  className="avatar"
                />
                <div className="author-info">
                  <h3>{post.author}</h3>
                  <span>{new Date(post.created_at).toLocaleString()}</span>
                </div>
                <button
                  onClick={() => handleAddToFavorites(post.author, post.avatar_url)}
                  className="favorite-button"
                >
                  Add to Favorites
                </button>
              </div>

              <div className="post-content">
                <p>{post.message}</p>
              </div>

              <div className="post-actions">
                <button
                  onClick={() => handleLikePost(post.id)}
                  disabled={post.is_liked}
                  className={`like-button ${post.is_liked ? 'liked' : ''}`}
                >
                  {post.is_liked ? 'Liked' : 'Like'} ({post.likes_count})
                </button>
                <a href={`/posts/${post.id}/reply`} className="reply-link">
                  Reply
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FeedPage;
