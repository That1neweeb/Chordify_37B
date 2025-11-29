import logo from "../assets/images/chordifylogo.png"
import searchIcon from "../assets/images/search.png"
import { Link } from "react-router-dom";

function Navbar() {
    return(
        //main div
        <div className="flex items-center justify-between w-full gap-5 mt-5">

            {/* logo section */}

            <Link to="/" className="flex ml-4 gap-4">
                <img src={logo} alt="Logo" className = "size-16"/>
                <h1 className="text-white">Chordify</h1>
            </Link>

            {/* nav links */}
            <div className="flex gap-10">
                <Link to="Buy" className="text-white">Buy</Link>
                <Link to="Sell" className="text-white">Sell</Link>
                <Link to="Learn" className="text-white">Learn</Link>
                <Link to="Aboutus" className="text-white">About us</Link>
            </div>

            {/* search bar */}
            <div className="flex gap-2 bg-[#393328] w-60 h-10 items-center p-2 rounded-md mr-4">
                <img src={searchIcon} alt="Search" className="size-5"/>
                <h3 className="text-[#ABA6A6]">Search</h3>
            </div>
            
        </div>
    );
}

export default Navbar;