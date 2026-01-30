import { Grid, Music, Package, Users, LogOut } from "lucide-react";
import MenuItem from "../components/MenuItem";
import { useLocation, useNavigate } from "react-router-dom";
import chordifylogo from "../assets/images/chordifylogo.png"

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
          active={location.pathname === "/admin/dashboard" || activeMenu === "Dashboard"}
          onClick={() => handleClick("Dashboard", "/admin/dashboard")}
        />


        <MenuItem
          icon={<Package size={20} />}
          text="Product Listing"
          active={location.pathname === "/admin/productlistings" || activeMenu === "Product Listing"}
          onClick={() => handleClick("Product Listing", "/admin/productlistings")}
        />

        <MenuItem
          icon={<Users size={20} />}
          text="User Listing"
          active={location.pathname === "/admin/userlistings" || activeMenu === "User Listing"}
          onClick={() => handleClick("User Listing", "/admin/userlistings")}
        />

        <MenuItem
          icon={<Users size={20} />}
          text="Post Listing"
          active={location.pathname === "/posts" || activeMenu === "post Listing"}
          onClick={() => handleClick("post Listing", "/posts")}
        />
      </nav>
    </div>
  );
}