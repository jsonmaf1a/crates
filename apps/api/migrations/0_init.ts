import { Kysely, sql } from "kysely";

// biome-ignore lint/suspicious/noExplicitAny: from kysely docs: It's important to use Kysely<any> and not Kysely<YourDatabase>.
export async function up(db: Kysely<any>): Promise<void> {
    await sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`.execute(db);

    await db.schema
        .createTable("users")
        .addColumn("id", "serial", (col) => col.primaryKey())
        .addColumn("email", "varchar(50)", (col) => col.notNull().unique())
        .addColumn("username", "varchar(255)", (col) => col.notNull())
        .addColumn("password", "varchar(512)", (col) => col.notNull())
        .addColumn("created_at", "timestamp", (col) =>
            col.defaultTo(sql`now()`).notNull(),
        )
        .execute();

    await db.schema
        .createTable("sessions")
        .addColumn("id", "uuid", (col) =>
            col.primaryKey().defaultTo(sql`uuid_generate_v4()`),
        )
        .addColumn("user_id", "integer", (col) =>
            col.references("users.id").onDelete("cascade").notNull(),
        )
        .addColumn("expires_at", "timestamp", (col) => col.notNull())
        .execute();

    await db.schema
        .createIndex("session_user_id_index")
        .on("sessions")
        .column("user_id")
        .execute();
}

// biome-ignore lint/suspicious/noExplicitAny: from kysely docs: It's important to use Kysely<any> and not Kysely<YourDatabase>.
export async function down(db: Kysely<any>): Promise<void> {
    await sql`DROP EXTENSION IF EXISTS "uuid-ossp"`.execute(db);

    await db.schema.dropTable("users").execute();
    await db.schema.dropTable("sessions").execute();
}
