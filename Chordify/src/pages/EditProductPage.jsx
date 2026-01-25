import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useApi from "../hooks/useAPI.js";
import { toast } from "react-toastify";

function EditProductPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { callApi, loading } = useApi();

  const [formData, setFormData] = useState({
    name: "",
    brand: "",
    price: "",
    description: "",
    existingImages: [],      // URLs of current images
    replacementFiles: {},    // { index: File } for replacement
  });

  // Fetch product data to pre-fill form
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await callApi("GET", `/products/${id}`, {});
        const product = res.data;
        setFormData((prev) => ({
          ...prev,
          name: product.name,
          brand: product.brand,
          price: product.price,
          description: product.description,
          existingImages: product.image_urls || [],
          replacementFiles: {},
        }));
      } catch (error) {
        toast.error(error.response?.data?.message || "Failed to load product");
      }
    };

    fetchProduct();
  }, [id]);

  // Handle text input change
  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // Remove existing image (slot becomes available for replacement)
  const handleRemoveExistingImage = (index) => {
    setFormData((prev) => {
      const updatedExisting = [...prev.existingImages];
      updatedExisting[index] = null; // mark as removed
      return { ...prev, existingImages: updatedExisting };
    });
  };

  // Handle replacement file selection
  const handleReplacementFileChange = (e, index) => {
    const file = e.target.files[0];
    if (!file) return;
    setFormData((prev) => ({
      ...prev,
      replacementFiles: { ...prev.replacementFiles, [index]: file },
    }));
  };

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = new FormData();
      data.append("name", formData.name);
      data.append("brand", formData.brand);
      data.append("price", formData.price);
      data.append("description", formData.description);

      // Keep only non-null existing images
      formData.existingImages
        .filter((img) => img)
        .forEach((img) => data.append("existingImages", img));

      // Append replacement files
      Object.values(formData.replacementFiles).forEach((file) =>
        data.append("image_files", file)
      );

      await callApi("PUT", `/products/edit/${id}`, {data});

      toast.success("Product updated successfully");
      navigate("/mylistings");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update product");
    }
  };

  return (
    <div className="p-10 max-w-3xl mx-auto min-h-screen mt-10">
      <h1 className="text-3xl font-bold text-white mb-6">Edit Product</h1>

      {loading && <p className="text-white">Loading...</p>}

      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Product Name"
          className="p-2 rounded bg-gray-800 text-white"
          required
        />
        <input
          type="text"
          name="brand"
          value={formData.brand}
          onChange={handleChange}
          placeholder="Brand"
          className="p-2 rounded bg-gray-800 text-white"
        />
        <input
          type="number"
          name="price"
          value={formData.price}
          onChange={handleChange}
          placeholder="Price"
          className="p-2 rounded bg-gray-800 text-white"
          required
        />
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Description"
          className="p-2 rounded bg-gray-800 text-white"
          rows={4}
        />

        {/* Images Section */}
        <div>
          <label className="text-white mb-2 block">Images (max 4)</label>
          <div className="flex gap-2 flex-wrap mt-2">
            {formData.existingImages.map((img, index) => (
              <div key={index} className="relative w-24 h-24">
                {img && !formData.replacementFiles[index] && (
                  <>
                    <img
                      src={`http://localhost:5000${img}`}
                      alt="Existing"
                      className="w-24 h-24 object-cover rounded"
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveExistingImage(index)}
                      className="absolute -top-1 -right-1 bg-red-600 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center"
                    >
                      X
                    </button>
                  </>
                )}

                
                {/* Replacement input appears only after removal */}
                {(!img || formData.replacementFiles[index]) && (
                <label className="cursor-pointer w-24 h-24 border-2 border-dashed flex items-center justify-center rounded text-white">
                {formData.replacementFiles[index] ? (
                    <img
                        src={URL.createObjectURL(formData.replacementFiles[index])}
                        alt="Replacement"
                        className="w-24 h-24 object-cover rounded"
                    />
                    ) : (
                    "+"
                    )}
                    <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => handleReplacementFileChange(e, index)}
                />
            </label>
            )}

              </div>
            ))}
          </div>
        </div>

        <div className="flex gap-4 mt-4">
          <button
            type="submit"
            className="bg-green-600 px-4 py-2 rounded text-white font-bold"
          >
            Save Changes
          </button>
          <button
            type="button"
            onClick={() => navigate("/mylistings")}
            className="bg-gray-600 px-4 py-2 rounded text-white font-bold"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditProductPage;
