import express from "express";
import healthRoute from './routes/health.route.js';
import authRoute from './routes/auth.route.js';
import videoUrlRoute from './routes/video-url.route.js';
import confirmUploadRoute from './routes/confirm-upload.route.js';
import updateStatusRoute from './routes/update-status.route.js';
import cors from 'cors';

const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(express.json());

app.use('/api/health', healthRoute);
app.use('/api/auth', authRoute);
app.use('/api/video', videoUrlRoute);
app.use('/api/video', confirmUploadRoute);
app.use('/api/video', updateStatusRoute);

export default app;