import { Router } from "express";
import { updateVideoStatus } from "../controllers/update-status.controller.js";

const router = Router();

router.patch("/:id/update-status", updateVideoStatus);

export default router;