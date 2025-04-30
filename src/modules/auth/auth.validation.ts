import z from "zod";
const loginValidationSchema = z.object({
  body: z.object({
    email: z
      .string({ required_error: "Email is required" })
      .email({ message: "Invalid email address" }),
    password: z.string({ required_error: "Password is required" }),
  }),
});
const registrationValidationSchema = z.object({
  body: z.object({
    fullName: z.string().optional(),
    email: z
      .string({ required_error: "Email is required" })
      .email({ message: "Invalid email address" }),
    password: z
      .string({ required_error: "Password is required" })
      .min(6, "Password must be at least 6 characters"),
  }),
});

export const authValidation = {
  loginValidationSchema,
  registrationValidationSchema,
};
