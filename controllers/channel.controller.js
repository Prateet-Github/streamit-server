import User from "../models/user.model.js";
import { Video } from "../models/video.model.js";

export const getChannelProfile = async (req, res) => {
  try {
    const { username } = req.params;

    const user = await User.findOne({ username }).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const videos = await Video.find({
      owner: user._id,
      status: "COMPLETED",
    }).sort({ createdAt: -1 });

    res.json({
      user,
      videos,
    });
  } catch (error) {
    console.error("Channel profile error:", error);
    res.status(500).json({ message: "Server error" });
  }
};