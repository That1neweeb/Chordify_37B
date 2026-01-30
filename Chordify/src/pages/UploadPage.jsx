import VideoUpload from "../components/VideoUpload";
import { useState } from "react";
import { useApi } from "../hooks/useAPI";
import {toast} from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function UploadPage() {
  const { callApi, loading } = useApi();
  const navigate = useNavigate();

  const [video, setVideo] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async () => {
    if (!video || !title) {
      toast.error("Video and title are required");
      return;
    }

    const formData = new FormData();
    formData.append("video_URL", video);
    formData.append("title", title);
    formData.append("description", description);

    try {
      await callApi("POST", "/posts/uploadVideo", { data: formData });
      toast.success("Video uploaded successfully!");
      navigate("/posts");
    } catch (err) {
      console.error(err);
      toast.error(err.message || "Error uploading video");
    }
  };

  return (
    <div className="h-full flex flex-col gap-4 justify-center items-center">
      {/* Back Button */}
      <button
        onClick={() => navigate("/posts")}
        className="self-start ml-10 mt-4 px-4 py-2 bg-gray-700 text-white rounded-xl hover:bg-gray-600"
      >
        Back to Posts
      </button>

      <h1 className="font-bold text-3xl text-white mt-4">Upload Video</h1>

      <VideoUpload video={video} setVideo={setVideo} />

      <div className="bg-[#27231B] p-10 w-[90%] border-4 border-[#393328] rounded-3xl flex flex-col justify-center items-center gap-4">
        <label className="mt-2 w-full">Title</label>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="h-10 w-full rounded-xl bg-[#181611] border-4 border-[#393328] px-3"
        />

        <label>Description</label>
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="h-40 w-full rounded-xl bg-[#181611] border-4 border-[#393328] px-3 py-2"
        />
      </div>

      <button
        onClick={handleSubmit}
        disabled={loading}
        className="bg-[#4F3D18] text-[#F2A60D] px-6 py-2 rounded-2xl mt-10 disabled:opacity-50"
      >
        {loading ? "Uploading..." : "Submit Post"}
      </button>
    </div>
  );
}
