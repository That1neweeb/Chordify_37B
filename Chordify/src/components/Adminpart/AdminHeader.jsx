import React from "react";
import AdminDropdown from "./AdminDropdown";

export default function Header() {
  return (
    <header className="bg-zinc-900 p-4 flex items-center justify-between">
      <h1 className="text-2xl font-bold tracking-wider">ADMIN DASHBOARD</h1>

      {/* Admin dropdown with image + logout */}
      <AdminDropdown />
    </header>
  );
}
