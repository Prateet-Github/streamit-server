import { Router } from "express";
import { getVideoById } from "../controllers/video.controller.js";

const router = Router();

router.get("/:id", getVideoById);

export default router;