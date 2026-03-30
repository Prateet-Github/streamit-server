import { Video } from "../models/video.model.js";

export const updateVideoStatus = async (req, res) => {
  try {
    const {
      status,
      hlsUrl,
      thumbnailKey,
      processingProgress,
      errorMessage
    } = req.body;

    const updateData = {
      status,
      processingProgress
    };

    if (hlsUrl) updateData.hlsUrl = hlsUrl;
    if (thumbnailKey) updateData.thumbnailKey = thumbnailKey;
    if (errorMessage) updateData.errorMessage = errorMessage;

    const video = await Video.findByIdAndUpdate(
      req.params.id,
      updateData,
     { returnDocument: "after" }
    );

    if (!video) {
      return res.status(404).json({ message: "Video not found" });
    }

    res.json(video);

  } catch (error) {
    console.error("Update video error:", error);
    res.status(500).json({ message: "Server error" });
  }
};