// import { Request,Response } from "express";

// import * as service from "../services/user.service";

// export const createUser=async(req:Request,res:Response)=>{

//     const user=await service.createUser(req.body);

//     res.status(201).json(user);
// };

// export const getAllUsers=async(req:Request,res:Response)=>{

//     const users=await service.getAllUsers();

//     res.json(users);
// };

// // export const getUserById=async(req:Request,res:Response)=>{

// //     const user=await service.getUserById(req.params.id);

// //     if(!user){

// //         return res.status(404).json({

// //             message:"User Not Found"

// //         });

// //     }

// //     res.json(user);
// // };



// interface UserParams {
//     id: string;
// }

// export const getUserById = async (
//     req: Request<UserParams>,
//     res: Response
// ) => {
//     const user = await service.getUserById(req.params.id);

//     if (!user) {
//         return res.status(404).json({
//             success: false,
//             message: "User not found",
//         });
//     }

//     res.status(200).json({
//         success: true,
//         data: user,
//     });
// };




import { Request, Response } from "express";

import service from "../services/user.service";

export const createUser = async (
    req: Request,
    res: Response
) => {

    try {

        const user = await service.createUser(req.body);

        res.status(201).json({

            success: true,

            data: user

        });

    }

    catch (err) {

        res.status(400).json({

            success: false,

            message: (err as Error).message

        });

    }

};

export const getAllUsers = async (
    req: Request,
    res: Response
) => {

    const users = await service.getAllUsers();

    res.json({

        success: true,

        count: users.length,

        data: users

    });

};

export const getUserById = async (

    req: Request<{ id: string }>,

    res: Response

) => {

    const user = await service.getUserById(req.params.id);

    if (!user) {

        return res.status(404).json({

            success: false,

            message: "User not found"

        });

    }

    res.json({

        success: true,

        data: user

    });

};

export const updateUser = async (

    req: Request<{ id: string }>,

    res: Response

) => {

    const user = await service.updateUser(

        req.params.id,

        req.body

    );

    res.json({

        success: true,

        data: user

    });

};

export const deleteUser = async (

    req: Request<{ id: string }>,

    res: Response

) => {

    await service.deleteUser(req.params.id);

    res.json({

        success: true,

        message: "User deleted"

    });

};