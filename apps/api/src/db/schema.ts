import type { ID } from "@crates/shared";
import type {
    ColumnType,
    Generated,
    Insertable,
    Selectable,
    Updateable,
} from "kysely";

export interface Database {
    user: UserTable;
    session: SessionTable;
}

export interface UserTable {
    id: Generated<ID>;
    username: string;
    email: string;
    password: string;
    created_at: ColumnType<Date, string | undefined, never>;
}

export type User = Selectable<UserTable>;
export type UserCreate = Insertable<UserTable>;
export type UserUpdate = Updateable<UserTable>;

export interface SessionTable {
    id: Generated<ID>;
    user_id: ID;
    expires_at: ColumnType<Date, string | undefined, never>;
}

export type Session = Selectable<SessionTable>;
export type SessionCreate = Insertable<SessionTable>;
export type SessionUpdate = Updateable<SessionTable>;
