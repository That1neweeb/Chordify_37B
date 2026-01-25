import z from "zod";

export const registerSchema = z.object({
    full_name: z
    .string()
    .nonempty({message: "Fullname cannot be empty"})
    .min(3, {message: "Name must be atleast 3 characters"})
    .regex(/^[A-Za-z\s]+$/, {message: "Name can only contain letters"}),

    email: z
    .string()
    .nonempty({message: "Email cannot be empty"})
    // .min(150, {message: "Email length exceeded"})
    .regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/,{message: "Invalid email address"}),

    password: z
    .string()
    .nonempty({message: "Password cannot be empty"})
    .min(8, "Password must be at least 8 characters")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/,
      "Must include upper, lower, number & special character"
    ),
    
    c_password: z
    .string()
    .nonempty({ message: "Confirm password cannot be empty" }),


}).refine((data) => data.password === data.c_password, {
  message: "Passwords do not match",
  path: ["c_password"],
});

export const loginSchema = z.object({
    email: z
    .string()
    .nonempty({message: "Email cannot be empty"}),
 
    
    password: z
    .string()
    .nonempty({message: "Password cannot be empty"})

})