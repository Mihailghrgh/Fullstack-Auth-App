import express from "express";
import cors from "cors";
import { createServer } from "node:http";
import cookieParser from "cookie-parser";
import errorHandler from "./middleware/errorHandler";
import { authRoutes } from "./routes/auth.route";
import authenticate from "./middleware/authenticate";
import { userRoutes } from "./routes/user.route";
import { sessionRoutes } from "./routes/session.route";
import dotenv from "dotenv";

dotenv.config();
const app = express();
const port = 5000;

app.use(
  cors({
    origin: process.env.FRONTEND_URL as string,
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use((req, res, next) => {
  console.log(`Request: ${req.method} ${req.url}`);
  next();
});

// Health check
app.get("/api/health", (req, res) => {
  res.status(200).json({ status: "ok", server: "running" });
});

// Routes
app.use("/auth", authRoutes);
app.use("/user", authenticate, userRoutes);
app.use("/sessions", authenticate, sessionRoutes);

app.use(errorHandler);

const httpServer = createServer(app);

httpServer.listen(port, () => {
  console.log(`>>>>>>>> Server running on http://localhost:${port}`);
});
