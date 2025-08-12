const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const cors = require('cors');

const app = express();

const processWebhookData = require("./utils/processWebhook").processWebhookData;
const db = require('./config/db');
const userRoutes = require('./routes/userRoute');

db.connect();
app.use(express.json());

processWebhookData();

app.use(cors({
  origin: "http://localhost:3000",  // frontend URL
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));



app.use("/api", userRoutes);

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
