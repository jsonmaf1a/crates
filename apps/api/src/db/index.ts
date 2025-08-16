import { Kysely, PostgresDialect } from "kysely";
import { Pool } from "pg";
import type { Database } from "./schema.ts";

export const dialect = new PostgresDialect({
    pool: new Pool({
        database: process.env.DATABASE_NAME,
        host: process.env.DATABASE_HOST,
        user: process.env.DATABASE_USERNAME,
        port: process.env.DATABASE_PORT,
        password: process.env.DATABASE_PASSWORD,
        max: process.env.DATABASE_MAX,
    }),
});

export const db = new Kysely<Database>({
    dialect,
});
