import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';

import {processWebhookData} from './utils/processWebhook.js';
import db from './config/db.js';
import userRoutes from './routes/userRoute.js';

dotenv.config();

const app = express();

// Connect to database
db.connect();

// Middleware
app.use(express.json());

processWebhookData();

app.use(cors({
  origin: "http://localhost:3000",  // frontend URL
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

// Routes
app.use("/api", userRoutes);

// Root endpoint
app.get("/", (req, res) => {
  return res.json({
    success: true,
    message: "Your server is running",
  });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
