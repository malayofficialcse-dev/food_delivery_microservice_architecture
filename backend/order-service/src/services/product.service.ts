import { productService } from "../config/axios";
export interface ProductSnapshot { id:string; productName:string; price:number; image:string; sellerId?:string; }
export const getProduct = async (id:string):Promise<ProductSnapshot> => {
  try { const product=(await productService.get(`/products/${id}`)).data?.data; if(!product) throw new Error();
    return { id:String(product._id ?? product.id), productName:product.productName, price:Number(product.discountPrice || product.price), image:product.images?.[0] || "", sellerId:product.sellerId }; }
  catch { throw new Error(`Product ${id} could not be found`); }
};
