const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const Animal = require("../models/Animal");

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(async () => {
  console.log("Connected to MongoDB");

  const sampleAnimals = [
    {
      name: "Fluffy",
      description: "A playful white cat looking for a loving home.",
      age: 2,
      type: "Cat",
      amountNeeded: 5000,
    },
    {
      name: "Bruno",
      description: "Friendly German Shepherd, loves children and playtime.",
      age: 4,
      type: "Dog",
      amountNeeded: 7000,
    },
    {
      name: "Milo",
      description: "A rescued parrot who sings and mimics human voices.",
      age: 1,
      type: "Bird",
      amountNeeded: 3000,
    },
  ];

  await Animal.deleteMany({});
  await Animal.insertMany(sampleAnimals);

  console.log("Sample animals added!");
  process.exit();
}).catch((err) => {
  console.error("MongoDB connection error:", err);
  process.exit(1);
});
