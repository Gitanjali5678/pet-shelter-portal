const Donation = require("../models/Donation");
const Animal = require("../models/Animal");

exports.createDonation = async (req, res) => {
  try {
    const { animalId, amount, donorName } = req.body;

    const donation = new Donation({ animalId, amount, donorName });
    await donation.save();

    // Update animal's received amount
    await Animal.findByIdAndUpdate(animalId, {
      $inc: { amountReceived: amount }
    });

    res.status(201).json({ message: "Donation recorded!" });
  } catch (err) {
    console.error("Donation error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

