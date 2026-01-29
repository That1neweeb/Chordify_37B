import file from "../assets/images/file.png";
import { useRef, useState } from "react";

export default function VideoUpload({ video_URL, setVideo }) {
  const fileInputRef = useRef(null);
  const [previewVideo, setPreviewVideo] = useState(null);

  const handleBrowseClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];

    if (!selectedFile) return;

    // Allow only video files
    if (!selectedFile.type.startsWith("video/")) {
      alert("Please upload a valid video file");
      return;
    }

    // Store video file in parent state
    setVideo(selectedFile);

    // Create preview URL
    const videoPreviewURL = URL.createObjectURL(selectedFile);
    setPreviewVideo(videoPreviewURL);
  };

  return (
    <div className="bg-[var(--card-bg)] border-4 border-[var(--border-color)] rounded-2xl mt-4 w-[90%] flex flex-col px-5">
      <h2 className="font-bold text-xl text-[var(--text-color)] mt-4">Upload Video</h2>

      <div className="bg-[var(--bg-color)] w-[98%] h-[300px] mt-4 flex flex-col items-center justify-center border-2 border-dashed border-[var(--border-color)] rounded-xl">
        {previewVideo ? (
          <video
            src={previewVideo}
            controls
            className="h-full w-full rounded-xl object-cover"
          />
        ) : (
          <>
            <img src={file} alt="upload" className="size-20" />
            <h3 className="text-[var(--text-color)] opacity-70 mt-4">
              Drag and Drop your Video here
            </h3>
          </>
        )}
      </div>

      <div className="flex self-center">
        <input
          type="file"
          accept="video/*"
          ref={fileInputRef}
          hidden
          onChange={handleFileChange}
        />
        <button
          onClick={handleBrowseClick}
          className="bg-[var(--button-bg)] rounded-3xl w-40 self-center my-10 border border-[var(--link-hover)]"
        >
          <h6 className="text-[var(--link-hover)]">Browse Video</h6>
        </button>
      </div>
    </div>
  );
}
