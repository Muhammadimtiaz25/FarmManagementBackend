const express = require("express");
const Farmer = require("../../models/farmer");
const router = express.Router();

// Get all farmers
router.get("/", async (req, res) => {
  try {
    const farmers = await Farmer.find();
    res.json(farmers);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch farmers" });
  }
});

// Add farmer
router.post("/", async (req, res) => {
  try {
    const newFarmer = new Farmer({
      name: req.body.name,
      priceStatus: req.body.priceStatus,
      email: req.body.email,
      password: req.body.password,
      ownerid: req.body.ownerid,
      ishired: req.body.ishired,
    });
    await newFarmer.save();
    res.status(201).json(newFarmer);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


// Delete farmer
router.delete("/:id", async (req, res) => {
  try {
    const farmer = await Farmer.findByIdAndDelete(req.params.id);
    if (!farmer) return res.status(404).json({ error: "Farmer not found" });
    res.json({ message: "Farmer deleted" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete farmer" });
  }
});

module.exports = router;
