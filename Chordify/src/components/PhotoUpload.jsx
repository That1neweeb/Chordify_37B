import file from "../assets/images/file.png";
import { useRef, useState } from "react";

function PhotoUpload({ images, setImages }) {
  const fileInputRef = useRef(null);
  const [previewImages, setPreviewImages] = useState([]);

  const handleBrowseClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);

    if (selectedFiles.length > 5) {
      alert("You can only upload up to 5 images");
      return;
    }


    const updatedImages = [...images, ...selectedFiles];
    setImages(updatedImages);

   
    const previews = updatedImages.map((file) =>
      URL.createObjectURL(file)
    );

    setPreviewImages(previews);
  };

  return (
    <div className="bg-[#27231B] border-4 border-[#393328] rounded-2xl mt-4 w-[90%] flex flex-col px-5">
      <h2 className="font-bold text-xl text-white mt-4">Upload Photos</h2>
      <h6 className="text-[#ABA6A6] mt-4">Upload up to 5 high quality photos</h6>

      <div className="bg-[#181611] w-[98%] h-[300px] mt-4 flex flex-col items-center justify-center border border-dashed border-[#ABA6A6] rounded-xl">
        <img src={file} alt="upload" className="size-20" />
        <h3 className="text-[#ABA6A6] mt-4">
          Drag and Drop your photos here or
        </h3>
      </div>

      <div className="flex self-center">
        <input
          type="file"
          multiple
          accept="image/*"
          ref={fileInputRef}
          style={{ display: "none" }}
          onChange={handleFileChange}
        />
        <button
          onClick={handleBrowseClick}
          className="bg-[#4F3D18] rounded-3xl w-40 self-center mt-10"
        >
          <h6 className="text-[#F2A60D]">Browse Files</h6>
        </button>
      </div>

      {previewImages.length > 0 && (
        <div className="grid grid-cols-5 gap-4 mt-10 mb-4">
          {previewImages.map((img, index) => (
            <img
              key={index}
              src={img}
              alt={`preview-${index}`}
              className="h-56 w-40 object-cover rounded-2xl"
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default PhotoUpload;