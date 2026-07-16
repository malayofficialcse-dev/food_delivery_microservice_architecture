// export enum UserRole {
//     ADMIN = "ADMIN",
//     USER = "USER",
//     RESTAURANT_OWNER = "RESTAURANT_OWNER",
//     DELIVERY_PARTNER = "DELIVERY_PARTNER"
// }

// export interface IUser {

//     id:string;

//     name:string;

//     email:string;

//     phone:string;

//     userName:string;

//     password:string;

//     role:UserRole;

//     createdAt:Date;

//     updatedAt:Date;
// }



export enum UserRole {
    ADMIN = "ADMIN",
    USER = "USER",
    RESTAURANT_OWNER = "RESTAURANT_OWNER",
    DELIVERY_PARTNER = "DELIVERY_PARTNER"
}

export interface IUser {
    id: string;

    name: string;

    email: string;

    phone: string;

    userName: string;

    password: string;

    role: UserRole;

    createdAt: Date;

    updatedAt: Date;
}

export interface ICreateUser {
    name: string;

    email: string;

    phone: string;

    userName: string;

    password: string;

    role?: UserRole;
}

export interface IUpdateUser {
    name?: string;

    email?: string;

    phone?: string;

    userName?: string;

    password?: string;

    role?: UserRole;
}