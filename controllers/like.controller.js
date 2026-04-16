import Like from "../models/Like.model.js";
import { Video } from "../models/Video.model.js";
import mongoose from "mongoose";

export const toggleLike = async (req, res) => {
  try {
    const userId = req.user.id;
    const { videoId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(videoId)) {
      return res.status(400).json({ message: "Invalid video ID" });
    }

    const existingLike = await Like.findOne({
      user: userId,
      video: videoId,
    });

    // unlike
    if (existingLike) {
      await existingLike.deleteOne();

      await Video.findByIdAndUpdate(videoId, {
        $inc: { likesCount: -1 },
      });

      return res.status(200).json({
        liked: false,
        message: "Video unliked",
      });
    }

    // like
    await Like.create({
      user: userId,
      video: videoId,
    });

    await Video.findByIdAndUpdate(videoId, {
      $inc: { likesCount: 1 },
    });

    res.status(200).json({
      liked: true,
      message: "Video liked",
    });
  } catch (error) {
    console.error("Toggle like error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const getLikeData = async (req, res) => {
  try {
    const userId = req.user?.id;
    const { videoId } = req.params;

    const video = await Video.findById(videoId).select("likesCount");

    if (!video) {
      return res.status(404).json({ message: "Video not found" });
    }

    let liked = false;

    if (userId) {
      liked = await Like.exists({
        user: userId,
        video: videoId,
      });
    }

    res.json({
      likesCount: video.likesCount,
      liked: !!liked,
    });
  } catch (error) {
    console.error("Like data error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
