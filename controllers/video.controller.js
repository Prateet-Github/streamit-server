import { Video } from "../models/video.model.js";

export const getVideoById = async (req, res) => {
  try {
    const { id } = req.params;

    const video = await Video.findById(id).populate(
      "owner",
      "name username email"
    );

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
      owner: video.owner
        ? {
            id: video.owner._id,
            name: video.owner.name,
            username: video.owner.username,
            email: video.owner.email,
          }
        : null,
    });
  } catch (error) {
    console.error("Get video error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const getAllVideos = async (req, res) => {
  try {
    const videos = await Video.find({
      status: "COMPLETED",
      visibility: "PUBLIC",
    })
      .sort({ createdAt: -1 })
      .select("title thumbnailKey hlsUrl createdAt views owner")
      .populate("owner", "name username email"); 

    const formatted = videos.map((video) => ({
      _id: video._id,
      title: video.title,
      thumbnailKey: video.thumbnailKey,
      hlsUrl: video.hlsUrl,
      createdAt: video.createdAt,
      views: video.views,
      owner: video.owner
        ? {
            id: video.owner._id,
            name: video.owner.name,
            username: video.owner.username,
            email: video.owner.email,
          }
        : null,
    }));

    res.json(formatted);
  } catch (error) {
    console.error("Get videos error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const getMyVideos = async (req, res) => {
  try {
    const userId = req.user.id; 

    const videos = await Video.find({
      owner: userId,
    })
      .sort({ createdAt: -1 })
      .select(
        "title thumbnailKey hlsUrl status views createdAt"
      );

    const formatted = videos.map((video) => ({
      _id: video._id,
      title: video.title,
      thumbnailKey: video.thumbnailKey,
      hlsUrl: video.hlsUrl,
      status: video.status,
      views: video.views,
      createdAt: video.createdAt,
    }));

    res.json(formatted);
  } catch (error) {
    console.error("Get my videos error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const searchVideos = async (req, res) => {
  try {
    const { q } = req.query;

    if (!q) {
      return res.status(400).json({ message: "Query is required" });
    }

    const videos = await Video.find({
      title: { $regex: q, $options: "i" },
      status: "COMPLETED",
      visibility: "PUBLIC",
    })
      .sort({ createdAt: -1 })
      .limit(20)
      .select("title thumbnailKey createdAt views owner");

    res.json(videos);
  } catch (error) {
    console.error("Search error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const deleteVideo = async (req, res) => {
  try {

  const {id} = req.params;
    
  const video = await Video.findById(id);

    if(!video){
      return res.status(404).json({ message: "Video not found" });
    }

    if(video.owner.toString() !== req.user.id){
      return res.status(403).json({ message: "Unauthorized" });
    }

  await Video.findByIdAndDelete(id); 

  res.json({message:"Video deleted successfully"})    
  } catch (error) {
    console.error("Delete error:", error);
    res.status(500).json({ message: "Server error" });
  }
};