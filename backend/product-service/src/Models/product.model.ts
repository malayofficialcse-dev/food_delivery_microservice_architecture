import mongoose,{Schema} from "mongoose";
import type { IProduct } from "../Interfaces/product.interface.ts";

const ProductSchema = new Schema <IProduct> (
    {
        productName:{
            type:String,
            required:true,
            trim:true
        },
        slug:{
            type:String,
            required:true,
            unique:true,
        },
        description:{
            type:String,
            required:true,
        },
        category:{
            type:String,
            required:true,
        },
        brand: {
            type: String,
            default: "",
        },

        price: {
            type: Number,
            required: true,
        },

        discountPrice: {
            type: Number,
            default: 0,
        },

        quantity: {
            type: Number,
            required: true,
        },

        images: [
            {
                type: String,
            },
        ],

        sellerId: {
            type: String,
            required: true,
        },

        sellerName: {
            type: String,
        },

        isActive: {
            type: Boolean,
            default: true,
        },
    },
    {
        timestamps: true,
    
    }
);

export default mongoose.model<IProduct> (
    "Product",
    ProductSchema
);