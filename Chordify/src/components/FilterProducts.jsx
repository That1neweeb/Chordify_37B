import React from "react";

const guitarBrands = ["Fender", "Gibson", "Ibanez", "Yamaha", "PRS"];

const priceRanges = [
  "0 – 5,000",
  "5,000 – 10,000",
  "10,000 – 20,000",
  "20,000 – 30,000",
  "30,000 – 50,000",
];

const FilterProducts = () => {
  return (
    <div className="flex w-screen h-screen bg-black p-6">
      {/* Sidebar / Filter Box */}
      <div className="w-56 h-fit bg-yellow-400 p-6 rounded-lg shadow-xl flex-shrink-0">
        
        {/* Brand Filter */}
        <h2 className="text-xl font-bold mb-4 text-black">Filter by Brand</h2>
        <ul className="space-y-2 mb-6">
          {guitarBrands.map((brand) => (
            <li key={brand}>
              <label className="flex items-center space-x-3 cursor-pointer hover:opacity-80 transition-opacity">
                <input
                  type="radio"
                  name="brand"
                  className="w-4 h-4 accent-black cursor-pointer"
                />
                <span className="font-medium text-black text-base">
                  {brand}
                </span>
              </label>
            </li>
          ))}
        </ul>

        {/* Price Filter */}
        <h2 className="text-xl font-bold mb-4 text-black">Filter by Price</h2>
        <ul className="space-y-2">
          {priceRanges.map((price) => (
            <li key={price}>
              <label className="flex items-center space-x-3 cursor-pointer hover:opacity-80 transition-opacity">
                <input
                  type="radio"
                  name="price"
                  className="w-4 h-4 accent-black cursor-pointer"
                />
                <span className="font-medium text-black text-base">
                  {price}
                </span>
              </label>
            </li>
          ))}
        </ul>

      </div>
    </div>
  );
};

export default FilterProducts;
