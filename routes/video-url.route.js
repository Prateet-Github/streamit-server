import { Router } from "express";
import { getPreSignedUrl } from "../controllers/video-url.controller.js";

const router = Router();

router.post('/upload-url', getPreSignedUrl);

export default router;