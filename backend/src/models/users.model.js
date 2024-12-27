import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    userName: {
        type: String,
        required: true,
        index: true,
        unique: false,
        trim: true
    },
    fullName: {
        type: String,
        required: true,
        lowercase: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        index: true,
    },
    address: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true
    },
    refreshToken: {
        type: String
    },
    contactNumber: {
        type: String,
        trim: true,
        required: true,
    }
}, {timestamps: true});

export const User = mongoose.model("User", userSchema);