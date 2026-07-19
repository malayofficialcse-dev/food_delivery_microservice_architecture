import slugify from "slugify";
import Product from "../Models/product.model.ts";
import type { IProduct } from "../Interfaces/product.interface.ts";

class ProductService {
    async createProduct(productData: Partial<IProduct>): Promise<IProduct> {
        const slug = slugify(productData.productName || "", { lower: true, strict: true });
        const existingProduct = await Product.findOne({ slug });

        if (existingProduct) {
            throw new Error("Product with this slug already exists");
        }

        const product = await Product.create({
            ...productData,
            slug,
        });

        return product;
    }

    async getProducts(): Promise<IProduct[]> {
        return Product.find();
    }

    async getProductsById(id: string): Promise<IProduct | null> {
        return Product.findById(id);
    }

    async updateProduct(id: string, updateData: Partial<IProduct>): Promise<IProduct | null> {
        if (updateData.productName) {
            updateData.slug = slugify(updateData.productName, { lower: true, strict: true });
        }

        return Product.findByIdAndUpdate(id, updateData, {
            new: true,
            runValidators: true,
        });
    }

    async deleteProduct(id: string): Promise<void> {
        await Product.findByIdAndDelete(id);
    }
}

export default new ProductService();
