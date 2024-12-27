import { Product } from "../models/products.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { uploadOnCloudinary } from "../utils/uploadOnCloudinary.js";
import { ApiError } from "../utils/ApiError.js";
import { Category } from "../models/categories.model.js";

export const sendData = asyncHandler( async (req, res) => {
    try {
        const products = await Product.find();
    } catch (error) {
        res.status(500).json({ message : "Server Error", error });
    }
});


export const addProduct = asyncHandler( async (req, res) => {
    try {
        console.log("here");
        
        const { productName, category, price, productImage, quantity, typeOfMaterial } = req.body;
        const filePaths = req.files.map((file) => file.path);
        const productImageUrls = await Promise.all(
            filePaths.map((filePath) => uploadOnCloudinary(filePath))
        );

        const imageUrls = productImageUrls.map((image) => image.url);
        
        console.log(imageUrls);
        
        // const categoryId = await Category.findOne({category});

        const product = await Product.create({
            productName,
            category,
            price,
            productImage: imageUrls,
            quantity,
            typeOfMaterial
        });

        res.status(201).json(new ApiResponse(201, "Product uploaded successfully"));
    } catch (error) {
        throw new ApiError(501, "Could not add the product into product catalogue");
    }
});

export const getProduct = asyncHandler ( async (req, res) => {
    const category = req.query.typeOfMaterial;
    console.log(typeof(category));
    
    if (!category) {
        return res.status(400).send({ error: 'Category is required' });
    }

    try {
        console.log("yaha tak");
        const products = await Product.find({ category: category });
        res.status(201).json(products);
    } catch (error) {
        console.error('Database query error:', error);
        res.status(500).send({ error: 'Server error' });
    }
});