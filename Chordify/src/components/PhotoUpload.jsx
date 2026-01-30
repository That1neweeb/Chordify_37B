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
      images.forEach(file => URL.revokeObjectURL(file.preview));
    };
  }, [images]);

  return (
    <div className="bg-[#27231B] border-4 border-[#393328] rounded-2xl mt-4 w-[90%] flex flex-col px-5">
      <h2 className="font-bold text-xl text-white mt-4">Upload Photos</h2>
      <h6 className="text-[#ABA6A6] mt-4">
        Upload up to 4 high quality photos
      </h6>

      <div className="bg-[#181611] w-[98%] h-[300px] mt-4 flex flex-col items-center justify-center border border-dashed border-[#ABA6A6] rounded-xl">
        <img src={file} alt="upload" className="size-20" />
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
          className="bg-[#4F3D18] rounded-3xl w-40 self-center mt-10"
        >
          <h6 className="text-[#F2A60D]">Browse Files</h6>
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
