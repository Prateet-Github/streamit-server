import Router from "express";
import env from '../config/env.js';

const router = Router();

router.get('/', (_req, res) => {
  res.status(200).json({ 
    status: 'OK', 
    service: 'Server for StreamIt', 
    environment: env.NODE_ENV,
    uptime: process.uptime()
  });
});

export default router;