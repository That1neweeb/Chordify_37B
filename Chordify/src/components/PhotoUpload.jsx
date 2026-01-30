import file from "../assets/images/file.png";
import { useRef, useEffect } from "react";

function PhotoUpload({ images, setImages, errors }) {
  const fileInputRef = useRef(null);

  const handleBrowseClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);

    // total images check (max 4)
    if (images.length + selectedFiles.length > 4) {
      alert("You can only upload up to 4 images");
      return;
    }

    setImages([...images, ...selectedFiles]);
  };

  // cleanup object URLs
  useEffect(() => {
    return () => {
      images.forEach((file) => URL.revokeObjectURL(file.preview));
    };
  }, [images]);

  return (
    <div
      className="border-4 rounded-2xl mt-4 w-[90%] flex flex-col px-5"
      style={{
        backgroundColor: "var(--card-bg)",
        borderColor: "var(--border-color)",
        color: "var(--text-color)",
      }}
    >
      <h2 className="font-bold text-xl mt-4">Upload Photos</h2>
      <h6 className="mt-4 opacity-70">
        Upload up to 4 high quality photos
      </h6>

      <div
        className="w-[98%] h-[300px] mt-4 flex flex-col items-center justify-center border border-dashed rounded-xl"
        style={{
          backgroundColor: "var(--bg-color)",
          borderColor: "var(--border-color)",
          color: "var(--text-color)",
        }}
      >
        <img src={file} alt="upload" className="size-20" />
        <h3 className="mt-4 opacity-70">
          Drag and Drop your photos here or
        </h3>
      </div>

      <div className="flex self-center p-8">
        <input
          type="file"
          multiple
          accept="image/*"
          ref={fileInputRef}
          style={{ display: "none" }}
          onChange={handleFileChange}
        />
        <button
          type="button"
          onClick={handleBrowseClick}
          className="rounded-3xl w-40 self-center mt-10 border font-medium"
          style={{
            backgroundColor: "var(--button-bg)",
            color: "var(--link-hover)",
            borderColor: "var(--link-hover)",
          }}
        >
          Browse Files
        </button>
      </div>

      {/* Validation error */}
      {errors?.image_files && (
        <p className="text-red-500 mt-1">{errors.image_files.message}</p>
      )}

      {/* Preview */}
      {images.length > 0 && (
        <div className="grid grid-cols-4 gap-4 mt-10 mb-4">
          {images.map((file, index) => {
            const preview = URL.createObjectURL(file);
            return (
              <img
                key={index}
                src={preview}
                alt={`preview-${index}`}
                className="h-56 w-40 object-cover rounded-2xl"
              />
            );
          })}
        </div>
      )}
    </div>
  );
}

export default PhotoUpload;
