import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import AdminHeader from "../components/AdminHeader";

export default function AdminLayout() {
  const [activeMenu, setActiveMenu] = useState(null);

  return (
    <div className="min-h-screen bg-black text-white flex">
      <Sidebar activeMenu={activeMenu} setActiveMenu={setActiveMenu} />

      <div className="flex-1 flex flex-col">
        <AdminHeader />
        <div className="p-6 flex-1">
          {/* Pass setActiveMenu to pages via Outlet context */}
          <Outlet context={{ setActiveMenu }} />
        </div>
      </div>
    </div>
  );
}
