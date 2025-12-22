

function ProductDetailsInputField({ category }) {
  if (category === "guitar") {
   
    return (
      <div className="flex items-center justify-center w-full h-[200px] gap-80">
        <div>
          <label htmlFor="name">Name</label> <br />
          <input type="text" className="w-80 h-8 rounded-md bg-[#181611] mt-2" />
          <br /><br />
          <label htmlFor="brand">Brand</label> <br />
          <input type="text" className="w-80 h-8 rounded-md bg-[#181611] mt-2" />
        </div>

        <div>
          <label htmlFor="condition">Condition</label> <br />
          <select name="condition" id="" className="w-80 h-8 rounded-md bg-[#181611] mt-2" >
            <option value="new">New</option>
            <option value="used">Used</option>
          </select>
          <br /><br />
          <label htmlFor="type">Type</label> <br />
            <select name="condition" id="" className="w-80 h-8 rounded-md bg-[#181611] mt-2" >
                <option value="electric">Electric</option>
                <option value="acoustic">Acoustic</option>
            </select>
        </div>
      </div>
    );
  } else if (category === "accessories") {
 
    return (
      <div className="flex  justify-center w-full h-[200px] gap-80">
        <div>
          <label htmlFor="name">Name</label> <br />
          <input type="text" className="w-80 h-8 rounded-md bg-[#181611] mt-2" />
          <br /><br />
          <label htmlFor="brand">Brand</label> <br />
          <input type="text" className="w-80 h-8 rounded-md bg-[#181611] mt-2" />
        </div>

        <div>
          <label htmlFor="condition">Condition</label> <br />
          <input type="text" className="w-80 h-8 rounded-md bg-[#181611]" />
        </div>
      </div>
    );
  }

  return null;
}



export default ProductDetailsInputField;