import { HTTPStatus, type HttpMethod } from "@crates/shared";

export type RouteHandler = (req: Request) => Promise<Response>;

export interface RouteData {
    method: HttpMethod;
    handler: RouteHandler;
}

export type RouterConfig = Map<string, RouteData>;

// TODO:
// - middlewares
// - dynamic routes
export class Router {
    private routes: RouterConfig = new Map();

    public registerRoute(
        route: string,
        method: HttpMethod,
        handler: RouteHandler,
    ) {
        this.routes.set(route, { handler, method });
    }

    public registerRoutes(basePath: string, routes: RouterConfig) {
        for (const [route, { handler, method }] of routes.entries()) {
            this.registerRoute(basePath + route, method, handler);
        }
    }

    public async handle(req: Request): Promise<Response> {
        const url = new URL(req.url);
        const route = this.routes.get(url.pathname);

        if (route && route.method.toLowerCase() === req.method.toLowerCase()) {
            return route.handler(req);
        }

        return new Response("Not Found", {
            status: HTTPStatus.NOT_FOUND,
        });
    }

    public async get(route: string, handler: RouteHandler) {
        this.registerRoute(route, "get", handler);
    }
    public async post(route: string, handler: RouteHandler) {
        this.registerRoute(route, "post", handler);
    }
    public async put(route: string, handler: RouteHandler) {
        this.registerRoute(route, "put", handler);
    }
    public async patch(route: string, handler: RouteHandler) {
        this.registerRoute(route, "patch", handler);
    }
    public async update(route: string, handler: RouteHandler) {
        this.registerRoute(route, "update", handler);
    }
    public async delete(route: string, handler: RouteHandler) {
        this.registerRoute(route, "delete", handler);
    }
}
