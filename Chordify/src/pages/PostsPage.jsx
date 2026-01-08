import { Link } from "react-router-dom";
import PostCard from "../components/PostCard";
import countdownVideo from "../assets/vecteezy_seconds-countdown-timer-animation-4k-green-screen_47387056.mp4";
import { useEffect, useState } from "react";
export default function PostsPage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch("http://localhost:5000/posts/getAllVideos");
        const data = await res.json();
        setPosts(data);
      } catch (err) {
        console.error("Failed to fetch posts", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) return <p>Loading posts...</p>;

  return (
    <div className="gap-4 m-8 flex flex-col items-center">
      <Link to="UploadPage">Try Uploading Some Content</Link>

      {posts.map(post => (
        <PostCard key={post.id} content={post} />
      ))}
    </div>
  );
}
