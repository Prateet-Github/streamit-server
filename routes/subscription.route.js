import { Router } from "express";
import {
  subscribe,
  getSubscriptionStatus,
} from "../controllers/subscription.controller.js";
import { protect } from "../middlewares/auth.middleware.js";

const router = Router();

router.post("/:channelId", protect, subscribe);
router.get("/:channelId", protect, getSubscriptionStatus);

export default router;
