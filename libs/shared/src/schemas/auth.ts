import zod from "zod";

export const RegisterSchema = zod
    .object({
        username: zod
            .string()
            .min(3, "Username must be at least 3 characters")
            .max(50, "Username must be at most 50 characters"),

        email: zod
            .email("Invalid email address")
            .max(255, "Username must be at most 255 characters"),

        password: zod
            .string()
            .min(10, "Password must be at least 10 characters")
            .max(512, "Password must be at most 512 characters"),

        confirmPassword: zod.string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords do not match",
        path: ["confirmPassword"],
    });

export const LoginSchema = zod.object({
    email: zod.email(),
    password: zod.string(),
});

export type RegisterBody = zod.infer<typeof RegisterSchema>;
export type RegisterInput = Omit<RegisterBody, "confirmPassword">;
export type LoginBody = zod.infer<typeof LoginSchema>;
