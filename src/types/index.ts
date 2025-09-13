import { LogInSchema, UserSchema } from "@/schemas/index";
import * as z from "zod";

export type SignUpType = z.infer<typeof UserSchema>;

export type LogInType = z.infer<typeof LogInSchema>;

export type PayloadType = {
  id: string;
  username: string;
  email: string;
};
