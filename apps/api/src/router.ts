import {
    HTTPStatus,
    type HttpMethod,
} from "@crates/shared";

export type RouteHandler = (
    req: Request,
) => Promise<Response>;

export interface RouterConfig {
    [key: string]: {
        method: HttpMethod;
        handler: RouteHandler;
    };
}

export class Router {
    private routes: RouterConfig = {};

    public registerRoute(
        route: string,
        handler: RouteHandler,
        method: HttpMethod,
    ) {
        this.routes[route] = { handler, method };
    }

    public registerRoutes(
        basePath: string,
        routes: RouterConfig,
    ) {
        for (const route in routes) {
            this.registerRoute(
                basePath + route,
                routes[route].handler,
                routes[route].method,
            );
        }
    }

    public getRoutes() {
        return this.routes;
    }

    public async handle(req: Request): Promise<Response> {
        const url = new URL(req.url);
        const route = this.routes[url.pathname];

        if (
            route &&
            route.method === req.method.toLowerCase()
        ) {
            return route.handler(req);
        }

        return new Response("Not Found", {
            status: HTTPStatus.NOT_FOUND,
        });
    }
}
