import type { ID } from "@crates/shared";
import type {
    ColumnType,
    Generated,
    Insertable,
    Selectable,
    Updateable,
} from "kysely";

export interface Database {
    users: UsersTable;
    sessions: SessionsTable;
}

export interface UsersTable {
    id: Generated<ID>;
    username: string;
    email: string;
    password: string;
    created_at: ColumnType<Date, string | undefined, never>;
}

export type User = Selectable<UsersTable>;
export type UserCreate = Insertable<UsersTable>;
export type UserUpdate = Updateable<UsersTable>;

export interface SessionsTable {
    id: ColumnType<string, never, never>;
    user_id: ID;
    expires_at: ColumnType<Date, string | undefined, never>;
}

export type Session = Selectable<SessionsTable>;
export type SessionCreate = Insertable<SessionsTable>;
export type SessionUpdate = Updateable<SessionsTable>;
