import file from "../assets/images/file.png";
import { useRef, useState, useEffect } from "react";

export default function VideoUpload({ video, setVideo }) {
  const fileInputRef = useRef(null);
  const [previewVideo, setPreviewVideo] = useState(null);

  const handleBrowseClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;

    if (!selectedFile.type.startsWith("video/")) {
      alert("Please upload a valid video file");
      return;
    }

    setVideo(selectedFile);

    const videoPreviewURL = URL.createObjectURL(selectedFile);
    setPreviewVideo(videoPreviewURL);
  };

  // Cleanup preview URL
  useEffect(() => {
    return () => {
      if (previewVideo) URL.revokeObjectURL(previewVideo);
    };
  }, [previewVideo]);

  return (
    <div className="bg-[#27231B] border-4 border-[#393328] rounded-2xl mt-4 w-[90%] flex flex-col px-5">
      <h2 className="font-bold text-xl text-white mt-4">Upload Video</h2>

      <div className="bg-[#181611] w-[98%] h-[300px] mt-4 flex flex-col items-center justify-center border border-dashed border-[#ABA6A6] rounded-xl">
        {previewVideo ? (
          <video
            src={previewVideo}
            controls
            className="h-full w-full rounded-xl object-cover"
          />
        ) : (
          <>
            <img src={file} alt="Upload Video Icon" className="size-20" />
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
          className="bg-[#4F3D18] rounded-3xl w-40 self-center my-10 cursor-pointer"
        >
          <h6 className="text-[#F2A60D]">Browse Video</h6>
        </button>
      </div>
    </div>
  );
}
