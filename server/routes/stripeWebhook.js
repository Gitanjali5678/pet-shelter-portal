const express = require("express");
const router = express.Router();
const Stripe = require("stripe");
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const Donation = require("../models/Donation");

const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

router.post("/webhook", express.raw({ type: "application/json" }), async (req, res) => {
  const sig = req.headers["stripe-signature"];

  let event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
  } catch (err) {
    console.error("Webhook signature verification failed.", err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;

    try {
      await Donation.create({
        animalId: session.metadata.animalId,
        name: session.customer_details?.name || "Anonymous",
        email: session.customer_details?.email || "No Email",
        amount: session.amount_total / 100,
      });
      console.log("✅ Donation saved:", session.id);
    } catch (err) {
      console.error("❌ Failed to save donation:", err.message);
    }
  }

  res.status(200).json({ received: true });
});

module.exports = router;
