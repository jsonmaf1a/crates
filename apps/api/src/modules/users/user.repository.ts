import type { ID } from "@crates/shared";
import { db } from "../../db";
import type { UserCreate, UserUpdate } from "../../db/schema";

export const UserRepository = {
    async create(data: UserCreate) {
        return await db
            .insertInto("users")
            .values(data)
            .returning("id")
            .executeTakeFirst();
    },

    async getById(id: ID) {
        return await db
            .selectFrom("users")
            .selectAll()
            .where("id", "=", id)
            .executeTakeFirst();
    },

    async getByEmail(email: string) {
        return await db
            .selectFrom("users")
            .selectAll()
            .where("email", "=", email)
            .executeTakeFirst();
    },

    async deleteById(id: ID) {
        return await db
            .deleteFrom("users")
            .where("id", "=", id)
            .returning("id")
            .executeTakeFirst();
    },

    async updateById(id: ID, data: UserUpdate) {
        return await db
            .updateTable("users")
            .where("id", "=", id)
            .set(data)
            .returningAll()
            .executeTakeFirst();
    },
};
