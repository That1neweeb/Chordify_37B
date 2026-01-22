import logo from "../assets/images/chordifylogo.png";
import shoppingcart from "../assets/images/shopping.png";
import coins from "../assets/images/coins.png";
import guitar from "../assets/images/guitar.png";
import aboutus from "../assets/images/information-button.png";
import userimg from "../assets/images/user.png";
import downarrow from "../assets/images/down-arrow.png";
import uparrow from "../assets/images/arrow-up.png";
import logoutIcon from "../assets/images/logout.png";
import userok from "../assets/images/userok.png";
import cart from "../assets/images/cart.png";

import posts from "../assets/images/live-line.png"
import { Link } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const { isAuthenticated, logout } = useAuth();

  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState("");

  const toggleDropdown = () => setIsOpen((prev) => !prev);
  const handleMenuSelect = (item) => {
    setSelectedItem(item);
    setIsOpen(false);
  };

  return (
    <div className="flex items-center justify-between w-full mt-5 px-6">

      {/* Left: Logo */}
      <Link to="/" className="flex items-center gap-4">
        <img src={logo} alt="Logo" className="size-16" />
        <h1 className="text-white text-4xl">Chordify</h1>
      </Link>

      {/* Center: Buy/Sell/Learn (only if logged in) */}
      <div className="flex gap-8 items-center">
        {isAuthenticated && (
          <>
            <Link to="/buy" className="flex items-center gap-1 text-white">
              <img src={shoppingcart} alt="" className="size-4" /> Buy
            </Link>
            <Link to="/sell" className="flex items-center gap-1 text-white">
              <img src={coins} alt="" className="size-4" /> Sell
            </Link>
            <Link to="/learn" className="flex items-center gap-1 text-white">
              <img src={guitar} alt="" className="size-4" /> Learn
            </Link>
          </>
        )}
      </div>

      {/* Right: Contact Us + Auth */}
      <div className="flex items-center gap-14">

        <Link to="/aboutus" className="flex items-center gap-1 text-white">
          <img src={aboutus} alt="" className="size-4" /> Contact Us
        </Link>

        {/* Auth Buttons or Profile Dropdown */}
        {isAuthenticated ? (
          <div className="relative">
            <div className="bg-[#282828] rounded-xl h-12 flex items-center px-2">
              <button className="size-16 hover:scale-105 transition-all">
                <img src={userimg} alt="User" />
              </button>
              <button onClick={toggleDropdown} className="size-16">
                <img src={isOpen ? downarrow : uparrow} alt="Toggle" className="w-8" />
              </button>
            </div>

            {isOpen && (
              <div className="absolute right-0 mt-2 w-44 bg-[#282828] rounded-xl p-2 flex flex-col gap-3">
                <Link to="/profile" onClick={() => handleMenuSelect("profile")}>
                  <div
                    className={`flex justify-between items-center p-2 rounded-xl hover:bg-[#3A3939] ${
                      selectedItem === "profile" ? "bg-[#3A3939]" : ""
                    }`}
                  >
                    Profile
                    <img src={userok} alt="" className="size-5" />
                  </div>
                </Link>

                <Link to="/cart" onClick={() => handleMenuSelect("cart")}>
                  <div
                    className={`flex justify-between items-center p-2 rounded-xl hover:bg-[#3A3939] ${
                      selectedItem === "cart" ? "bg-[#3A3939]" : ""
                    }`}
                  >
                    Cart
                    <img src={cart} alt="" className="size-5" />
                  </div>
                </Link>

                <div
                  onClick={logout}
                  className="flex justify-between items-center p-2 rounded-xl hover:bg-[#3A3939] cursor-pointer"
                >
                  Logout
                  <img src={logoutIcon} alt="" className="size-5" />
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="flex gap-2">
            <Link to="/login">
              <button className="bg-[#F2A60D] text-black hover:bg-yellow-500 hover:scale-105 transition-all duration-300 px-6 py-1.5 rounded">
                Login
              </button>
            </Link>

            <Link to="/register">
              <button className="bg-[#393328] hover:scale-105 transition-all duration-300 px-6 py-1.5 rounded">
                Sign up
              </button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default Navbar;
