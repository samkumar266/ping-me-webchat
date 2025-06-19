// backend/src/controller/user.controller.js
import User from "../models/user.model.js";

export const getAllUsers = async (req, res) => {
  try {
    const search = req.query.search;

    const keyword = search
      ? {
          $or: [
            { fullName: { $regex: search, $options: "i" } },
            { email: { $regex: search, $options: "i" } },
          ],
        }
      : {};

    const users = await User.find(keyword)
      .find({ _id: { $ne: req.user._id } })
      .select("-password");

    res.status(200).json(users);
  } catch (error) {
    console.error("Error in getAllUsers:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};
