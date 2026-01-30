function ProductDetailsInputField({ 
  category, 
  name, 
  brand, 
  condition, 
  type,
  setName, 
  setBrand, 
  setCondition, 
  setType,
  errors 
}) {
  if (category === "guitar") {
    return (
      <div className="flex items-center justify-center w-full h-[200px] gap-80">
        <div>
          <label>Name</label> <br />
          <input
            type="text"
            className="w-80 h-8 rounded-md bg-[#181611] mt-2"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          {errors?.name && <p className="text-red-500">{errors.name.message}</p>}

          <br /><br />
          <label>Brand</label> <br />
          <input
            type="text"
            className="w-80 h-8 rounded-md bg-[#181611] mt-2"
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
          />
          {errors?.brand && <p className="text-red-500">{errors.brand.message}</p>}
        </div>

        <div>
          <label>Condition</label> <br />
          <select
            className="w-80 h-8 rounded-md bg-[#181611] mt-2"
            value={condition}
            onChange={(e) => setCondition(e.target.value)}
          >
            <option value="new">New</option>
            <option value="used">Used</option>
          </select>
          {errors?.condition && <p className="text-red-500">{errors.condition.message}</p>}

          <br /><br />
          <label>Type</label> <br />
          <select
            className="w-80 h-8 rounded-md bg-[#181611] mt-2"
            value={type}
            onChange={(e) => setType(e.target.value)}
          >
            <option value="">Select type</option>
            <option value="electric">Electric</option>
            <option value="acoustic">Acoustic</option>
          </select>
          {errors?.type && <p className="text-red-500">{errors.type.message}</p>}
        </div>
      </div>
    );
  } else if (category === "accessories") {
    return (
      <div className="flex justify-center w-full h-[200px] gap-80">
        <div>
          <label>Name</label> <br />
          <input
            type="text"
            className="w-80 h-8 rounded-md bg-[#181611] mt-2"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          {errors?.name && <p className="text-red-500">{errors.name.message}</p>}

          <br /><br />
          <label>Brand</label> <br />
          <input
            type="text"
            className="w-80 h-8 rounded-md bg-[#181611] mt-2"
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
          />
          {errors?.brand && <p className="text-red-500">{errors.brand.message}</p>}
        </div>

        <div>
          <label>Condition</label> <br />
          <select
            className="w-80 h-8 rounded-md bg-[#181611] mt-2"
            value={condition}
            onChange={(e) => setCondition(e.target.value)}
          >
            <option value="new">New</option>
            <option value="used">Used</option>
          </select>
          {errors?.condition && <p className="text-red-500">{errors.condition.message}</p>}
        </div>
      </div>
    );
  }

  return null;
}

export default ProductDetailsInputField;
