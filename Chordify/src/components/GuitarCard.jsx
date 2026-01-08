import { Link } from "react-router-dom";

function GuitarCard({guitarName, brand, rating, image, price, page, id}) {
    return(

        <Link to={`/products/${id}`}>
            <div className={page === "landing"? "bg-[#27231B] h-[420px] w-[260px] flex flex-col rounded-2xl" : "bg-[#27231B] h-[500px] w-[350px] flex flex-col rounded-2xl cursor-pointer"}>

                {/* if the guitarcard is loaded in buying page it will have rating and model as well */}
                <img src={image} alt={guitarName} className="rounded-2xl"/>
                {page ==="buying" && <p className="ml-4 text-[#ABA6A6] mt-3">{brand}</p>}
                {page === "buying" && <p className="ml-3 text-xs mt-2">{"⭐".repeat(rating)}</p>}
                <h3 className={page === "buying" ? "ml-4 font-bold" : "ml-4 mt-2 font-bold"}>{guitarName}</h3>
                <p className={page==="buying" ? "ml-4 font-bold text-xl" : "ml-4 text-[#ABA6A6] text-sm"}>Rs.{price}</p>
                {page==="landing" && <button className=" bg-[#393328] w-70 py-2 rounded-2xl mt-4 mx-2 mb-2">View details</button>}
            </div>
        </Link>
    );
}

export default GuitarCard