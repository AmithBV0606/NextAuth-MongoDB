import { UserSchema } from "@/schemas";
import * as z from "zod";

export type UserType = z.infer<typeof UserSchema>;
