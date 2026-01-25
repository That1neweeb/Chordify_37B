import { z } from "zod";

export const productSchema = z.object({
  // ProductDetailsInputField fields
  name: z
    .string()
    .nonempty({ message: "Name cannot be empty" })
    .min(2, { message: "Name must be at least 2 characters" }),
  
  brand: z
    .string()
    .nonempty({ message: "Brand cannot be empty" })
    .min(2, { message: "Brand must be at least 2 characters" }),

  condition: z
    .string()
    .nonempty({ message: "Condition cannot be empty" })
    .refine((val) => ["new", "used"].includes(val), { message: "Condition must be 'new' or 'used'" }),

  type: z
    .string()
    .optional()
    .refine((val) => ["electric", "acoustic"].includes(val), { message: "Type must be electric or acoustic" }),

  category: z
    .string()
    .nonempty({ message: "Category is required" })
    .refine((val) => ["guitar", "accessories"].includes(val), { message: "Invalid category" }),

  // DescriptionAndPrice fields
  description: z
    .string()
    .nonempty({ message: "Description cannot be empty" })
    .min(10, { message: "Description must be at least 10 characters" }),

  price: z
    .number({ invalid_type_error: "Price must be a number" })
    .min(0, { message: "Price cannot be negative" }),

  // Image validation
  image_files: z
    .array(z.instanceof(File))
    .min(1, { message: "At least one image is required" })
    .max(4, { message: "You can upload at most 4 images" })
    .refine(files => files.every(file => file.size <= 5 * 1024 * 1024), { message: "Each file must be ≤ 5MB" })
    .refine(files => files.every(file => ["image/jpeg","image/png"].includes(file.type)), { message: "Only PNG or JPG allowed" }),

}).refine((data) => {
  // If category is guitar, type is required
  if (data.category === "guitar") return !!data.type;
  return true;
}, { message: "Type is required for guitars", path: ["type"] });
