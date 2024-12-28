import { ApiError } from "./../utils/ApiError.js";
import { User } from "./../models/users.model.js";
import { asyncHandler } from "./../utils/asyncHandler.js"
import jwt from "jsonwebtoken";
/**
 * @author Shoyeb Ansari
 * Function to  verify token at current session
 */
export const verifyJWT = asyncHandler (async (req, _, next) => {

    try {
        // current access token
        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer " , "");
        
        if (!token) {
            throw new ApiError(401, "Unauthorised request");
        }

        // Decoded token
        const decodeToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        
        // Find user by id of the user which we can get from decodedToken         
        const user = await User.findById(decodeToken._id).select("-password -refreshToken");

        // If it doesn't exist remove it
        if (!user) {
            throw new ApiError(401, "Invalid Access Token");
        }
        
        // Creating new object named user of req object
        req.user = user;
        next(); // give flag to next middleware
    } catch (error) {
        throw new ApiError(401, error?.message || "Invalid access token");
    }
});



export const isLoggedIn = asyncHandler(async (req, res, next) => {
    try {
        // Get token from cookies or Authorization header
        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "");

        // If no token is present, the user is not logged in
        if (!token) {
            return res.status(401).json({ message: "User is not logged in" });
        }

        // Verify the token
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

        // If the token is valid, consider the user logged in
        return res.status(200).json({ message: "User is logged in", userId: decoded._id });
    } catch (error) {
        // Handle invalid or expired token
        return res.status(401).json({ message: "User is not logged in", error: error.message });
    }
});