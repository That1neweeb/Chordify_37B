import React from "react";
import { Settings } from "lucide-react";

export default function Header() {
  return (
    <header className="bg-zinc-900 p-4 flex items-center justify-between">
      <h1 className="text-2xl font-bold tracking-wider">ADMIN DASHBOARD</h1>

      <div className="flex items-center gap-4">
        <Settings className="text-gray-400 cursor-pointer hover:text-white" size={24} />

        <div className="w-12 h-12 rounded-full bg-blue-400 overflow-hidden">
          <div className="w-full h-full bg-gradient-to-b from-blue-300 to-blue-500"></div>
        </div>
      </div>
    </header>
  );
}
