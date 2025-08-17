import { getErrorMessage, HTTPStatus } from "@crates/shared";
import { CONFIG } from "./config";
import { checkDbConnection } from "./db";
import { authRoutes } from "./modules/auth/auth.router";
import { Router } from "./router";

async function setupRouter() {
    const router = new Router();

    router.get(
        "/status",
        async () => new Response("OK", { status: HTTPStatus.OK }),
    );
    router.registerRoutes("/auth", authRoutes);
    // ...

    return router;
}

async function main() {
    await checkDbConnection();
    const router = await setupRouter();

    console.log(`Server started at ${CONFIG.PORT}`);
    Bun.serve({
        fetch(req) {
            try {
                return router.handle(req);
            } catch (error) {
                console.error(error);
                return new Response(
                    `Unexpected error: ${getErrorMessage(error)}`,
                    {
                        status: HTTPStatus.BAD_REQUEST,
                    },
                );
            }
        },
        port: CONFIG.PORT,
    });
}

main();
