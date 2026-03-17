import Router from 'express';
import { confirmUpload } from '../controllers/confirm-upload.controller.js';
import { protect } from '../middlewares/auth.middleware.js';

const router = Router();

router.post('/confirm-upload', protect, confirmUpload);

export default router;