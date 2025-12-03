// FILE: routes/robots.js
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Robot = require('../models/Robot');

/**
 * @swagger
 * tags:
 *   name: Robots
 *   description: Robot management (CRUD operations)
 */

/**
 * @swagger
 * /api/robots:
 *   post:
 *     summary: Create a new robot (Admin only)
 *     tags: [Robots]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Harvester X"
 *               type:
 *                 type: string
 *                 example: "Harvester"
 *               status:
 *                 type: string
 *                 example: "available"
 *     responses:
 *       200:
 *         description: Robot created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Robot'
 *       403:
 *         description: Forbidden (user not admin)
 *       500:
 *         description: Server error
 */
router.post('/', auth, async (req, res) => {
  if (req.user.role !== 'admin') return res.status(403).json({ error: 'Forbidden' });
  try {
    const robot = new Robot(req.body);
    await robot.save();
    res.json(robot);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

/**
 * @swagger
 * /api/robots:
 *   get:
 *     summary: Get list of all robots
 *     tags: [Robots]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of robots
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Robot'
 *       500:
 *         description: Server error
 */
router.get('/', auth, async (req, res) => {
  try {
    const robots = await Robot.find();
    res.json(robots);
  } catch (err) { res.status(500).json({ error: 'Server error' }); }
});

/**
 * @swagger
 * /api/robots/{id}:
 *   get:
 *     summary: Get a single robot by ID
 *     tags: [Robots]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Robot ID
 *     responses:
 *       200:
 *         description: Robot details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Robot'
 *       404:
 *         description: Robot not found
 *       500:
 *         description: Server error
 */
router.get('/:id', auth, async (req, res) => {
  try {
    const robot = await Robot.findById(req.params.id);
    if (!robot) return res.status(404).json({ error: 'Not found' });
    res.json(robot);
  } catch (err) { res.status(500).json({ error: 'Server error' }); }
});

/**
 * @swagger
 * /api/robots/{id}:
 *   put:
 *     summary: Update a robot (Admin only)
 *     tags: [Robots]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Robot ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               type:
 *                 type: string
 *               status:
 *                 type: string
 *     responses:
 *       200:
 *         description: Updated robot
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Robot'
 *       403:
 *         description: Forbidden (user not admin)
 *       500:
 *         description: Server error
 */
router.put('/:id', auth, async (req, res) => {
  if (req.user.role !== 'admin') return res.status(403).json({ error: 'Forbidden' });
  try {
    const robot = await Robot.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(robot);
  } catch (err) { res.status(500).json({ error: 'Server error' }); }
});

/**
 * @swagger
 * /api/robots/{id}:
 *   delete:
 *     summary: Delete a robot (Admin only)
 *     tags: [Robots]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Robot ID
 *     responses:
 *       200:
 *         description: Robot deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *       403:
 *         description: Forbidden (user not admin)
 *       500:
 *         description: Server error
 */
router.delete('/:id', auth, async (req, res) => {
  if (req.user.role !== 'admin') return res.status(403).json({ error: 'Forbidden' });
  try {
    await Robot.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (err) { res.status(500).json({ error: 'Server error' }); }
});

module.exports = router;
