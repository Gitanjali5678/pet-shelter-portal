const express = require("express");
const router = express.Router();
const Animal = require("../models/Animal");

router.get("/", async (req, res) => {
  try {
    const animals = await Animal.find();
    res.json(animals);
  } catch (error) {
    console.error("Error fetching animals:", error);
    res.status(500).json({ message: "Server Error" });
  }
});

module.exports = router;
