import { Comment } from "../models/comment.model.js";
import { Video } from "../models/video.model.js";
import mongoose from "mongoose";

export const createComment = async (req, res) => {
  try {
    const userId = req.user.id;
    const { videoId, content, parentComment } = req.body;

    if (!mongoose.Types.ObjectId.isValid(videoId)) {
      return res.status(400).json({ message: "Invalid video ID" });
    }

    if (!content || content.trim().length === 0) {
      return res
        .status(400)
        .json({ message: "Comment content cannot be empty" });
    }

    const video = await Video.findById(videoId);
    if (!video) {
      return res.status(404).json({ message: "Video not found" });
    }

    if (parentComment) {
      if (!mongoose.Types.ObjectId.isValid(parentComment)) {
        return res.status(400).json({ message: "Invalid parent comment ID" });
      }

      const parent = await Comment.findById(parentComment);
      if (!parent) {
        return res.status(404).json({ message: "Parent comment not found" });
      }
    }

    const comment = await Comment.create({
      user: userId,
      video: videoId,
      content,
      parentComment: parentComment || null,
    });

    // update counts
    if (parentComment) {
      await Comment.findByIdAndUpdate(parentComment, {
        $inc: { repliesCount: 1 },
      });
    } else {
      await Video.findByIdAndUpdate(videoId, {
        $inc: { commentsCount: 1 },
      });
    }

    const populatedComment = await comment.populate("user", "name username");

    res.status(201).json({
      message: "Comment created",
      comment: populatedComment,
    });
  } catch (error) {
    console.error("Error creating comment:", error);
    res.status(500).json({ error: "Failed to create comment" });
  }
};

export const getCommentsByVideo = async (req, res) => {
  try {
    const { videoId } = req.params;

    // pagination
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    if (!mongoose.Types.ObjectId.isValid(videoId)) {
      return res.status(400).json({ message: "Invalid video ID" });
    }

    const skip = (page - 1) * limit;

    // fetch top-level comments
    const comments = await Comment.find({
      video: videoId,
      parentComment: null,
    })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .populate("user", "name username");

    // total count (for pagination)
    const total = await Comment.countDocuments({
      video: videoId,
      parentComment: null,
    });

    res.json({
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
      comments,
    });
  } catch (error) {
    console.error("Get comments error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
