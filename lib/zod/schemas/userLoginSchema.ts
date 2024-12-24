import z from "zod";

export const userLoginSchema = z.object({
  email: z.string().nonempty("Email is required").email("Not a valid email"),
  password: z
    .string()
    .nonempty("Password is required")
    .min(4, "At least 4 characters"),
});

export type UserLoginFormData = z.infer<typeof userLoginSchema>;
