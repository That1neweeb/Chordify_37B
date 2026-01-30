import ProductDetailsInputField from "./ProductDetailsInputField";

function ProductDetail({ 
  category, 
  name, 
  brand, 
  condition, 
  type,
  setName, 
  setBrand, 
  setType, 
  setCondition,
  errors 
}) {
    return (
        <div
          className="h-[350px] border-4 rounded-2xl mt-4 w-[90%] flex flex-col px-5"
          style={{
            backgroundColor: "var(--card-bg)",
            borderColor: "var(--border-color)",
            color: "var(--text-color)"
          }}
        >
            <h1 className="font-bold text-2xl mt-8 ml-10">
                {category === "guitar" ? "Guitar Details" : "Accessory Details"}
            </h1>
            <div className="mt-4">
                <ProductDetailsInputField 
                    category={category}
                    name={name}
                    brand={brand}
                    condition={condition}
                    type={type}
                    setName={setName}
                    setBrand={setBrand}
                    setCondition={setCondition}
                    setType={setType}
                    errors={errors} 
                />
            </div>
        </div>
    );
}

export default ProductDetail;
