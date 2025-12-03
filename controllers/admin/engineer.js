const Engineer = require("../../models/engineerModel");

// GET all engineers
exports.getEngineers = async (req, res) => {
  try {
    const engineers = await Engineer.find();
    res.json(engineers);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// POST add engineer
exports.addEngineer = async (req, res) => {
  try {
    const engineer = new Engineer(req.body);
    await engineer.save();
    res.status(201).json(engineer);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// DELETE engineer
exports.deleteEngineer = async (req, res) => {
  try {
    const engineer = await Engineer.findByIdAndDelete(req.params.id);
    if (!engineer) return res.status(404).json({ error: "Engineer not found" });
    res.json({ message: "Engineer deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
