import { Link } from "react-router-dom";
import PostCard from "../components/PostCard";
import countdownVideo from "../assets/vecteezy_seconds-countdown-timer-animation-4k-green-screen_47387056.mp4";
import { useEffect, useState } from "react";
import { useApi } from "../hooks/useAPI";

export default function PostsPage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { callApi } = useApi();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await callApi("GET", "/posts/getAllVideos");
        const data = await res;
        setPosts(Array.isArray(data) ? data : []);
      } catch (err) {
        
        // make sure the error is logged as well as the page doesnot crash when there is a fetching error
        console.error("Failed to fetch posts", err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []); 

  if (loading) return <p>Loading posts...</p>;
  if (error) return <p>Error loading posts: {error.message}</p>;

  return (
    <div className="gap-4 m-8 flex flex-col items-center">
    <div className="flex gap-4">
      <Link to="uploadPage">Try Uploading Some Content</Link>
      <Link to="myUploads">View my Posts</Link>
    </div>
      
      {posts.length === 0 ? (
        <p>No posts found</p>
      ) : (
        posts.map(post => <PostCard key={post.id} content={post} />)
      )}
    </div>
  );
}