import React from "react";
import { Link, useNavigate } from "react-router-dom";

function GuitarCard({ guitarName, brand, rating, image, price, page, id, onDelete }) {
  const navigate = useNavigate();

  const cardClasses =
  "bg-[#27231B] h-[500px] w-[350px] flex flex-col rounded-2xl cursor-pointer";


  // Edit handler
  const handleEditClick = () => {
    navigate(`/products/edit/${id}`);
  };

  // Delete handler
  const handleDeleteClick = () => {
    if (onDelete) onDelete(id);
  };

  // Pick wrapper dynamically
  const Wrapper = page === "mylistings" ? "div" : Link;
  const wrapperProps = page === "mylistings" ? { className: cardClasses } : { to: `/products/${id}`, className: cardClasses };

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
      <h3 className={page === "buying" ? "ml-4 font-semibold" : "ml-4 mt-2 font-bold"}>{guitarName}</h3>
      <p className={page === "buying" ? "ml-4 font-semibold text-md" : "ml-4 text-[#ABA6A6] text-sm"}>Rs.{price}</p>

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
            onClick={handleDeleteClick}
            className="bg-red-600 text-white px-4 py-1 rounded hover:bg-red-500"
          >
            Delete
          </button>
        </div>
      )}
    </Wrapper>
  );
}

export default GuitarCard;
