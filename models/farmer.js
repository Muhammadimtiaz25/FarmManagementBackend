
const mongoose = require('mongoose');

const FarmerSchema = new mongoose.Schema({
  ownerid: String,
  name: { type: String, required: true },
  ishired: { type: Boolean, default: false },
  email: { type: String, },
  priceStatus: { type: String, default: "pending" },
  password: { type: String,  },
  phone: String,
  farmLocation: String,
  cropType: String,
});
 



// ✅ Reuse model if it already exists to avoid OverwriteModelError
module.exports = mongoose.models.Farmer || mongoose.model('Farmer', FarmerSchema);
