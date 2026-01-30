import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useApi from "../hooks/useAPI.js";
import { toast } from "react-toastify";

function EditProductPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { callApi, loading } = useApi();
  const MAX_IMAGES = 4;

  const [formData, setFormData] = useState({
    name: "",
    brand: "",
    price: "",
    description: "",
    existingImages: [], // URLs of images stored on server
    newImages: [], // new files to upload
  });

  // Fetch product data
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await callApi("GET", `/products/${id}`, {});
        const product = res.data;
        setFormData({
          name: product.name,
          brand: product.brand,
          price: product.price,
          description: product.description,
          existingImages: product.image_urls || [],
          newImages: [],
        });
      } catch (error) {
        toast.error(error.response?.data?.message || "Failed to load product");
      }
    };
    fetchProduct();
  }, [id]);

  // Handle text input
  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // Remove existing image
  const handleRemoveExistingImage = (index) => {
    setFormData((prev) => {
      const updated = [...prev.existingImages];
      updated.splice(index, 1);
      return { ...prev, existingImages: updated };
    });
  };

  // Add new images
  const handleAddNewImage = (e) => {
    const files = Array.from(e.target.files);
    setFormData((prev) => {
      const totalImages = prev.existingImages.length + prev.newImages.length;
      const availableSlots = MAX_IMAGES - totalImages;
      const filesToAdd = files.slice(0, availableSlots);
      return { ...prev, newImages: [...prev.newImages, ...filesToAdd] };
    });
  };

  // Remove new image
  const handleRemoveNewImage = (index) => {
    setFormData((prev) => {
      const updated = [...prev.newImages];
      updated.splice(index, 1);
      return { ...prev, newImages: updated };
    });
  };

  // Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = new FormData();
      data.append("name", formData.name);
      data.append("brand", formData.brand);
      data.append("price", formData.price);
      data.append("description", formData.description);

      // Append each existing image individually
      formData.existingImages.forEach((img) =>
        data.append("existingImages[]", img)
      );

      // Append each new image file
      formData.newImages.forEach((file) =>
        data.append("image_files", file)
      );

      await callApi("PUT", `/products/edit/${id}`, { data });

      toast.success("Product updated successfully");
      navigate("/mylistings");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update product");
    }
  };

  return (
    <div className="min-h-screen bg-[#12100d] flex items-center justify-center px-4">
      <div className="w-full max-w-3xl bg-[#1c1913] rounded-2xl p-10 shadow-lg">
        <h1 className="text-3xl font-bold text-white mb-6">Edit Product</h1>

        {loading && <p className="text-white mb-4">Loading...</p>}

        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          {/* Name */}
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Product Name"
            className="p-3 rounded-2xl bg-gray-800 text-white outline-none"
            required
          />

          {/* Brand */}
          <input
            type="text"
            name="brand"
            value={formData.brand}
            onChange={handleChange}
            placeholder="Brand"
            className="p-3 rounded-2xl bg-gray-800 text-white outline-none"
          />

          {/* Price */}
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            placeholder="Price"
            className="p-3 rounded-2xl bg-gray-800 text-white outline-none"
            required
          />

          {/* Description */}
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Description"
            rows={4}
            className="p-3 rounded-2xl bg-gray-800 text-white outline-none"
          />

          {/* Images */}
          <div>
            <label className="text-white mb-2 block">Images (max 4)</label>
            <div className="flex gap-3 flex-wrap mt-2">
              {/* Existing Images */}
              {formData.existingImages.map((img, index) => (
                <div key={`existing-${index}`} className="relative w-24 h-24">
                  <img
                    src={`http://localhost:5000${img}`}
                    alt="Existing"
                    className="w-24 h-24 object-cover rounded-2xl"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveExistingImage(index)}
                    className="absolute -top-1 -right-1 bg-red-600 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center"
                  >
                    ×
                  </button>
                </div>
              ))}

              {/* New Images */}
              {formData.newImages.map((file, index) => (
                <div key={`new-${index}`} className="relative w-24 h-24">
                  <img
                    src={URL.createObjectURL(file)}
                    alt="New"
                    className="w-24 h-24 object-cover rounded-2xl"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveNewImage(index)}
                    className="absolute -top-1 -right-1 bg-red-600 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center"
                  >
                    ×
                  </button>
                </div>
              ))}

              {/* Add new images button */}
              {formData.existingImages.length + formData.newImages.length < MAX_IMAGES && (
                <label className="cursor-pointer w-24 h-24 border-2 border-dashed flex items-center justify-center rounded-2xl text-white">
                  +
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    multiple
                    onChange={handleAddNewImage}
                  />
                </label>
              )}
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-4 mt-6">
            <button
              type="submit"
              className="bg-green-600 px-6 py-2 rounded-xl text-white font-bold"
            >
              Save Changes
            </button>
            <button
              type="button"
              onClick={() => navigate("/mylistings")}
              className="bg-gray-600 px-6 py-2 rounded-xl text-white font-bold"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditProductPage;
