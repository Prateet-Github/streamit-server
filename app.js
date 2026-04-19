import express from "express";
import healthRoute from "./routes/health.route.js";
import authRoute from "./routes/auth.route.js";
import videoUrlRoute from "./routes/video-url.route.js";
import confirmUploadRoute from "./routes/confirm-upload.route.js";
import updateStatusRoute from "./routes/update-status.route.js";
import videoRoute from "./routes/video.route.js";
import likeRoute from "./routes/like.route.js";
import commentRoute from "./routes/comment.route.js";
import subscriptionRoute from "./routes/subscription.route.js";
import cors from "cors";

const app = express();

app.use(
  cors({
    origin: true,
    credentials: true,
  }),
);
app.use(express.json());

app.use("/api/health", healthRoute);
app.use("/api/auth", authRoute);
app.use("/api/video", videoUrlRoute);
app.use("/api/video", confirmUploadRoute);
app.use("/api/video", updateStatusRoute);
app.use("/api/video", videoRoute);
app.use("/api/like", likeRoute);
app.use("/api/comment", commentRoute);
app.use("/api/subscription", subscriptionRoute);
export default app;
