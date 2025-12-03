const mongoose2 = require('mongoose');

const robotSchema = new mongoose2.Schema({
   ownerid: String,
  name: { type: String, required: true },
  ishired: { type: Boolean, default: false },
  model: String,
  status: { type: String, enum: ['available','rented','maintenance','Idle'], default: 'available' },
  battery: { type: Number, default: 100 },
  remainingSpray: { type: Number, default: 100 },
  location: String,
  rentPricePerMonth: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose2.model('Robot', robotSchema);