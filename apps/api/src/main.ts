import { HTTPStatus } from "@crates/shared";

Bun.serve({
    routes: {
        "/api/status": new Response("OK"),
    },

    fetch(req) {
        console.log(req);

        return new Response("Not Found", {
            status: HTTPStatus.NOT_FOUND,
        });
    },
});
