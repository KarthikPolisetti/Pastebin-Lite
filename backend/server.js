
import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { connectDB } from './lib/db.js';
import cookieParser from 'cookie-parser';
import pasteRoutes from "./routes/paste.route.js";

const app=express();
const PORT=process.env.PORT || 5001;

const FRONTEND_ORIGIN = process.env.FRONTEND_ORIGIN || 'http://localhost:5173';

const allowedOrigins = [
  "http://localhost:5173",
  "https://pastebin-lite-topaz.vercel.app"
];

app.use(cors({
  origin: (origin, callback) => {
    // allow server-to-server, curl, health checks
    if (!origin) return callback(null, true);

    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }

    return callback(new Error("Not allowed by CORS"));
  },
  credentials: true,
}));

app.use(express.json());
app.use(cookieParser());
app.use("/api/pastes",pasteRoutes);
app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});
app.listen(PORT,()=>{
    connectDB();
    console.log(`Server running on port no: ${PORT}`);
});