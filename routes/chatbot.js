const express = require('express');
const router = express.Router();

// FAQs
const faqs = [
  { q: 'What is FarmBot?', a: 'FarmBot is an automated farming robot that helps with planting, watering, and monitoring crops.' },
  { q: 'How does FarmBot work?', a: 'It works using a combination of hardware, software, and sensors to automate farming tasks.' },
  { q: 'What are the benefits of using FarmBot?', a: 'Saves time, reduces manual labor, increases efficiency, and improves crop yield.' },
  { q: 'How do I set up my FarmBot?', a: 'Follow the setup guide provided in the user manual or on our website.' },
  { q: 'Can I control FarmBot remotely?', a: 'Yes, FarmBot can be controlled remotely through a web or mobile application, allowing you to monitor your farm or garden from anywhere, adjust settings, and receive notifications' },
  
];

// Popular topics
const topics = [
  { title: 'Getting started', desc: 'Learn how to set up your FarmBot' },
  { title: 'Troubleshooting', desc: 'Fix common issues with your FarmBot' },
  { title: 'Shipping & Delivery', desc: 'Track your order and delivery status' },
  { title: 'Billing & Payments', desc: 'Manage your payment methods and subscriptions' }
];

// FAQs endpoint
router.get('/faqs', (req, res) => {
  res.json(faqs);
});

// Topics endpoint
router.get('/topics', (req, res) => {
  res.json(topics);
});

// Chatbot endpoint
router.post('/ask', (req, res) => {
  const { message } = req.body;
  if (!message) return res.status(400).json({ error: 'Provide message' });

  const msg = message.toLowerCase();
  if (msg.includes('farmbot')) return res.json({ reply: faqs[0].a });
  if (msg.includes('work')) return res.json({ reply: faqs[1].a });
  if (msg.includes('benefit')) return res.json({ reply: faqs[2].a });

  res.json({ reply: "Sorry, I didn't understand. Ask about 'FarmBot', 'work' or 'benefit'." });
});

module.exports = router;
