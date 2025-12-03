const Robot = require("../../models/robotModel");

// GET all robots
exports.getRobots = async (req, res) => {
  try {
    const robots = await Robot.find();
    res.json(robots);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// POST add robot
exports.addRobot = async (req, res) => {
  try {
    const robot = new Robot(req.body);
    await robot.save();
    res.status(201).json(robot);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// DELETE robot
exports.deleteRobot = async (req, res) => {
  try {
    const robot = await Robot.findByIdAndDelete(req.params.id);
    if (!robot) return res.status(404).json({ error: "Robot not found" });
    res.json({ message: "Robot deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
