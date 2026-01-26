import React from "react";
import { Grid, Music, Package, Users, LogOut } from "lucide-react";
import MenuItem from "../Adminpart/MenuItem";
import { useLocation, useNavigate } from "react-router-dom";
import chordifylogo from "../../assets/chordifylogo.png";

export default function Sidebar({ activeMenu, setActiveMenu }) {
  const navigate = useNavigate();
  const location = useLocation();

  const handleClick = (menuName, path) => {
    setActiveMenu(menuName);
    navigate(path);
  };

  return (
    //h-screen for half screen side bar
    //no h-screen for full side bar
    <div className="w-64 bg-zinc-900 p-4  flex flex-col "> 
      <div className="flex items-center gap-2 mb-8 p-2">
        <img src ={chordifylogo} alt = "Chordify Logo" className="w-10 h-10 rounded-full object-cover"/>
        <span className="text-xl font-bold">Chordify</span>
      </div>

      <nav className="space-y-2">
        <MenuItem
          icon={<Grid size={20} />}
          text="Dashboard"
          active={location.pathname === "/" || activeMenu === "Dashboard"}
          onClick={() => handleClick("Dashboard", "/")}
        />

        <MenuItem
          icon={<Music size={20} />}
          text="Guitar Listing"
          active={location.pathname === "/guitars" || activeMenu === "Guitar Listing"}
          onClick={() => handleClick("Guitar Listing", "/guitars")}
        />

        <MenuItem
          icon={<Package size={20} />}
          text="Product Listing"
          active={location.pathname === "/products" || activeMenu === "Product Listing"}
          onClick={() => handleClick("Product Listing", "/products")}
        />

        <MenuItem
          icon={<Users size={20} />}
          text="User Listing"
          active={location.pathname === "/users" || activeMenu === "User Listing"}
          onClick={() => handleClick("User Listing", "/users")}
        />
      </nav>
    </div>
  );
}