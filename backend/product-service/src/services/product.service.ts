import slugify from "slugify";
import * as productRepository from "../repository/product.repository.ts";
import type { IProduct } from "../Interfaces/product.interface.ts";

class ProductService {
    async createProduct(
        productData: productRepository.ProductCreateInput
    ): Promise<IProduct> {
        const slug = slugify(productData.productName, {
            lower: true,
            strict: true,
        });

        const existingProduct = await productRepository.getProductBySlug(slug);

        if (existingProduct) {
            throw new Error("Product with this slug already exists");
        }

        return productRepository.createProduct({
            ...productData,
            slug,
        });
    }

    async getProducts(): Promise<IProduct[]> {
        return productRepository.getProducts();
    }

    async getProductsById(id: string): Promise<IProduct | null> {
        return productRepository.getProductById(id);
    }

    async updateProduct(
        id: string,
        updateData: productRepository.ProductUpdateInput
    ): Promise<IProduct | null> {
        const data = { ...updateData };

        if (data.productName) {
            data.slug = slugify(data.productName, {
                lower: true,
                strict: true,
            });
        }

        return productRepository.updateProduct(id, data);
    }

    async deleteProduct(id: string): Promise<void> {
        await productRepository.deleteProduct(id);
    }
}

export default new ProductService();
