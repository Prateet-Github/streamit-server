import { Router } from "express";
import { getVideoById } from "../controllers/video.controller.js";
import { getAllVideos } from "../controllers/video.controller.js";

const router = Router();

router.get("/:id", getVideoById);
router.get("/", getAllVideos);

export default router;