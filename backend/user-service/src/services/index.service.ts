import * as repository from "../repositories/index.repository";
import type { CreateUser, UpdateUser } from "../interfaces/index.interface";
import crypto from "crypto";

const hash = (value: string) => crypto.createHash("sha256").update(value).digest("hex");
export const init = repository.init;
export const getUsers = repository.list;
export const getUser = async (id: string) => { const user = await repository.find(id); if (!user) throw new Error("User not found"); return user; };
export const createUser = (input: CreateUser) => repository.create(input, hash(input.password));
export const updateUser = async (id: string, input: UpdateUser) => { const user = await repository.update(id, input); if (!user) throw new Error("User not found"); return user; };
export const deleteUser = async (id: string) => { if (!(await repository.remove(id))) throw new Error("User not found"); };
