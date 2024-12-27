import mongoose from "mongoose";

const productSchema = mongoose.Schema({
    productName: {
        type: String,
        required: true,
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category"
    },
    price: {
        type: Number,
        requried: true,
    },
    productImage: {
        type: String,
    },
    quantity: {
        type: Number,
        required: true,
        default: 0,
    }

}, {timestamps: true});

export const Product = mongoose.model("Product", productSchema);