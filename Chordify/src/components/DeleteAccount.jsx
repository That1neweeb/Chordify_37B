import React from "react";
import { X, AlertCircle, Trash2 } from "lucide-react";

export default function DeleteAccount({ onClose }) {
  const handleDelete = () => {
    // Add your delete logic here
    console.log("Account deleted");
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/80" onClick={onClose}></div>

      {/* Modal */}
      <div className="relative bg-gray-900 border border-gray-700 rounded-3xl p-10 max-w-md w-full z-10">
        {/* X Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
        >
          <X />
        </button>

        {/* Warning Message */}
        <div className="bg-gray-800 p-4 rounded-xl border border-gray-700 mb-6">
          <div className="flex gap-3 items-center">
            <AlertCircle className="text-amber-500 w-6 h-6 flex-shrink-0" />
            <p className="text-gray-300 text-sm">
              Are you sure you want to delete your account? This action is <strong>irreversible</strong>.
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4">
          <button
            onClick={onClose}
            className="flex-1 bg-gray-700 hover:bg-gray-600 text-white py-3 rounded-xl transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleDelete}
            className="flex-1 bg-red-600 hover:bg-red-700 text-white py-3 rounded-xl font-semibold transition-colors flex items-center justify-center gap-2"
          >
            <Trash2 className="w-5 h-5" />
            Delete Account
          </button>
        </div>
      </div>
    </div>
  );
}
