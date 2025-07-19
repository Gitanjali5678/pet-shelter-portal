require('dotenv').config();
const mongoose = require('mongoose');
const Animal = require('./models/Animal');
const seedData = require('./animal_seed_data.json');

async function seedDB() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB connected");
    await Animal.deleteMany({});
    await Animal.insertMany(seedData);
    console.log("✅ Seed data inserted!");
    await mongoose.disconnect();
  } catch (err) {
    console.error("❌ Error:", err);
  }
}
seedDB();

