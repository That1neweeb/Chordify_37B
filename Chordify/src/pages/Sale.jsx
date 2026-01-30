import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { productSchema } from "../schema/product.schema.js";
import ProductDetail from "../components/ProductDetail";
import DescriptionAndPrice from "../components/DescriptionAndPrice";
import PhotoUpload from "../components/PhotoUpload";
import { useApi } from "../hooks/useAPI";
import { toast } from "react-toastify";

function Sale() {
  const { loading, callApi } = useApi();

  const {
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors }
  } = useForm({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: "",
      brand: "",
      condition: "new",
      type: "electric",
      category: "guitar",
      description: "",
      price: "",
      image_files: []
    }
  });

  const images = watch("image_files");

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();

      Object.entries(data).forEach(([key, value]) => {
        if (key === "image_files") {
          value.forEach((file) => formData.append("image_files", file));
        } else {
          formData.append(key, value);
        }
      });

      await callApi("POST", "/products/add", { data: formData });
      toast.success("Product added successfully!");
      reset({
        name: "",
        brand: "",
        condition: "new",
        type: "electric",
        category: "guitar",
        description: "",
        price: "",
        image_files: []
      });
    } catch (e) {
      console.error("Error adding product:", e.response?.data || e.message);
      toast.error("Failed to add product");
    }
  };

  return (
    <div className="h-full">
      {/* Title */}
      <h1
        className="font-bold text-3xl mt-14 ml-20"
        style={{ color: "var(--text-color)" }}
      >
        Sell your Product
      </h1>

      {/* Category Switch */}
      <div
        className="flex ml-16 mt-10 w-[400px] h-[60px] items-center justify-center rounded-3xl border"
        style={{
          backgroundColor: "var(--card-bg)",
          borderColor: "var(--border-color)",
        }}
      >
        {["guitar", "accessories"].map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => setValue("category", cat)}
            className="rounded-3xl w-40 h-10 border"
            style={{
              backgroundColor:
                watch("category") === cat
                  ? "var(--button-bg)"
                  : "transparent",
              color:
                watch("category") === cat
                  ? "var(--link-hover)"
                  : "var(--text-color)",
              borderColor:
                watch("category") === cat
                  ? "var(--link-hover)"
                  : "transparent",
            }}
          >
            {cat === "guitar" ? "Sell guitar" : "Sell accessories"}
          </button>
        ))}
      </div>

      {/* Form Content */}
      <div className="flex flex-col items-center mt-14">
        <PhotoUpload
          images={images}
          setImages={(files) => setValue("image_files", files)}
          errors={errors}
        />

        <ProductDetail
          category={watch("category")}
          name={watch("name")}
          brand={watch("brand")}
          condition={watch("condition")}
          type={watch("type")}
          setName={(val) => setValue("name", val)}
          setBrand={(val) => setValue("brand", val)}
          setCondition={(val) => setValue("condition", val)}
          setType={(val) => setValue("type", val)}
          errors={errors}
        />

        <DescriptionAndPrice
          description={watch("description")}
          price={watch("price")}
          setDescription={(val) => setValue("description", val)}
          setPrice={(val) => setValue("price", val)}
          errors={errors}
        />

        {/* Submit Button */}
        <button
          onClick={handleSubmit(onSubmit)}
          className="px-6 py-2 rounded-2xl mt-10 border font-semibold"
          style={{
            backgroundColor: "var(--button-bg)",
            color: "var(--link-hover)",
            borderColor: "var(--link-hover)",
          }}
        >
          {loading ? "Submitting..." : "Submit Listing"}
        </button>
      </div>
    </div>
  );
}

export default Sale;
