import User from "../models/User.js";
import { errorHandler } from "../utils/error.js";
import bcrypt from "bcrypt";

export const updateUser = async (req, res, next) => {
    if (req.user.id !== req.params.id) {
        return next(errorHandler(401, "You can only update your data!!"));
    }
    try {
        const { username, email, password, profilePicture } = req.body;

        const updateData = { username, email, profilePicture };

        if (password) {
            updateData.password = bcrypt.hashSync(password, 10);
        }

        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            { $set: updateData },
            { new: true }
        );

        if (!updatedUser) {
            return next(errorHandler(404, "User not found"));
        }

        const { password: _, ...rest } = updatedUser._doc;
        res.status(200).json(rest);
    } catch (error) {
        next(error);
    }
};