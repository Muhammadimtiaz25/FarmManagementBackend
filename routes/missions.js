const express = require("express");
const router = express.Router();
const Mission = require("../models/Mission");


// Get all Tunnels
router.get("/", async (req, res) => {
  try {
    const missions = await Mission.find();
    res.json(missions);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch Missions" });
  }
});

// Add Tunnels
router.post("/", async (req, res) => {
  try {
    const newMission = new Mission({
      ownerid: req.body.ownerid,
      startingcountry: req.body.startingcountry,
      startingcity: req.body.startingcity,
      startingarea: req.body.startingarea,
      startinglat: req.body.startinglat,
      startinglon: req.body.startinglon,
      endingcountry: req.body.endingcountry,
      endingcity: req.body.endingcity,
      endingarea: req.body.endingarea,
      endinglat: req.body.endinglat,
      endinglon: req.body.endinglon,
    });
    await newMission.save();
    res.status(201).json(newMission);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


// Delete Tunnels
router.delete("/:id", async (req, res) => {
  try {
    const mission = await Mission.findByIdAndDelete(req.params.id);
    if (!mission) return res.status(404).json({ error: "Mission not found" });
    res.json({ message: "Mission deleted" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete Mission" });
  }
});


module.exports = router;
