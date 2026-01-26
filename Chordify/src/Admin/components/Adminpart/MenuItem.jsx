import React from 'react';

// Defines the component for a single navigation item in the sidebar
export default function MenuItem({ icon, text, active, onClick }) {
  return (
    <div
      onClick={onClick}
      // This uses Tailwind CSS classes for styling:
      // active: orange background
      // inactive: gray text, hover to zinc-800 background
      className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-colors ${
        active
          ? 'bg-orange-500 text-white'
          : 'text-gray-400 hover:bg-zinc-800 hover:text-white'
      }`}
    >
      {icon}
      <span className="font-medium">{text}</span>
    </div>
  );
}