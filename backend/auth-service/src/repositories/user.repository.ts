import { pool } from "../config/db";
import { loadSQL } from "../utils/sqlLoader";
import { IUser } from "../interfaces/User";

export const createUser = async (
    user: Omit<IUser, "id" | "createdAt" | "updatedAt">
): Promise<IUser> => {

    const sql = loadSQL("users/create_user.sql");

    const result = await pool.query(sql,[
        user.name,
        user.email,
        user.phone,
        user.userName,
        user.password,
        user.role || "USER"
    ]);

    return result.rows[0];
};

export const getAllUsers = async ():Promise<IUser[]>=>{

    const sql=loadSQL("users/find_all.sql");

    const result=await pool.query(sql);

    return result.rows;
};

export const getUserById=async(id:string):Promise<IUser|null>=>{

    const sql=loadSQL("users/find_by_id.sql");

    const result=await pool.query(sql,[id]);

    return result.rows[0]??null;
};

export const getUserByEmail=async(email:string):Promise<IUser|null>=>{

    const sql=loadSQL("users/find_by_email.sql");

    const result=await pool.query(sql,[email]);

    return result.rows[0]??null;
};

export const getUserbyUserName = async (username:string) :Promise<IUser | null> => {
    const sql = loadSQL("users/find_by_username.sql");
    const result = await pool.query(sql,[username]);

    return result.rows[0] ?? null;
}

export const deleteUser = async (id:string) => {
    const sql = loadSQL("users/delete_user.sql");

    await pool.query(sql,[id]);
}

export const updateUser = async (id:string,user:Omit<IUser,"id" | "createdAt" | "updatedAt" >): Promise <IUser> => {
    const sql = loadSQL("users/update_user.sql");

    const result = await pool.query(sql,[
        user.name,
        user.email,
        user.phone,
        user.userName,
        user.password,
        user.role,
        id
    ]);

    return result.rows[0];
}


// import { pool } from "../config/db";
// import { IUser, ICreateUser, IUpdateUser } from "../interfaces/User";
// import { loadSQL } from "../utils/sqlLoader";

// export class UserRepository {

//     async createUser(user: ICreateUser): Promise<IUser> {

//         const sql = loadSQL("users/create_user.sql");

//         const result = await pool.query(sql, [

//             user.name,

//             user.email,

//             user.phone,

//             user.userName,

//             user.password,

//             user.role ?? "USER"

//         ]);

//         return result.rows[0];
//     }

//     async getAllUsers(): Promise<IUser[]> {

//         const sql = loadSQL("users/find_all.sql");

//         const result = await pool.query(sql);

//         return result.rows;
//     }

//     async getUserById(id: string): Promise<IUser | null> {

//         const sql = loadSQL("users/find_by_id.sql");

//         const result = await pool.query(sql, [id]);

//         return result.rows[0] ?? null;
//     }

//     async getUserByEmail(email: string): Promise<IUser | null> {

//         const sql = loadSQL("users/find_by_email.sql");

//         const result = await pool.query(sql, [email]);

//         return result.rows[0] ?? null;
//     }

//     async getUserByUserName(userName: string): Promise<IUser | null> {

//         const sql = loadSQL("users/find_by_username.sql");

//         const result = await pool.query(sql, [userName]);

//         return result.rows[0] ?? null;
//     }

//     async updateUser(
//         id: string,
//         user: IUpdateUser
//     ): Promise<IUser | null> {

//         const existing = await this.getUserById(id);

//         if (!existing) return null;

//         const sql = loadSQL("users/update_user.sql");

//         const result = await pool.query(sql, [

//             user.name ?? existing.name,

//             user.email ?? existing.email,

//             user.phone ?? existing.phone,

//             user.userName ?? existing.userName,

//             user.password ?? existing.password,

//             user.role ?? existing.role,

//             id

//         ]);

//         return result.rows[0];
//     }

//     async deleteUser(id: string): Promise<boolean> {

//         const sql = loadSQL("users/delete_user.sql");

//         const result = await pool.query(sql, [id]);

//         return result.rowCount === 1;
//     }

// }

// export default new UserRepository();