import zod from "zod";

export type ID = number;

export type ZodResult<T> =
    | { success: true; data: zod.infer<T> }
    | { success: false; error: unknown };
