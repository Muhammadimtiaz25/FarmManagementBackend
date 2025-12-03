require('dotenv').config();
const express = require('express');
const serverless = require('serverless-http');  
const connectDB = require('../database');       // path adjust (api se ek level upar)
const setupSwagger = require('../swagger');     // Swagger setup

const app = express();

// Middleware for JSON
app.use(express.json());

// Connect to MongoDB
connectDB();

// Swagger docs route
setupSwagger(app);  // Swagger API docs available at /api-docs

// Routes
const authRoutes = require('../routes/auth');
app.use('/api/auth', authRoutes);

const dashboardRoutes = require('../routes/dashboard');
app.use('/api/dashboard', dashboardRoutes);

const chatbotRoutes = require('../routes/chatbot');
app.use('/api/chatbot', chatbotRoutes);

const engineersRoutes = require('../routes/engineers');
app.use('/api/engineers', engineersRoutes);

// Test Routes
app.get('/', (req, res) => {
  res.send('🚀 Farm Management API Running on Vercel');
});

app.get('/faqs', (req, res) => {
  const faqs = [
    { question: 'What is this app about?', answer: 'This is a farm management API.' },
    { question: 'How to connect to MongoDB?', answer: 'Use the connectDB function in database.js.' }
  ];
  res.json(faqs);
});


module.exports = app;
module.exports.handler = serverless(app);
