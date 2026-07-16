

import * as userRepository from "../repositories/user.repository";
//test
import {
    IUser,
    ICreateUser,
    IUpdateUser
} from "../interfaces/User";

import {
    hashPassword
} from "../utils/bcrypt";

import ApiError from "../utils/apiError";

class UserService {

    async createUser(
        user: ICreateUser
    ): Promise<IUser> {

        const emailExists =
            await userRepository.getUserByEmail(
                user.email
            );

        if (emailExists) {

            throw new ApiError(
                409,
                "Email already exists."
            );

        }

        const usernameExists =
            await userRepository.getUserbyUserName(
                user.userName
            );

        if (usernameExists) {

            throw new ApiError(
                409,
                "Username already exists."
            );

        }

        const hashedPassword =
            await hashPassword(
                user.password
            );

        user.password = hashedPassword;

        return await userRepository.createUser(
            user as Omit<IUser, "id" | "createdAt" | "updatedAt">
        );

    }

    async getAllUsers(): Promise<IUser[]> {

        return await userRepository.getAllUsers();

    }

    async getUserById(
        id: string
    ): Promise<IUser> {

        const user =
            await userRepository.getUserById(
                id
            );

        if (!user) {

            throw new ApiError(
                404,
                "User not found."
            );

        }

        return user;

    }

    async updateUser(
        id: string,
        user: IUpdateUser
    ): Promise<IUser> {

        if (user.password) {

            user.password =
                await hashPassword(
                    user.password
                );

        }

        const updated =
            await userRepository.updateUser(
                id,
                user as Omit<IUser, "id" | "createdAt" | "updatedAt">
            );

        if (!updated) {

            throw new ApiError(
                404,
                "User not found."
            );

        }

        return updated;

    }

    async deleteUser(
        id: string
    ): Promise<void> {

        const user = await userRepository.getUserById(id);

        if (!user) {

            throw new ApiError(
                404,
                "User not found."
            );

        }

        await userRepository.deleteUser(id);

    }

}

export default new UserService();