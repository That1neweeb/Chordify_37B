import { useState, useEffect } from "react";
import useApi from "../hooks/useAPI";
import PostCard from "../components/PostCard";
export default function MyUploads(){
      const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { callApi } = useApi();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await callApi("GET", "/posts/getMyuploads");
        setPosts(Array.isArray(res.data) ? res.data : []);
        console.log(posts);
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
//   const posts = [{
//   "id": 1,
//   "title": "Testing",
//   "description": "NONE",
//   "uploadedBy": "Sidhant Giri",
//   "video_URLS": "/uploads/1769500889446.MOV",
//   "user_id": 1,
//   "approval_status": false,
//   "createdAt": "2026-01-27T08:01:29.572Z",
//   "updatedAt": "2026-01-27T08:01:29.572Z"
// }];
   return (
    <div className="gap-4 m-8 flex flex-col items-center">
      {posts.length === 0 ? (
        <p>No posts found</p>
      ) : (
        posts.map(post => <PostCard key={post.id} content={post} />)
      )}
    </div>
  );

}