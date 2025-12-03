const express4 = require('express');
const router4 = express4.Router();
const auth4 = require('../middleware/auth');
const Engineer = require('../models/Engineer');

/**
 * @swagger
 * tags:
 *   name: Engineers
 *   description: Engineer management (admin only)
 */

/**
 * @swagger
 * /api/engineers:
 *   post:
 *     summary: Add a new engineer (Admin only)
 *     tags: [Engineers]
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
 *                 example: "John Doe"
 *               email:
 *                 type: string
 *                 example: "john@example.com"
 *               phone:
 *                 type: string
 *                 example: "1234567890"
 *     responses:
 *       200:
 *         description: Engineer added successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Engineer'
 *       403:
 *         description: Forbidden (user not admin)
 *       500:
 *         description: Server error
 */
router4.post('/', auth4, async (req, res) => {
  if (req.user.role !== 'admin') return res.status(403).json({ error: 'Forbidden' });
  try {
    const eng = new Engineer(req.body);
    await eng.save();
    res.json(eng);
  } catch (err) { res.status(500).json({ error: 'Server error' }); }
});

/**
 * @swagger
 * /api/engineers:
 *   get:
 *     summary: Get list of all engineers
 *     tags: [Engineers]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of engineers
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Engineer'
 *       500:
 *         description: Server error
 */
router4.get('/', auth4, async (req, res) => {
  try {
    const list = await Engineer.find();
    res.json(list);
  } catch (err) { res.status(500).json({ error: 'Server error' }); }
});

module.exports = router4;
