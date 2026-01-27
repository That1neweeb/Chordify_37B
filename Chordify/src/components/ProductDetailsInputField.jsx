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

  const inputStyle = {
    backgroundColor: "var(--bg-color)",
    color: "var(--text-color)",
    border: `1px solid var(--border-color)`,
  };

  const selectStyle = {
    backgroundColor: "var(--bg-color)",
    color: "var(--text-color)",
    border: `1px solid var(--border-color)`,
  };

  const errorStyle = { color: "red", marginTop: "0.25rem" };

  if (category === "guitar") {
    return (
      <div className="flex items-center justify-center w-full h-[200px] gap-80">
        <div>
          <label>Name</label> <br />
          <input
            type="text"
            className="w-80 h-8 rounded-md mt-2"
            style={inputStyle}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          {errors?.name && <p style={errorStyle}>{errors.name.message}</p>}

          <br /><br />
          <label>Brand</label> <br />
          <input
            type="text"
            className="w-80 h-8 rounded-md mt-2"
            style={inputStyle}
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
          />
          {errors?.brand && <p style={errorStyle}>{errors.brand.message}</p>}
        </div>

        <div>
          <label>Condition</label> <br />
          <select
            className="w-80 h-8 rounded-md mt-2"
            style={selectStyle}
            value={condition}
            onChange={(e) => setCondition(e.target.value)}
          >
            <option value="new">New</option>
            <option value="used">Used</option>
          </select>
          {errors?.condition && <p style={errorStyle}>{errors.condition.message}</p>}

          <br /><br />
          <label>Type</label> <br />
          <select
            className="w-80 h-8 rounded-md mt-2"
            style={selectStyle}
            value={type}
            onChange={(e) => setType(e.target.value)}
          >
            <option value="">Select type</option>
            <option value="electric">Electric</option>
            <option value="acoustic">Acoustic</option>
          </select>
          {errors?.type && <p style={errorStyle}>{errors.type.message}</p>}
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
            className="w-80 h-8 rounded-md mt-2"
            style={inputStyle}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          {errors?.name && <p style={errorStyle}>{errors.name.message}</p>}

          <br /><br />
          <label>Brand</label> <br />
          <input
            type="text"
            className="w-80 h-8 rounded-md mt-2"
            style={inputStyle}
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
          />
          {errors?.brand && <p style={errorStyle}>{errors.brand.message}</p>}
        </div>

        <div>
          <label>Condition</label> <br />
          <select
            className="w-80 h-8 rounded-md mt-2"
            style={selectStyle}
            value={condition}
            onChange={(e) => setCondition(e.target.value)}
          >
            <option value="new">New</option>
            <option value="used">Used</option>
          </select>
          {errors?.condition && <p style={errorStyle}>{errors.condition.message}</p>}
        </div>
      </div>
    );
  }

  return null;
}

export default ProductDetailsInputField;
