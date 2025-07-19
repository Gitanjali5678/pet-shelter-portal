const mongoose = require("mongoose");

const animalSchema = new mongoose.Schema({
  name: String,
  type: String,
  age: Number,
  gender: String,
  description: String,
  amountNeeded: Number,
  amountReceived: {
    type: Number,
    default: 0
  },
  image: String
}, { timestamps: true });

module.exports = mongoose.model("Animal", animalSchema);
