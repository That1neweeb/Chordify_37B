import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import useApi from "../hooks/useAPI";

function GuitarCard({ guitarName, brand, rating, image, price, page, id, status, onDelete, isLoggedIn }) {
  const navigate = useNavigate();
  const { callApi } = useApi();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  // Responsive card classes
  const cardClasses =
    "bg-[#27231B] rounded-2xl cursor-pointer flex flex-col " +
    "w-full sm:w-[300px] md:w-[320px] lg:w-[350px] " +
    "h-[400px] sm:h-[450px] md:h-[480px] lg:h-[500px]";

  // Edit handler
  const handleEditClick = () => navigate(`/products/edit/${id}`);

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

  const handleViewDetails = (e) => {
    e.preventDefault();
    if (!isLoggedIn) navigate("/login");
    else navigate(`/products/${id}`);
  };

  const Wrapper = page === "mylistings" ? "div" : Link;
  const wrapperProps = page === "mylistings"
    ? { className: cardClasses }
    : { to: `/products/${id}`, className: cardClasses };

  return (
    <Wrapper {...wrapperProps}>
      {/* Card Image */}
      <img
        src={image}
        alt={guitarName}
        className="rounded-2xl w-full h-48 sm:h-56 md:h-64 lg:h-72 object-cover object-center"
      />

      {/* Status */}
      {page === "mylistings" && status && (
        <p className={`ml-4 font-semibold ${
          status === "approved" ? "text-green-400" :
          status === "pending" ? "text-yellow-400" :
          "text-red-400"
        }`}>
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </p>
      )}

      {/* Brand & Rating */}
      {page === "buying" && <p className="ml-4 text-[#ABA6A6] mt-2 text-sm sm:text-base">{brand}</p>}
      {page === "buying" && <p className="ml-4 text-xs sm:text-sm mt-1">{"⭐".repeat(rating)}</p>}

      {/* Guitar Name & Price */}
      <h3 className={`ml-4 mt-2 ${page === "buying" ? "font-semibold text-base sm:text-lg" : "font-bold text-base sm:text-lg"}`}>
        {guitarName}
      </h3>
      <p className={`ml-4 mt-1 ${page === "buying" ? "font-semibold text-sm sm:text-base" : "text-[#ABA6A6] text-sm"}`}>
        Rs.{price}
      </p>

      {/* Landing page button */}
      {page === "landing" && (
        <button
          onClick={handleViewDetails}
          className="bg-[#393328] w-full py-2 rounded-2xl mt-4  text-sm sm:text-base hover:scale-105 transition-all duration-300"
        >
          View details
        </button>
      )}

      {/* My Listings buttons */}
      {page === "mylistings" && (
        <div className="flex justify-between mt-auto px-2">
          <button
            onClick={handleEditClick}
            className="bg-green-600 text-white px-3 sm:px-4 py-1 rounded hover:bg-green-500 text-sm sm:text-base"
          >
            Edit
          </button>
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-red-600 text-white px-3 sm:px-4 py-1 rounded hover:bg-red-500 text-sm sm:text-base"
          >
            Delete
          </button>
        </div>
      )}

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-4">
          <div className="bg-black rounded-lg shadow-lg p-6 w-full max-w-xs sm:max-w-sm text-center">
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
