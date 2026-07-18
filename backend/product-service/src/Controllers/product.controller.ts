import  type {Request, Response} from "express";
import type ProductService from "../services/user.service.ts";

export const createProduct = async (req:Request,res:Response): Promise<void> => {
    try {
        const product = await ProductService.createProduct(req.body);
        res.status(201).json(
            {
                success:true,
                message:"Product created successfully",
                data:product,
            }
        )
    } catch (error:any) {
        res.status(500).json(
            {
                success:false,
                message:error.message,
            }
        );
    }
}

export const getAllProducts = async (req:Request,res:Response):Product<void> => {
    try {
        const products = await ProductService.getProducts();
        res.status(200).json(
            {
                success:true,
                count:products.length,
                data:products,
            }
        )
    } catch (error:any) {
        res.status(500).json(
            {
                success:false,
                message:error.message, 
            }
        )
    }
}

export const getProductsById = async(req:Request,res:Response):Promise<void> => {
    try {
        const product = await ProductService.getProductsById(
            req.params.id
        );

        if(!product) {
            res.status(404).json(
                {
                    success:false,
                    message:"Product not found"
                }
            );
            return;
        }

        res.status(200).json(
            {
                success:true,
                data:product
            }
        );
    } catch (error:any) {
        res.status(500).json(
            {
                success:false,
                message:error.message,
            }
        );
    }
}

export const updateProduct = async ( req:Request,res:Response) :Promise<void> => {
    try {
        const product = await ProductService.updateProduct(
            req.params.id,
            req.body
        );

        res.status(200).json(
            {
                success:true,
                message:"Product updated successfully",
                data:product,
            }
        )
    } catch (error: any) {
        res.status(500).json(
            {
                success:false,
                message:error.message,
            }
        )
    } 
}

export const deleteProduct = async (req:Request,res:Response) :Promise<void> => {
    try {
        await ProductService.deleteProduct(
            req.params.id
        );

        res.status(200).json(
            {
                success:true,
                message:"Product deleted successfully",
            }
        );
    } catch (error:any) {
        res.status(500).json(
            {
                success:false,
                message:error.message,
            }
        )
    }
}