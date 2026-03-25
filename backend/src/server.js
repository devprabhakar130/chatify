import express from "express";
import cookieParser from "cookie-parser";
import path from "path";
import cors from "cors";
import fs from "fs";

import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.routes.js";
import { connectDB } from "./lib/db.js";
import { ENV } from "./lib/env.js";
import { app, server } from "./lib/socket.js";

const __dirname = path.resolve();

const PORT = ENV.PORT || 3000;

app.use(express.json({ limit: "5mb" })); // req.body
if (ENV.TRUST_PROXY != null && Number.isFinite(ENV.TRUST_PROXY)) {
  app.set("trust proxy", ENV.TRUST_PROXY);
}

const allowedOrigins =
  ENV.CLIENT_URLS?.length > 0
    ? ENV.CLIENT_URLS
    : ENV.NODE_ENV === "production"
      ? []
      : ["http://localhost:5173"];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);
      if (allowedOrigins.length === 0) return callback(null, false);
      if (allowedOrigins.includes(origin)) return callback(null, true);
      return callback(null, false);
    },
    credentials: true,
  })
);
app.use(cookieParser());

app.get("/api/health", (_, res) => res.status(200).json({ ok: true }));

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

// make ready for deployment
if (ENV.NODE_ENV === "production") {
  const distDir = path.join(__dirname, "../frontend/dist");
  const indexFile = path.join(distDir, "index.html");

  if (fs.existsSync(indexFile)) {
    app.use(express.static(distDir));

    app.get("*", (_, res) => {
      res.sendFile(indexFile);
    });
  }
}

server.listen(PORT, () => {
  console.log("Server running on port: " + PORT);
  connectDB();
});
