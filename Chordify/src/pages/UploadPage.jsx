import VideoUpload from "../components/VideoUpload";
import { useState } from "react";
import useApi from "../hooks/useAPI"; // <-- import your hook correctly
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";

export default function UploadPage() {
  const [video_URL, setVideo] = useState();
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const { loading, error, callApi } = useApi(); // at the top level
  const navigate = useNavigate(); 

  // handling submit
  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("video_URL", video_URL);
    formData.append("title", title);
    formData.append("description", desc);
    try {
      const res = await callApi("POST", "/posts/uploadVideo", {data : formData});
      console.log("Video uploaded:", res.data);
      toast.success("Video uploaded successfully");
      navigate("/posts");

    } catch (e) {
      console.error("Error uploading video:", e.response?.data || e.message);
      window.alert("Error uploading video");  
    }
  };

  return (
    <div className="h-full flex flex-col gap-4 justify-center items-center bg-[var(--bg-color)] text-[var(--text-color)]">
      <h1 className="font-bold text-3xl text-[var(--text-color)]">Upload Video</h1>

      <VideoUpload video_URL={video_URL} setVideo={setVideo} />

      <div className="w-[90%] h-[300px] border-4 rounded-3xl flex flex-col justify-center items-center gap-4 bg-[var(--card-bg)] border-[var(--border-color)]">
        <label htmlFor="title" className="mt-2 text-[var(--text-color)]">Title</label>
        <input
          name="title"
          type="text"
          placeholder="Title"
          className="h-10 rounded-xl bg-[var(--bg-color)] border-4 border-[var(--border-color)] mt-4 text-[var(--text-color)]"
          onChange={(e) => setTitle(e.target.value)}
        />

        <label htmlFor="description" className="text-[var(--text-color)]">Description</label>
        <textarea
          name="description"
          placeholder="Description"
          className="h-40 w-[80%] rounded-xl bg-[var(--bg-color)] border-4 border-[var(--border-color)] my-5 text-[var(--text-color)]"
          onChange={(e) => setDesc(e.target.value)}
        />
      </div>

      <button
        onClick={handleSubmit}
        className="w-l bg-[var(--button-bg)] text-[var(--link-hover)] px-6 py-2 rounded-2xl mt-10"
        disabled={loading} // optional: disable button while loading
      >
        {loading ? "Uploading..." : "Submit Post"}
      </button>

      {error && <p className="text-red-500 mt-2">{error}</p>}
    </div>
  );
}
