import type { ID } from "@crates/shared";
import { SessionRepository } from "./session.repository";

export const SessionService = {
    async create(userId: ID) {
        const nowUtc = new Date();
        const tomorrowUtc = new Date(nowUtc.getTime() + 24 * 60 * 60 * 1000);

        const session = await SessionRepository.create({
            user_id: userId,
            expires_at: tomorrowUtc.toISOString(),
        });
        if (!session) throw new Error("Failed to create session");

        const maxAge = Math.floor(
            (tomorrowUtc.getTime() - nowUtc.getTime()) / 1000,
        );

        return { sessionId: session.id, maxAge };
    },

    async getById(id: string) {
        return SessionRepository.getById(id);
    },

    async deleteById(id: string) {
        const session = await SessionRepository.getById(id);
        if (!session) throw new Error("Session not found");

        return SessionRepository.deleteById(id);
    },
};
