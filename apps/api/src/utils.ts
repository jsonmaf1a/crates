export function getCookie(request: Request, name: string): string | undefined {
    const cookieHeader = request.headers.get("Cookie");
    if (!cookieHeader) {
        return undefined;
    }

    const cookies = cookieHeader.split(";");
    for (const cookie of cookies) {
        const [cookieName, ...cookieValueParts] = cookie.trim().split("=");
        if (cookieName === name) {
            return cookieValueParts.join("=");
        }
    }

    return undefined;
}
