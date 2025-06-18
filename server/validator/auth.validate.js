import z from "zod";

export const logInSchema = z.object({
  userName: z
    .string()
    .trim()
    .min(5, { message: "User Name must have atleast 5 letters" })
    .max(10, { message: "User Name can not have more than 10 letters" }),
  password: z
    .string()
    .min(6, { message: "Password must be atleast of 6 charecters" })
    .max(16, { message: "Password can not have more than 16 charecters" }),
});

export const signUpSchema = logInSchema.extend({
  name: z
    .string()
    .trim()
    .min(3, { message: "Name must have atleast 3 letters" })
    .max(60, { message: "Name can not have more than 60 letters" }),
  email: z.string().trim().email({ message: "Please Enter a valid email" }),
});
