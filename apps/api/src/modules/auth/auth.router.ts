import type { RouterConfig } from "../../router";
import { AuthController } from "./auth.controller";

export const authRoutes: RouterConfig = new Map([
    ["/register", { method: "post", handler: AuthController.register }],
    ["/login", { method: "post", handler: AuthController.login }],
    ["/logout", { method: "post", handler: AuthController.logout }],
]);
