// controllers/animalController.js

const Animal = require("../models/Animal");

exports.getAnimals = async (req, res) => {
  try {
    const { sort } = req.query;

    let animals = await Animal.find();

    if (sort === "highNeed") {
      animals = animals.sort((a, b) => {
        const aNeed = (a.amountNeeded || 1000) - (a.amountReceived || 0);
        const bNeed = (b.amountNeeded || 1000) - (b.amountReceived || 0);
        return bNeed - aNeed;
      });
    }

    res.status(200).json(animals);
  } catch (err) {
    console.error("Error fetching animals:", err);
    res.status(500).json({ message: "Failed to fetch animals" });
  }
};

