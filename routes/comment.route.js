import { Router } from "express";
import {
  createComment,
  getCommentsByVideo,
} from "../controllers/comment.controller.js";
import { protect } from "../middlewares/auth.middleware.js";

const router = Router();

router.post("/", protect, createComment);
router.get("/video/:videoId", getCommentsByVideo);

export default router;
