import {Video} from '../models/video.model.js';

export const confirmUpload = async (req, res) => {
  try {
    const {title, description , s3Key} = req.body;


    if (!title || !s3Key) {
      return res.status(400).json({ error: 'Title, description, and s3Key are required' });
    }

    const newVideo = await Video.create({
      title,
      description,
      s3Key,
      owner: req.user.id, 
      status: "PENDING"
    });

    console.log("USER:", req.user);

    // Next step to work on: Add video to processing queue
    // await queue.add("encode-video", { videoId: video._id });

    res.status(201).json({
      message: 'Upload confirmed, video is pending processing',
      video: {
        id: newVideo._id,
        title: newVideo.title,
        description: newVideo.description,
        s3Key: newVideo.s3Key,
        status: newVideo.status
      }
    });

  } catch (error) {
    console.error('Error confirming upload:', error);
    res.status(500).json({ error: 'Failed to confirm upload' });
  }
};