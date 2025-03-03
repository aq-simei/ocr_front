import z from "zod";

export const userSignUpFormSchema = z
  .object({
    name: z.string().nonempty("Username is required"),
    password: z
      .string()
      .min(4, "At least 4 characters")
      .nonempty("Password is required"),
    email: z.string().email("Invalid email").nonempty("Email is required"),
    confirmPassword: z.string().nonempty("Password confirmation is required"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type UserSignUpFormData = z.infer<typeof userSignUpFormSchema>;
