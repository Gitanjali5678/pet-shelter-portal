// controllers/stripeWebhookController.js
const Stripe = require("stripe");
const Donation = require("../models/Donation");
const Animal = require("../models/Animal");
require("dotenv").config();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

exports.stripeWebhook = async (req, res) => {
  const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;
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
      const donation = await Donation.create({
        animalId: session.metadata.animalId,
        name: session.customer_details?.name || "Anonymous",
        email: session.customer_details?.email || "Not provided",
        amount: session.amount_total / 100,
      });

      // Optional: Update animal's amountReceived
      await Animal.findByIdAndUpdate(session.metadata.animalId, {
        $inc: { amountReceived: donation.amount },
      });

      console.log("✅ Donation saved via Stripe webhook:", donation);
    } catch (err) {
      console.error("❌ Failed to save donation:", err.message);
    }
  }

  res.status(200).json({ received: true });
};
