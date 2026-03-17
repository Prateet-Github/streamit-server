import mongoose from "mongoose";

const videoSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },

  s3Key: { type: String, required: true },

  hlsUrl: { type: String },

  thumbnailKey: { type: String },

  owner: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "User", 
    required: true 
  },

  status: {
    type: String,
    enum: ["PENDING", "PROCESSING", "COMPLETED", "FAILED"],
    default: "PENDING"
  },

  processingProgress: {
    type: Number,
    default: 0
  },

  errorMessage: { type: String },

  duration: { type: Number },

  views: { type: Number, default: 0 },

  visibility: {
    type: String,
    enum: ["PUBLIC", "PRIVATE"],
    default: "PUBLIC"
  }

}, { timestamps: true });

videoSchema.index({ owner: 1, createdAt: -1 });

export const Video = mongoose.model("Video", videoSchema);