const express = require("express");
const router = express.Router();
const Tunnel = require("../models/Tunnel");


// Get all Tunnels
router.get("/", async (req, res) => {
  try {
    const tunnels = await Tunnel.find();
    res.json(tunnels);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch Tunnels" });
  }
});

// Add Tunnels
router.post("/", async (req, res) => {
  try {
    const newTunnel = new Tunnel({
      ownerid: req.body.ownerid,
      country: req.body.country,
      city: req.body.city,
      area: req.body.area,
      lat: req.body.lat,
      lon: req.body.lon,
    });
    await newTunnel.save();
    res.status(201).json(newTunnel);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


// Delete Tunnels
router.delete("/:id", async (req, res) => {
  try {
    const tunnel = await Tunnel.findByIdAndDelete(req.params.id);
    if (!tunnel) return res.status(404).json({ error: "Tunnel not found" });
    res.json({ message: "Tunnel deleted" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete farmer" });
  }
});


module.exports = router;
