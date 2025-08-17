import { db } from "../../db";
import type { SessionCreate } from "../../db/schema";

export const SessionRepository = {
    async create(data: SessionCreate) {
        return await db
            .insertInto("sessions")
            .values(data)
            .returning("id")
            .executeTakeFirst();
    },

    async getById(id: string) {
        return await db
            .selectFrom("sessions")
            .selectAll()
            .where("id", "=", id)
            .executeTakeFirst();
    },

    async deleteById(id: string) {
        return await db
            .deleteFrom("sessions")
            .where("id", "=", id)
            .returning("id")
            .executeTakeFirst();
    },
};
