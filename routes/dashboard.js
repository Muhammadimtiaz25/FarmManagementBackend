const express5 = require('express');
const router5 = express5.Router();
const auth5 = require('../middleware/auth');
const Robot5 = require('../models/Robot');
const Rental5 = require('../models/Rental');

/**
 * @swagger
 * tags:
 *   name: Dashboard
 *   description: Admin dashboard statistics
 */

/**
 * @swagger
 * /api/dashboard/stats:
 *   get:
 *     summary: Get admin dashboard statistics
 *     tags: [Dashboard]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Returns total robots, available robots, rented robots, and total earnings
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 totalRobots:
 *                   type: integer
 *                   example: 10
 *                 available:
 *                   type: integer
 *                   example: 7
 *                 rented:
 *                   type: integer
 *                   example: 3
 *                 earnings:
 *                   type: number
 *                   example: 5000
 *       403:
 *         description: Forbidden (user not admin)
 *       500:
 *         description: Server error
 */
router5.get('/stats', auth5, async (req, res) => {
  if (req.user.role !== 'admin') return res.status(403).json({ error: 'Forbidden' });
  try {
    const totalRobots = await Robot5.countDocuments();
    const available = await Robot5.countDocuments({ status: 'available' });
    const rented = await Robot5.countDocuments({ status: 'rented' });
    const earnings = await Rental5.aggregate([
      { $group: { _id: null, total: { $sum: '$price' } } }
    ]);
    res.json({ totalRobots, available, rented, earnings: (earnings[0] && earnings[0].total) || 0 });
  } catch (err) { res.status(500).json({ error: 'Server error' }); }
});

module.exports = router5;
