// models/Donation.js
const mongoose = require("mongoose");

const donationSchema = new mongoose.Schema({
  animalId: { type: mongoose.Schema.Types.ObjectId, ref: "Animal" },
  name: String, // donor name
  email: String, // donor email
  amount: Number,
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Donation", donationSchema);
