import { Video } from "../models/video.model.js";

export const getVideoById = async (req, res) => {
  try {
    const { id } = req.params;

    const video = await Video.findById(id);

    if (!video) {
      return res.status(404).json({ message: "Video not found" });
    }

    res.json({
      id: video._id,
      title: video.title,
      description: video.description,
      hlsUrl: video.hlsUrl,
      thumbnailKey: video.thumbnailKey,
      status: video.status,
    });
  } catch (error) {
    console.error("Get video error:", error);
    res.status(500).json({ message: "Server error" });
  }
};