const mongoose = require("mongoose");

const BookingSchema = new mongoose.Schema({
  rentalId: { type: mongoose.Schema.Types.ObjectId, ref: "Rental", required: true },
  userId: { type: String, required: true },   // later you can link with Farmer schema
  bookedAt: { type: Date, default: Date.now },
  duration: { type: String, required: true }
});

module.exports = mongoose.model("Booking", BookingSchema);
