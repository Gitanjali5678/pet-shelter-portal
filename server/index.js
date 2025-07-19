// File: server/index.js
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const animalRoutes = require("./routes/animalRoutes");
const donationRoutes = require("./routes/donationRoutes");
const stripeRoutes = require("./routes/stripeRoutes");
const webhookRoutes = require("./routes/stripeWebhook"); // ✅ make sure this exists

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use("/api/animals", animalRoutes);
app.use("/api/donations", donationRoutes);
app.use("/api/stripe", stripeRoutes);
// Stripe webhook needs raw body
app.use("/api/webhook", webhookRoutes);
app.use(express.json()); // this must come AFTER webhook

mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("✅ MongoDB connected");
    app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
  })
  .catch((err) => console.error("❌ MongoDB connection failed", err));