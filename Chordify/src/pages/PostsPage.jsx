import { useEffect, useState } from "react";
import { useApi } from "../hooks/useAPI";
import { useNavigate } from "react-router-dom";

export default function PostsPage() {
  const { callApi } = useApi(); // don't use the global loading here
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true); // local loading state
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await callApi("GET", "/posts/getAllVideos");
        console.log(res.data);
        
        setPosts(res.data || []);
      } catch (err) {
        console.error("Error fetching posts", err);
        setError("Failed to fetch posts");
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  return (
    <div className="relative min-h-screen bg-[#1a1a1a] p-8">
      <h1 className="text-3xl font-bold text-[#D4AF37] mb-6">Posts</h1>

      {loading && <p className="text-white text-center">Loading posts...</p>}
      {!loading && error && (
        <p className="text-red-400 text-center">{error}</p>
      )}
      {!loading && !error && posts.length === 0 && (
        <p className="text-gray-400 text-center">No posts yet</p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => (
          <div
            key={post.id}
            className="post-card bg-[#27231B] rounded-2xl overflow-hidden flex flex-col items-center justify-between p-4"
          >
            <video
              src={`http://localhost:5000${post.videoUrl}`}
              controls
              className="w-full h-[600px] rounded-lg object-cover"
            />
            <div className="w-full mt-3">
              <h2 className="font-bold text-lg text-white">{post.title}</h2>
              <p className="text-sm text-gray-400">{post.description}</p>
              <h6 className="text-xs text-gray-500 mt-1">
                Posted by: {post.uploadedBy}
              </h6>
            </div>
          </div>
        ))}
      </div>

      {/* Floating + button */}
      <button
        onClick={() => navigate("/posts/create")}
        className="fixed bottom-8 right-8 w-16 h-16 bg-[#D4AF37] text-black rounded-full text-3xl font-bold flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
      >
        +
      </button>
    </div>
  );
}

