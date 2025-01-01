import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "./../models/users.model.js"
import { ApiError } from "../utils/ApiError.js";
import { CartItem } from "../models/cartItem.model.js";
import { Cart } from "../models/cart.model.js";
import { Product } from "../models/products.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import jwt from "jsonwebtoken";
const addToCart = asyncHandler( async (req, res) => {
    try {
        const { quantity, productId } = req.body;

        // Get the user id 
        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "");
        
        if (!token) {
            throw new ApiError(401, "Unauthorized request");
        }
        const decodeToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        const user = await User.findById(decodeToken._id);

        if (!user) {
            throw new ApiError(401, "Invalid Access Token");
        }
    
        // Find cartId using user id
        const cart = await Cart.findOne({user: user._id});
        
        // If cart is there, then just update the item
        if (!cart) {
            // Create cart for user
            const newCart = await Cart.create({user: user._id});

            const newCartItem = await CartItem.create({
                cart: newCart._id,
                product: productId,
                quantity: Number(quantity)
            });
            
            // Add product in cartItem
            res
                .status(201)
                .json(new ApiResponse(201, newCartItem, "Cart added succefully"));
        }
        // If cart is present
        else {
            // Find row in the cartItem which have the product
            let cartItem = await CartItem.findOne({
                cart: cart._id,
                product: productId
            });

            let finalItem;
            // Means there is cartItem, and we just need to update the quantity by quantity
            if (cartItem) {
                await CartItem.updateOne(
                    {_id: cartItem._id},
                    {
                        $inc: { quantity : Number(quantity)}
                    }
                );
                cartItem = await CartItem.findById(cartItem._id);
            }
            else {
                // Create one and add in the cartItem
                cartItem = await CartItem.create({
                    cart: cart._id,
                    product: productId,
                    quantity: Number(quantity)
                })
            }
            console.log(finalItem);
            
            res
                .status(201)
                .json(new ApiResponse(201, cartItem, "Item added successfully"));
        }
    } catch (error) {
        throw new ApiError(401, error?.message || "Item couldn't be added in cart")
    }
});

export {
    addToCart
};