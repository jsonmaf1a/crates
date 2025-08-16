import { Kysely, sql } from "kysely";
import type { Database } from "../src/db/schema";

export async function up(db: Kysely<any>): Promise<void> {
    await db.schema
        .createTable("user")
        .addColumn("id", "serial", (col) =>
            col.primaryKey(),
        )
        .addColumn("email", "varchar(50)", (col) =>
            col.notNull().unique(),
        )
        .addColumn("username", "varchar(50)", (col) =>
            col.notNull(),
        )
        .addColumn("password", "varchar(512)", (col) =>
            col.notNull(),
        )
        .addColumn("created_at", "timestamp", (col) =>
            col.defaultTo(sql`now()`).notNull(),
        )
        .execute();

    await db.schema
        .createTable("session")
        .addColumn("id", "integer", (col) =>
            col.primaryKey(),
        )
        .addColumn("user_id", "integer", (col) =>
            col
                .references("user.id")
                .onDelete("cascade")
                .notNull(),
        )
        .addColumn("expires_at", "timestamp", (col) =>
            col.notNull(),
        )
        .execute();

    await db.schema
        .createIndex("session_user_id_index")
        .on("session")
        .column("user_id")
        .execute();
}

export async function down(db: Kysely<any>): Promise<void> {
    await db.schema.dropTable("user").execute();
    await db.schema.dropTable("session").execute();
}
