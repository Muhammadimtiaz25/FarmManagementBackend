const express = require("express");
const router = express.Router();
const Rental = require("../models/Rental");
const Booking = require("../models/Booking");

// Get all rental plans
router.get("/", async (req, res) => {
  try {
    const rentals = await Rental.find();
    res.json(rentals);
  } catch (err) {
    res.status(500).json({ error: "Server Error" });
  }
});

// Book a rental plan
router.post("/:id/rent", async (req, res) => {
  try {
    const rental = await Rental.findById(req.params.id);
    if (!rental) return res.status(404).json({ message: "Rental not found" });

    const { userId, duration } = req.body;
    if (!userId || !duration) {
      return res.status(400).json({ message: "userId and duration are required" });
    }

    // Create a booking
    const booking = new Booking({
      rentalId: rental._id,
      userId,
      duration
    });

    await booking.save();

    res.status(200).json({ message: "Rental booked successfully", booking });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
