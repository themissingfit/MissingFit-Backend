import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken"
import { User } from "../models/user.model.js";

export const verifyJwt = async (req, res, next) => {
    try {
        const token =
            req.cookies?.accessToken ||
            req.header("Authorization")?.replace("Bearer ", "");

        if (!token) {
            return res.status(401).json({ message: "No token" });
        }

        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

        const user = await User.findById(decoded._id).select(
            "-password -refreshToken"
        );

        if (!user) {
            return res.status(401).json({ message: "User not found" });
        }
        console.log("Cookies:", req.cookies);
        console.log("Auth header:", req.headers.authorization);

        req.user = user;
        next();
    } catch (err) {
        console.error("JWT ERROR:", err.message);
        return res.status(401).json({ message: "Invalid token" });
    }
};
