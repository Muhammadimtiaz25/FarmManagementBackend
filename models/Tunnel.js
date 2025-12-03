const mongoose2 = require('mongoose');

const TunnelSchema = new mongoose2.Schema({
   ownerid: String,
  country: { type: String,  },
  city: { type: String,  }, 
  area: { type: String,  },
  lat: { type: Number,  },
  lon: { type: Number,  },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose2.model('Tunnel', TunnelSchema);