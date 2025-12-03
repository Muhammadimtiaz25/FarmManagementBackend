const express = require("express");
const Robot = require("../../models/Robot");

const router = express.Router();

/**
 * GET /admin/robots
 * Fetch all robots
 */
router.get("/", async (req, res) => {
  try {
    const robots = await Robot.find();
    res.json(robots);
  } catch (error) {
    console.error("Error fetching robots:", error);
    res.status(500).json({ error: "Failed to fetch robots" });
  }
});

/**
 * POST /admin/robots
 * Add a new robot
 */
router.post("/", async (req, res) => {
  try {
    // DB میں موجود سب robots لیں
    const lastRobot = await Robot.findOne().sort({ createdAt: -1 });

    // last robot کے نام سے نمبر نکالیں
    let nextNumber = 1;
    if (lastRobot && lastRobot.name.match(/Robot (\d+)/)) {
      nextNumber = parseInt(lastRobot.name.match(/Robot (\d+)/)[1]) + 1;
    }

    const newRobot = new Robot({
      name: req.body.name , 
      ishired: req.body.ishired,
      ownerid: req.body.ownerid,  // ← backend خود نام دے رہا ہے
      model: req.body.model || "",
      status: req.body.status || "available",
      battery: req.body.battery || 100,
      remainingSpray: req.body.remainingSpray || 100,
      location: req.body.location || "",
      rentPricePerMonth: req.body.rentPricePerMonth || 0
    });

    await newRobot.save();
    res.status(201).json({ message: "Robot added successfully", robot: newRobot });
  } catch (error) {
    console.error("Error adding robot:", error);
    res.status(500).json({ error: "Failed to add robot" });
  }
});


/**
 * PATCH /admin/robots/:id
 * Update an existing robot
 */
router.patch("/:id", async (req, res) => {
  try {
    const updates = req.body;
    const updatedRobot = await Robot.findByIdAndUpdate(req.params.id, updates, { new: true });

    if (!updatedRobot) {
      return res.status(404).json({ error: "Robot not found" });
    }

    res.json(updatedRobot);
  } catch (error) {
    console.error("Error updating robot:", error);
    res.status(500).json({ error: "Failed to update robot" });
  }

});

/**
 * DELETE /admin/robots/:id
 * Delete a robot
 */
router.delete("/:id", async (req, res) => {
  try {
    const robot = await Robot.findByIdAndDelete(req.params.id);

    if (!robot) {
      return res.status(404).json({ error: "Robot not found" });
    }

    res.json({ message: "Robot deleted" });
  } catch (error) {
    console.error("Error deleting robot:", error);
    res.status(500).json({ error: "Failed to delete robot" });
  }
});

module.exports = router;
