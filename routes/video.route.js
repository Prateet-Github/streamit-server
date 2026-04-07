import { Router } from "express";
import { getVideoById } from "../controllers/video.controller.js";
import { getAllVideos } from "../controllers/video.controller.js";
import { getMyVideos } from "../controllers/video.controller.js";
import { protect } from "../middlewares/auth.middleware.js";
import { searchVideos } from "../controllers/video.controller.js";

const router = Router();

// order matters: specific routes first, then root, then dynamic
router.get("/my-videos", protect, getMyVideos); // specific
router.get("/search", searchVideos);            // search
router.get("/", getAllVideos);                  // root
router.get("/:id", getVideoById);               // dynamic last

export default router;