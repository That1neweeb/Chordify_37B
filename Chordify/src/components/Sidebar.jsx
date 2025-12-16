import React from "react";
import { Grid, Music, Package, Users } from "lucide-react";
import MenuItem from "./MenuItem";

export default function Sidebar({ activeMenu, setActiveMenu }) {
  return (
    <div className="w-64 bg-zinc-900 p-4">
      <div className="flex items-center gap-2 mb-8 p-2">
        <Music className="text-green-500" size={24} />
        <span className="text-xl font-bold">Chordify</span>
      </div>

      <nav className="space-y-2">
        <MenuItem
          icon={<Grid size={20} />}
          text="Dashboard"
          active={activeMenu === "Dashboard"}
          onClick={() => setActiveMenu("Dashboard")}
        />

        <MenuItem
          icon={<Music size={20} />}
          text="Guitar Listing"
          active={activeMenu === "Guitar Listing"}
          onClick={() => setActiveMenu("Guitar Listing")}
        />

        <MenuItem
          icon={<Package size={20} />}
          text="Product Listing"
          active={activeMenu === "Product Listing"}
          onClick={() => setActiveMenu("Product Listing")}
        />

        <MenuItem
          icon={<Users size={20} />}
          text="User Listing"
          active={activeMenu === "User Listing"}
          onClick={() => setActiveMenu("User Listing")}
        />
      </nav>
    </div>
  );
}
