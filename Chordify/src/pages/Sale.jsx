import PhotoUpload from "../components/PhotoUpload";
import ProductDetail from "../components/ProductDetail";
import DescriptionAndPrice from "../components/DescriptionAndPrice";
import { useState } from "react";
import axios from "axios";


function Sale() {

const [images, setImages] = useState([]);
const [name, setName] = useState("");
const [brand, setBrand] = useState("");
const [price, setPrice] = useState("");
const [condition, setCondition] = useState("");
const [type, setType] = useState("");
const [category, setCategory] = useState("guitar");

//handling submit
const handleSubmit = async() => {
    const formData = new FormData();

    formData.append("name", name);
    formData.append("brand", brand);
    formData.append("price", price );
    formData.append("condition", condition );
    formData.append("category", category);

    if(category==="guitar") formData.append("type", type);

    images.forEach(file => formData.append("images", file));

    try {
        const res = await axios.post("http://localhost:5000/products/add", formData, {
            headers:{"Content-Type" : "multipart/form-data"}
        });
        console.log("Product added : ", res.data);
        
    } catch(e) {
        console.error("Error adding product:", e.response?.data || e.message);
    }

}

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
                <PhotoUpload images={images} setImages={setImages}/>  
                <ProductDetail 
                    category={category} 
                    setName={setName} 
                    setPrice={setPrice} 
                    setBrand={setBrand} 
                    setType={setType}
                    setCondition={setCondition}
                />
                <DescriptionAndPrice/>
                <button
                onClick={handleSubmit}
                className="bg-[#4F3D18] text-[#F2A60D] px-6 py-2 rounded-2xl mt-10"
                >submit listing</button>
            </div>

        </div>
    );
}
export default Sale;