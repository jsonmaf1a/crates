import type { LoginBody, RegisterInput } from "@crates/shared";
import { getCookie } from "../../utils";
import { SessionService } from "../session/session.service";
import { UserService } from "../users/user.service";

export const AuthService = {
    async register(body: RegisterInput) {
        const { password, ...data } = body;
        const hashedPassword = Bun.password.hashSync(password);

        const user = await UserService.create({
            password: hashedPassword,
            ...data,
        });
        if (!user) throw new Error("Failed to create user");

        const session = await SessionService.create(user.id);
        if (!session) throw new Error("Failed to create session");

        return session.id;
    },

    async login(body: LoginBody) {
        const user = await UserService.getByEmail(body.email);
        if (!user) throw new Error("User not found");

        const { password } = body;
        const isPassValid = Bun.password.verifySync(password, user.password);
        if (!isPassValid) throw new Error("Invalid password");

        const session = await SessionService.create(user.id);
        if (!session) throw new Error("Failed to create session");

        return session.id;
    },

    async logout(req: Request) {
        const sessionId = getCookie(req, "session");
        if (!sessionId) throw new Error("Session not found");
        return await SessionService.deleteById(sessionId);
    },
};
