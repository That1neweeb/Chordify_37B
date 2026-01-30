import React from "react";
import { Link, useNavigate } from "react-router-dom";

function GuitarCard({
  guitarName,
  brand,
  rating,
  image,
  price,
  page,
  id,
  onDelete,
}) {
  const navigate = useNavigate();


  const cardClasses =
    "h-[500px] w-[350px] flex flex-col rounded-2xl cursor-pointer border";

  const cardStyle = {
    backgroundColor: "var(--card-bg)",
    borderColor: "var(--border-color)",
    color: "var(--text-color)",
  };

  // Edit handler
  const handleEditClick = (e) => {
    e.stopPropagation();
    navigate(`/products/edit/${id}`);
  };

  // Delete handler
  const handleDeleteClick = (e) => {
    e.stopPropagation();
    if (onDelete) onDelete(id);
  };

  // Wrapper logic
  const Wrapper = page === "mylistings" ? "div" : Link;
  const wrapperProps =
    page === "mylistings"
      ? { className: cardClasses, style: cardStyle }
      : {
          to: `/products/${id}`,
          className: cardClasses,
          style: cardStyle,
        };

  return (
    <Wrapper {...wrapperProps}>
      {/* Image  */}
      <img
        src={image}
        alt={guitarName}
        className="rounded-2xl size-72 object-center object-cover"
      />

      {/* Brand */}
      {page === "buying" && (
        <p className="ml-4 mt-3 text-sm opacity-70">{brand}</p>
      )}

      {/* Rating */}
      {page === "buying" && (
        <p className="ml-3 text-xs mt-2">{"⭐".repeat(rating)}</p>
      )}

      {/* Name */}
      <h3
        className={
          page === "buying"
            ? "ml-4 font-semibold"
            : "ml-4 mt-2 font-bold"
        }
      >
        {guitarName}
      </h3>

      {/* Price */}
      <p
        className={
          page === "buying"
            ? "ml-4 font-semibold text-md"
            : "ml-4 text-sm opacity-70"
        }
      >
        Rs.{price}
      </p>

      {/* Landing page button */}
      {page === "landing" && (
        <button
          className="w-70 py-2 rounded-2xl mt-4 mx-2 mb-2 border font-medium"
          style={{
            backgroundColor: "var(--button-bg)",
            color: "var(--text-color)",
            borderColor: "var(--border-color)",
          }}
        >
          View details
        </button>
      )}

      {/* My Listings buttons */}
      {page === "mylistings" && (
        <div className="flex justify-between mt-auto p-4">
          <button
            onClick={handleEditClick}
            className="px-4 py-1 rounded border font-medium"
            style={{
              backgroundColor: "transparent",
              color: "#22c55e",
              borderColor: "#22c55e",
            }}
          >
            Edit
          </button>

          <button
            onClick={handleDeleteClick}
            className="px-4 py-1 rounded border font-medium"
            style={{
              backgroundColor: "transparent",
              color: "#ef4444",
              borderColor: "#ef4444",
            }}
          >
            Delete
          </button>
        </div>
      )}
    </Wrapper>
  );
}

export default GuitarCard;
