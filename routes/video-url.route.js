import { Router } from "express";
import { getPreSignedUrl } from "../controllers/video-url.controller.js";
import {protect} from "../middlewares/auth.middleware.js";

const router = Router();

router.post('/upload-url', protect , getPreSignedUrl);

export default router;