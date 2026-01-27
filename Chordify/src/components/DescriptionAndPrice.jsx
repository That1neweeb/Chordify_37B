function DescriptionAndPrice({ description, price, setDescription, errors }) {
  return (
    <div
      className="h-[600px] border-4 rounded-2xl mt-4 w-[90%] flex flex-col px-5"
      style={{
        backgroundColor: "var(--card-bg)",
        borderColor: "var(--border-color)",
        color: "var(--text-color)",
      }}
    >
      <h1 className="font-bold text-2xl mt-8 ml-10">Description & Price</h1>

      <div className="mt-4 ml-10 flex flex-col">
        <label htmlFor="description" className="ml-8">
          Description
        </label>
        <br />
        <textarea
          name="description"
          id="description"
          className="h-40 w-full rounded-xl border-4"
          style={{
            backgroundColor: "var(--bg-color)",
            borderColor: "var(--border-color)",
            color: "var(--text-color)",
          }}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        {errors?.description && (
          <p className="text-red-500 mt-1">{errors.description.message}</p>
        )}
      </div>

      <div className="mt-8 ml-10 flex flex-col">
        <label htmlFor="price" className="ml-8">
          Price
        </label>
        <input
          type="number"
          className="h-10 rounded-xl border-4 mt-4"
          style={{
            backgroundColor: "var(--bg-color)",
            borderColor: "var(--border-color)",
            color: "var(--text-color)",
          }}
          value={price}
          onChange={(e) => setPrice(Number(e.target.value))}
        />
        {errors?.price && (
          <p className="text-red-500 mt-1">{errors.price.message}</p>
        )}
      </div>
    </div>
  );
}

export default DescriptionAndPrice;
