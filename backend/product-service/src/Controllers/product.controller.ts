import type { Request, Response } from "express";
import service from "../services/product.service.ts";

export const createProduct = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const product = await service.createProduct(req.body);
        res.status(201).json({
            success: true,
            message: "Product created successfully",
            data: product,
        });
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

export const getAllProducts = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const products = await service.getProducts();
        res.status(200).json({
            success: true,
            count: products.length,
            data: products,
        });
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

export const getProductsById = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const product = await service.getProductsById(req.params.id);

        if (!product) {
            res.status(404).json({
                success: false,
                message: "Product not found",
            });
            return;
        }

        res.status(200).json({
            success: true,
            data: product,
        });
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

export const updateProduct = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const product = await service.updateProduct(req.params.id, req.body);

        if (!product) {
            res.status(404).json({
                success: false,
                message: "Product not found",
            });
            return;
        }

        res.status(200).json({
            success: true,
            message: "Product updated successfully",
            data: product,
        });
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

export const deleteProduct = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        await service.deleteProduct(req.params.id);

        res.status(200).json({
            success: true,
            message: "Product deleted successfully",
        });
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};
