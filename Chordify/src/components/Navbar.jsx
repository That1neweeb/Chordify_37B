import logo from "../assets/images/chordifylogo.png"
import searchIcon from "../assets/images/search.png"
import shoppingcart from "../assets/images/shopping.png"
import coins from "../assets/images/coins.png"
import guitar from "../assets/images/guitar.png"
import aboutus from "../assets/images/information-button.png"
import user from "../assets/images/user.png"
import downarrow from "../assets/images/down-arrow.png"
import uparrow from "../assets/images/arrow-up.png"
import logout from "../assets/images/logout.png"
import userok from "../assets/images/userok.png"
import cart from "../assets/images/cart.png"
import { Link, useLocation } from "react-router-dom";
import { useState } from "react"


function Navbar() {
    
        const[isOpen, setIsOpen] = useState(false);
        const[selectedItem, setSelectedItem] = useState("");

        const toggleArrowButton = () => {
            setIsOpen(prev => !prev)
        }

        const handleMenuSelect = (item) => {
            setSelectedItem(item);
            setIsOpen(false); // close the menu after anyone of the option that is profile or cart is selected
        };

    
    const location = useLocation(); // it gives the current url path, where we are like (/buy, /sell)
    const isProfilePage = location.pathname.toLowerCase() === "/profilepage"

    return(
        //main div
        <div className="flex items-center justify-between w-full gap-5 mt-5">

            {/* logo section */}

            <Link to="/" className="flex ml-4 gap-4 items-center">
                <img src={logo} alt="Logo" className = "size-16"/>
                <h1 className="text-white text-4xl">Chordify</h1>
            </Link>


            
             {/* nav links */}
            <div className="flex gap-12">
                <Link to="Buy" className="text-white flex items-center gap-1">
                    <img src={shoppingcart} alt="" className="size-4"/>
                    Buy
                </Link>

                <Link to="Sell" className="text-white flex items-center gap-1">
                    <img src={coins} alt="" className="size-4"/>
                    Sell
                </Link>

                <Link to="Learn" className="text-white flex items-center gap-1">
                   <img src={guitar} alt="" className="size-4"/>
                    Learn
                </Link>

              
                <Link to="Aboutus" className="text-white flex items-center gap-1">
                   <img src={aboutus} alt="" className="size-4"/>
                    Contact us
                </Link>
            </div>
            
       
            <div className="mr-6 flex gap-4 mr-20 relative">
                
                    <div className="bg-[#282828] rounded-xl h-12 flex items-center">
                        <button className="bg-transparent border-none outline-none focus:outline-none hover:border-none hover:scale-105 transition-all duration-300 size-16">
                            <img src={user} alt="" />
                        </button>
                        <button className="bg-transparent border-none outline-none focus:outline-none hover:border-none size-16"
                            onClick={toggleArrowButton}
                        >
                            <img src={isOpen? downarrow : uparrow} alt=""className="w-8" />
                        </button>
                    </div>
                {
                    isOpen && (   
                        <div className="absolute mt-20 bg-[#282828] size-44 rounded-xl right-[1px] p-2 flex flex-col gap-4">
                            <ul 
                                onClick={()=>handleMenuSelect("profile")}
                                className={`cursor-pointer hover:bg-[#3A3939] w-full h-10 flex items-center items-center justify-around gap-2 rounded-xl p-2 text-[22px] ${selectedItem === "profile" ? "bg-[#3A3939]" : "bg-transparent"}`}  
                            >
                                Profile
                                <img src={userok} alt="" className="size-5"/>
                            </ul>

                            <Link to="/cart">
                                <ul 
                                    onClick={()=>handleMenuSelect("cart")}
                                    className={`cursor-pointer hover:bg-[#3A3939] w-full h-10 flex items-center items-center justify-around gap-4 rounded-xl p-2 text-[22px] ${selectedItem === "cart" ? "bg-[#3A3939]" : "bg-transparent"}`}
                                >
                                    Cart
                                    <img src={cart} alt="" className="size-5"/>
                                </ul>
                            </Link>
                           
                            <ul className="cursor-pointer hover:bg-[#3A3939] w-full h-10 flex items-center justify-around gap-4 rounded-xl p-2 mr-4 text-[22px]"
                            >
                                Logout
                                <img src={logout} alt="" className="size-5"/>
                            </ul>
                        </div>
                    )
                }

            {/* <Link to="/register">
                    <button className="bg-[#393328] hover:scale-105 transition-all duration-300">Sign up</button>
                </Link> */}



            </div>
          

     </div>
    );
}

export default Navbar;