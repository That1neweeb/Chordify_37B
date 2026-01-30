import { useState } from "react";
import toast from "react-toastify";
import useApi from "../hooks/useAPI";

export default function AddSong() {
  const [title, setTitle] = useState("");
  const [artist, setArtist] = useState("");
  const [strummingPattern, setStrummingPattern] = useState("");
  const [difficulty, setDifficulty] = useState("easy");
  const [content, setContent] = useState("");
  const [coverImage, setCoverImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const {callApi} = useApi();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!coverImage) {
      toast.error("Please upload a cover image");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("artist", artist);
    formData.append("strummingPattern", strummingPattern);
    formData.append("difficulty", difficulty);
    formData.append("cover_image", coverImage);
    formData.append("content", content); // JSON string

    try {
      setLoading(true);

      await callApi("POST", "admin/songs/add", {data : formData}) 
      toast.success("Song added successfully");

      // reset form
      setTitle("");
      setArtist("");
      setStrummingPattern("");
      setDifficulty("easy");
      setContent("");
      setCoverImage(null);

    } catch (error) {
      toast.error("Failed to add song");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded shadow max-w-xl"
    >
      <div className="mb-4">
        <label className="block mb-1">Title</label>
        <input
          type="text"
          className="w-full border p-2"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>

      <div className="mb-4">
        <label className="block mb-1">Artist</label>
        <input
          type="text"
          className="w-full border p-2"
          value={artist}
          onChange={(e) => setArtist(e.target.value)}
          required
        />
      </div>

      <div className="mb-4">
        <label className="block mb-1">Strumming Pattern</label>
        <input
          type="text"
          className="w-full border p-2"
          placeholder="DDUUD"
          value={strummingPattern}
          onChange={(e) => setStrummingPattern(e.target.value)}
          required
        />
      </div>

      <div className="mb-4">
        <label className="block mb-1">Difficulty</label>
        <select
          className="w-full border p-2"
          value={difficulty}
          onChange={(e) => setDifficulty(e.target.value)}
        >
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>
      </div>

      <div className="mb-4">
        <label className="block mb-1">Cover Image</label>
        <input
          type="file"
          accept="image/*"
          className="w-full"
          onChange={(e) => setCoverImage(e.target.files[0])}
          required
        />
      </div>

      <div className="mb-4">
        <label className="block mb-1">Content (JSON)</label>
        <textarea
          className="w-full border p-2"
          rows="4"
          placeholder='{"lyrics":["line1"],"chords":["C","G"]}'
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="bg-black text-white px-4 py-2 rounded"
      >
        {loading ? "Adding..." : "Add Song"}
      </button>
    </form>
  );
}
