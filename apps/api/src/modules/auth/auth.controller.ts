import {
    getErrorMessage,
    HTTPStatus,
    LoginSchema,
    RegisterSchema,
} from "@crates/shared";
import { AuthService } from "./auth.service";

const AUTH_COOKIE = {
    set: (sessionId: string, maxAge: number) =>
        `session=${sessionId}; HttpOnly; Path=/; SameSite=Strict; Secure; Max-Age=${maxAge}`,
    clear: "session=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT",
};

export const AuthController = {
    async register(req: Request): Promise<Response> {
        const raw = await req.json();
        const result = RegisterSchema.safeParse(raw);

        if (!result.success)
            return new Response(getErrorMessage(result.error), {
                status: HTTPStatus.BAD_REQUEST,
            });

        try {
            const { confirmPassword: _, ...data } = result.data;
            const { sessionId, maxAge } = await AuthService.register(data);

            return new Response("User registered successfully", {
                status: HTTPStatus.CREATED,
                headers: {
                    "Set-Cookie": AUTH_COOKIE.set(sessionId, maxAge),
                },
            });
        } catch (error) {
            return new Response(getErrorMessage(error), {
                status: HTTPStatus.CONFLICT,
            });
        }
    },

    async login(req: Request): Promise<Response> {
        const raw = await req.json();
        const result = LoginSchema.safeParse(raw);

        if (!result.success)
            return new Response(getErrorMessage(result.error), {
                status: HTTPStatus.BAD_REQUEST,
            });

        try {
            const { sessionId, maxAge } = await AuthService.login(result.data);

            return new Response("Successfully logged in", {
                status: HTTPStatus.OK,
                headers: {
                    "Set-Cookie": AUTH_COOKIE.set(sessionId, maxAge),
                },
            });
        } catch (error) {
            return new Response(getErrorMessage(error), {
                status: HTTPStatus.UNAUTHORIZED,
            });
        }
    },

    async logout(req: Request) {
        try {
            await AuthService.logout(req);
        } catch (error) {
            console.log(`Logout failed: ${error}`);
        }

        return new Response("Successfully logged out", {
            status: HTTPStatus.OK,
            headers: {
                "Set-Cookie": AUTH_COOKIE.clear,
            },
        });
    },
};
