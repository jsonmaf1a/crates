import type { ID } from "@crates/shared";
import type { UserCreate, UserUpdate } from "../../db/schema";
import { UserRepository } from "./user.repository";

export const UserService = {
    async create(data: UserCreate) {
        const user = await UserRepository.getByEmail(data.email);
        if (user) throw new Error("A user with this email already exists.");

        return await UserRepository.create(data);
    },

    async getById(id: ID) {
        return await UserRepository.getById(id);
    },

    async getByEmail(email: string) {
        return await UserRepository.getByEmail(email);
    },

    async deleteById(id: ID) {
        const user = await UserRepository.getById(id);
        if (!user) throw new Error("User not found.");

        return await UserRepository.deleteById(id);
    },

    async updateById(id: ID, data: UserUpdate) {
        const user = await UserRepository.getById(id);
        if (!user) throw new Error("User not found.");

        return await UserRepository.updateById(id, data);
    },
};
