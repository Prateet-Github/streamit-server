import { Router } from "express";
import { subscribe } from "../controllers/subscription.controller.js";
import { protect } from "../middlewares/auth.middleware.js";

const router = Router();

router.post("/:channelId", protect, subscribe);

export default router;
