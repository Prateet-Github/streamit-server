import { Router } from "express";
import { getChannelProfile } from "../controllers/channel.controller.js";

const router = Router();

router.get("/:username", getChannelProfile);

export default router;