// import bcrypt from "bcrypt";

// const SALT = 10;

// export const hashPassword = async (password: string) => {
//     return bcrypt.hash(password, SALT);
// };

// export const comparePassword = async (
//     password: string,
//     hash: string
// ) => {
//     return bcrypt.compare(password, hash);
// };


import bcrypt from "bcrypt";
import { env } from "../config/env";

export const hashPassword = async (
    password: string
): Promise<string> => {

    return await bcrypt.hash(
        password,
        env.BCRYPT_ROUNDS
    );

};

export const comparePassword = async (
    password: string,
    hashedPassword: string
): Promise<boolean> => {

    return await bcrypt.compare(
        password,
        hashedPassword
    );

};