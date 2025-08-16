import {
    DummyDriver,
    PostgresAdapter,
    PostgresIntrospector,
    PostgresQueryCompiler,
} from "kysely";
import { defineConfig } from "kysely-ctl";
import { dialect } from "../src/db";

export default defineConfig({
    dialect: dialect,
    //   migrations: {
    //     migrationFolder: "migrations",
    //   },
    //   plugins: [],
    //   seeds: {
    //     seedFolder: "seeds",
    //   }
});
