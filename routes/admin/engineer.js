const express = require("express");
const Engineer = require("../../models/Engineer");

const router = express.Router();

// Get all engineers
router.get("/", async (req, res) => {
  try {
    const engineers = await Engineer.find();
    res.json(engineers);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch engineers" });
  }
});

// Add engineer
router.post("/", async (req, res) => {
  try {
    const newEngineer = new Engineer({ name: req.body.name  ,ownerid: req.body.ownerid,ishired: req.body.ishired    ,  phone:req.body.phone,email:req.body.email,expertise:req.body.expertise,status:req.body.status });
    await newEngineer.save();
    res.status(201).json(newEngineer);
  } catch (error) {
    res.status(500).json({ error: "Failed to add engineer" });
  }
});

// Delete engineer
router.delete("/:id", async (req, res) => {
  try {
    const engineer = await Engineer.findByIdAndDelete(req.params.id);
    if (!engineer) return res.status(404).json({ error: "Engineer not found" });
    res.json({ message: "Engineer deleted" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete engineer" });
  }
});

module.exports = router;
