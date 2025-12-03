const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
require('dotenv').config();

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: User authentication
 */

// ---------------- REGISTER ----------------
router.post('/register', async (req, res) => {
    try {
        const { username, password, role } = req.body;

        if (!username || !password) {
            return res.status(400).json({ error: 'Username and password are required' });
        }

        const existingUser = await User.findOne({ username });
        if (existingUser) return res.status(400).json({ error: 'User already exists' });

      
        const userRole = role && ['admin', 'farmer', 'requestAdmin'].includes(role) ? role : 'farmer';

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ username, password: hashedPassword, role: userRole });
        await user.save();

        res.json({ message: 'User registered successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
});

// ---------------- LOGIN ----------------
router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;

        const user = await User.findOne({ username });
        if (!user) return res.status(400).json({ error: 'Invalid credentials' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ error: 'Invalid credentials' });

        const token = jwt.sign(
            { id: user._id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: process.env.TOKEN_EXPIRES_IN || '7d' } 
        );
       
        res.json({
            token,
            role: user.role,
            user: {
                id: user._id,
                username: user.username
            }
        });
    } catch (err) {
        console.error('Login error:', err.message);
        console.error(err.stack);
        res.status(500).json({ error: 'Server error', details: err.message });
    }
});


// ---------------- GET ALL USERS (No Token Needed) ----------------
router.get('/all', async (req, res) => {
  try {
    // 🔓 No authentication check — accessible to everyone
    const users = await User.find().select('-password'); // exclude password
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});


// ---------------- APPROVE REQUEST ADMIN ----------------
router.patch("/approve-admin/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) return res.status(404).json({ error: "User not found" });

    if (user.role !== "requestAdmin") {
      return res
        .status(400)
        .json({ error: "User is not a requestAdmin" });
    }

    user.role = "admin";
    await user.save();

    res.json({ message: "User promoted to admin successfully", user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

// ---------------- DELETE USER ----------------
router.delete("/delete/:id", async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
