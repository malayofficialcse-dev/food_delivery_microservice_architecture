import Product from "../Models/product.model.ts";
import type { IProduct } from "../Interfaces/product.interface.ts";

export type ProductCreateInput = Omit<
    IProduct,
    "_id" | "id" | "createdAt" | "updatedAt"
>;

export type ProductUpdateInput = Partial<ProductCreateInput>;

export const createProduct = async (
    product: ProductCreateInput
): Promise<IProduct> => {
    return Product.create(product);
};

export const getProducts = async (): Promise<IProduct[]> => {
    return Product.find();
};

export const getProductById = async (
    id: string
): Promise<IProduct | null> => {
    return Product.findById(id);
};

export const getProductBySlug = async (
    slug: string
): Promise<IProduct | null> => {
    return Product.findOne({ slug });
};

export const updateProduct = async (
    id: string,
    updateData: ProductUpdateInput
): Promise<IProduct | null> => {
    return Product.findByIdAndUpdate(id, updateData, {
        new: true,
        runValidators: true,
    });
};

export const deleteProduct = async (id: string): Promise<void> => {
    await Product.findByIdAndDelete(id);
};
