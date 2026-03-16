import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { s3 } from "../config/s3.js";
import env from "../config/env.js";
import crypto from "crypto";

export const getPreSignedUrl = async (req, res) => {
  try {
    const { fileName, fileType } = req.body;

    if (!fileName || !fileType) {
      return res.status(400).json({ error: "Missing fileName or fileType" });
    }

    if (!fileType.startsWith("video/")) {
      return res.status(400).json({ error: "Only video files allowed" });
    }

    const uniqueKey = `uploads/${crypto.randomUUID()}`;

    const command = new PutObjectCommand({
      Bucket: env.S3_RAW_BUCKET,
      Key: uniqueKey,
      ContentType: fileType,
    });

    const uploadUrl = await getSignedUrl(s3, command, {
      expiresIn: 3600,
    });

    res.status(200).json({
      uploadUrl,
      key: uniqueKey
    });

  } catch (error) {
    console.error("Error generating pre-signed URL:", error);
    res.status(500).json({ error: "Failed to generate pre-signed URL" });
  }
};