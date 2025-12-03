const mongoose = require("mongoose");

const missionSchema = new mongoose.Schema({
  ownerid: String,
  startingcountry: { type: String,  },
  startingcity: { type: String,  }, 
  startingarea: { type: String,  },
  startinglat: { type: Number,  },
  startinglon: { type: Number,  },
  endingcountry: { type: String,  },
  endingcity: { type: String,  }, 
  endingarea: { type: String,  },
  endinglat: { type: Number,  },
  endinglon: { type: Number,  },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Mission", missionSchema);
