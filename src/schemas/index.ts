import * as z from "zod";

export const UserSchema = z.object({
  username: z
    .string()
    .min(3, "Username should be of atleast 3 characters.")
    .max(30, "Username shouldn't exceed 30 characters."),
  email: z.string().email("Invalid email address"),
  password: z
    .string()
    .min(6, "Password should be of atleast 3 characters.")
    .max(30, "Password shouldn't exceed 30 characters."),
});

export const LogInSchema = UserSchema.omit({ username: true });
