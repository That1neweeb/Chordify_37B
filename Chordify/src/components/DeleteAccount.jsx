import React from "react";
import { X, AlertCircle, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function DeleteAccount({ onClose }) {
  const navigate = useNavigate();

  const handleDelete = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        alert("You are not logged in");
        return;
      }

      const res = await fetch("http://localhost:5000/auth/delete-acc", {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (res.ok) {
        console.log(data.message);

        // Remove token after delete
        localStorage.removeItem("token");

        onClose();
        navigate("/login");
      } else {
        alert(data.message);
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong");
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="absolute inset-0 bg-black/80" onClick={onClose}></div>

      <div className="relative bg-[#1a1a1a] border border-[#8B6914] rounded-3xl p-10 max-w-md w-full z-10">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-[#D4AF37]"
        >
          <X />
        </button>

        <div className="bg-[#2a2520] p-4 rounded-xl border border-[#8B6914] mb-6">
          <div className="flex gap-3 items-center">
            <AlertCircle className="text-[#D4AF37] w-6 h-6" />
            <p className="text-gray-300 text-sm">
              Are you sure? This action is{" "}
              <strong className="text-[#D4AF37]">irreversible</strong>.
            </p>
          </div>
        </div>

        <div className="flex gap-4">
          <button
            onClick={onClose}
            className="flex-1 bg-[#3a3a3a] text-white py-3 rounded-xl"
          >
            Cancel
          </button>
          <button
            onClick={handleDelete}
            className="flex-1 bg-red-600 hover:bg-red-700 text-white py-3 rounded-xl font-semibold flex items-center justify-center gap-2"
          >
            <Trash2 className="w-5 h-5" />
            Delete Account
          </button>
        </div>
      </div>
    </div>
  );
}
