import PhotoUpload from "../components/PhotoUpload";
import ProductDetail from "../components/ProductDetail";
import DescriptionAndPrice from "../components/DescriptionAndPrice";
import { useState } from "react";

function Sale() {

    const [category, setCategory] = useState("guitar");

    return(
        <div className="h-full">
            <h1 className="font-bold text-3xl text-white mt-14 ml-20">Sell your Product</h1>

            <div className="flex ml-16 mt-10 bg-[#393328] w-[400px] h-[60px] items-center justify-center rounded-3xl">
                <button className={
                    `rounded-3xl w-40 focus:outline-none ${
                        category == "guitar" ? "bg-[#4F3D18]" : "bg-[#393328]"
                    }` 
                    }
                    onClick={() => setCategory("guitar")}
                    >
                    <h6 className={
                    `text-center  ${
                        category == "guitar" ? "text-[#F2A60D]" : ""
                    }`}
                    >Sell guitar</h6>
                </button>
                <button className={
                    `rounded-3xl w-40 focus:outline-none ${
                        category == "accessories" ? "bg-[#4F3D18]" :  "bg-[#393328]" 
                    }`
                    }
                    onClick={()=> setCategory("accessories")}
                    >
                    <h6 className={
                    `text-center ${
                        category == "accessories" ? "text-[#F2A60D]" : ""
                    }`}>Sell accessories</h6>


                </button>
            </div>
       
            <div className="flex flex-col items-center mt-14">
                <PhotoUpload/>  
                <ProductDetail category={category}/>
                <DescriptionAndPrice/>
            </div>
        </div>
    );
}
export default Sale;