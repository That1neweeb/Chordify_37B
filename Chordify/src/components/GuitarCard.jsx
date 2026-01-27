import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import useApi from "../hooks/useAPI";

function GuitarCard({ guitarName, brand, rating, image, price, page, id, onDelete }) {
  const navigate = useNavigate();
  const { callApi } = useApi();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const cardClasses =
    "bg-[#27231B] h-[500px] w-[350px] flex flex-col rounded-2xl cursor-pointer";

  // Edit handler
  const handleEditClick = () => {
    navigate(`/products/edit/${id}`);
  };

  const handleDelete = async () => {
    setLoading(true);
    try {
      const data = await callApi("DELETE", `/products/${id}`, {});
      toast.success(data.message || "Product deleted successfully");
      if (onDelete) onDelete(id);
      setIsModalOpen(false);
    } catch (error) {
      toast.error(error.message || "Failed to delete product");
      console.error("Delete failed:", error.message);
    } finally {
      setLoading(false);
    }
  };


  // Pick wrapper dynamically
  const Wrapper = page === "mylistings" ? "div" : Link;
  const wrapperProps = page === "mylistings"
    ? { className: cardClasses }
    : { to: `/products/${id}`, className: cardClasses };

  return (
    <Wrapper {...wrapperProps}>
      {/* Card Content */}
      <img
        src={image}
        alt={guitarName}
        className="rounded-2xl size-72 object-center object-cover"
      />
      {page === "buying" && <p className="ml-4 text-[#ABA6A6] mt-3">{brand}</p>}
      {page === "buying" && <p className="ml-3 text-xs mt-2">{"⭐".repeat(rating)}</p>}
      <h3 className={page === "buying" ? "ml-4 font-semibold" : "ml-4 mt-2 font-bold"}>
        {guitarName}
      </h3>
      <p className={page === "buying" ? "ml-4 font-semibold text-md" : "ml-4 text-[#ABA6A6] text-sm"}>
        Rs.{price}
      </p>

      {/* Landing page button */}
      {page === "landing" && (
        <button className="bg-[#393328] w-70 py-2 rounded-2xl mt-4 mx-2 mb-2">
          View details
        </button>
      )}

      {/* My Listings buttons */}
      {page === "mylistings" && (
        <div className="flex justify-between mt-auto p-4">
          <button
            onClick={handleEditClick}
            className="bg-green-600 text-white px-4 py-1 rounded hover:bg-green-500"
          >
            Edit
          </button>
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-red-600 text-white px-4 py-1 rounded hover:bg-red-500"
          >
            Delete
          </button>
        </div>
      )}

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-black rounded-lg shadow-lg p-6 w-80 text-center">
            <h2 className="text-lg font-semibold mb-4">Confirm Delete</h2>
            <p className="mb-6">Are you sure you want to delete this product?</p>
            <div className="flex justify-around">
              <button
                onClick={handleDelete}
                disabled={loading}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
              >
                {loading ? "Deleting..." : "Delete"}
              </button>
              <button
                onClick={() => setIsModalOpen(false)}
                className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400 transition"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </Wrapper>
  );
}

export default GuitarCard;
