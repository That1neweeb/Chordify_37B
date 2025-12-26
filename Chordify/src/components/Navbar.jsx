import logo from "../assets/images/chordifylogo.png"
import searchIcon from "../assets/images/search.png"
import shoppingcart from "../assets/images/shopping.png"
import coins from "../assets/images/coins.png"
import guitar from "../assets/images/guitar.png"
import aboutus from "../assets/images/information-button.png"
import { Link, useLocation } from "react-router-dom";


function Navbar() {
    
    const location = useLocation(); // it gives the current url path, where we are like (/buy, /sell)
    const isBuyPage = location.pathname.toLowerCase() === "/buy"

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
                <Link to="Buy" className="text-white flex flex-col items-center">
                    <img src={shoppingcart} alt="" className="size-4"/>
                    Buy
                </Link>

                <Link to="Sell" className="text-white flex flex-col items-center">
                    <img src={coins} alt="" className="size-4"/>
                    Sell
                </Link>

                <Link to="Learn" className="text-white flex flex-col items-center">
                   <img src={guitar} alt="" className="size-4"/>
                    Learn
                </Link>

              
                <Link to="Aboutus" className="text-white flex flex-col items-center">
                   <img src={aboutus} alt="" className="size-4"/>
                    About us
                </Link>
            </div>

       
            <div className="mr-6 flex gap-4">
                <Link to={"/login"}>
                    <button className="text-black bg-[#F2A60D] hover:bg-yellow-500 hover:scale-105 transition-all duration-300">Login</button>
                </Link>

                 <Link to="/register">
                    <button className="bg-[#393328] hover:scale-105 transition-all duration-300">Sign up</button>
                </Link>

            </div>
          

     </div>
    );
}

export default Navbar;