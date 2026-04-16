import { toggleLike, getLikeData } from "../controllers/like.controller.js";
import { Router } from "express";
import { protect } from "../middlewares/auth.middleware.js";

const router = Router();

router.post("/:videoId", protect, toggleLike);
router.get("/:videoId", protect, getLikeData);

export default router;
