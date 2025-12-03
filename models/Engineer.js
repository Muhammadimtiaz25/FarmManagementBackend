const mongoose5 = require('mongoose');

const engineerSchema = new mongoose5.Schema({
  ownerid: String,
  name: { type: String, required: true },
  ishired: { type: Boolean, default: false },
  phone: String,
  email: String,
  expertise: { type: String, default: "General" }, 
  status: { type: String, default: "Available" },   
  assignedRobots: [{ type: mongoose5.Schema.Types.ObjectId, ref: 'Robot' }],
  available: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose5.model('Engineer', engineerSchema);

