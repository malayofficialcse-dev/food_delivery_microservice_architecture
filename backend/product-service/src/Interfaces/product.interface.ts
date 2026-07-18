import { Document } from "mongoose";

export interface IProduct extends Document {
    productName:string;
    slug:string;
    description:string;
    category:string;
    brand:string;
    price:number;
    discountPrice?:number;
    quantity:number;
    images:string[];
    sellerId:string;
    sellerName?:string;
    isActive:boolean;
    createdAt:Date;
    updatedAt:Date;
}