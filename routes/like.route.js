import { toggleLike } from "../controllers/like.controller.js";
import { Router } from "express";
import { protect } from "../middlewares/auth.middleware.js";

const router = Router();

router.post("/:videoId", protect, toggleLike);

export default router;
