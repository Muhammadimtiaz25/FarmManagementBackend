require('dotenv').config();
const express = require('express');
const cors = require('cors'); 
const connectDB = require('./database');
const setupSwagger = require('./swagger');  


const engineerRoutes = require("./routes/admin/engineer");
const farmerRoutes = require("./routes/admin/farmer");
const robotRoutes = require("./routes/admin/robot");

const authRoutes = require('./routes/auth');
const dashboardRoutes = require('./routes/dashboard');
const chatbotRoutes = require('./routes/chatbot');
const engineersRoutes = require('./routes/engineers');
const farmersRoutes = require("./routes/farmers");
const robotsRoutes = require('./routes/robots');
const missionsRoutes = require("./routes/missions");
const rentalsRoutes = require("./routes/rentals");
const tunnelRoutes = require("./routes/tunnel");

const app = express();

app.use(cors({
    origin: (origin, callback) => {
        if (!origin) return callback(null, true);
        if (origin.startsWith('http://localhost')) {
            return callback(null, true);
        }
        callback(new Error('Not allowed by CORS'));
    },
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'], 
    allowedHeaders: ['Content-Type', 'Authorization'], 
    credentials: true
}));


app.use(express.json());

connectDB();
setupSwagger(app);  


const engineers = [
  { name: "Ali", expertise: "Precision Spraying", status: "Available" },
  { name: "Sara", expertise: "GPS Navigation", status: "Busy" },
  { name: "Ahmed", expertise: "Soil Analysis", status: "Available" },
];
let batteryStatus = { value: 75 }; 
let chemicalLevel = { value: 60 };

app.get("/engineers-demo", (req, res) => res.json(engineers));
app.get("/battery", (req, res) => res.json(batteryStatus));
app.get("/chemical", (req, res) => res.json(chemicalLevel));


app.use('/auth', authRoutes);
app.use('/dashboard', dashboardRoutes);
app.use('/chatbot', chatbotRoutes);
app.use('/engineers', engineersRoutes);
app.use("/farmers", farmersRoutes);

app.use("/missions", missionsRoutes);
app.use("/rentals", rentalsRoutes);
app.use("/tunnels", tunnelRoutes);


app.use("/admin/engineers", engineerRoutes);
app.use("/admin/farmers", farmerRoutes);
app.use("/admin/robots", robotRoutes);




app.get('/', (req, res) => res.send('Farm Management API Running'));

app.get('/faqs', (req, res) => {
    const faqs = [
        { question: 'What is this app about?', answer: 'This is a farm management API.' },
        { question: 'How to connect to MongoDB?', answer: 'Use the connectDB function in database.js.' }
    ];
    res.json(faqs);
});
const presets = {};

app.get("/api/area", (req, res) => {
  res.json({ width_ft: 200, height_ft: 200 });
});

app.post("/api/presets/:farmerId", (req, res) => {
  const { farmerId } = req.params;
  const data = req.body;
  if (!presets[farmerId]) presets[farmerId] = [];
  presets[farmerId].push(data);
  res.status(201).json({ ok: true, preset: data });
});

app.get("/api/presets/:farmerId", (req, res) => {
  const { farmerId } = req.params;
  res.json(presets[farmerId] || []);
});

app.post("/api/missions", (req, res) => {
  const mission = { id: Date.now().toString(), ...req.body, createdAt: new Date() };
  res.status(201).json({ missionId: mission.id, mission });
});

app.get("/api/mission/:missionId/status", (req, res) => {
  const { side = "right" } = req.query;
  const sensors = {
    temperature_c: (20 + Math.random() * 10).toFixed(1),
    humidity_pct: (40 + Math.random() * 30).toFixed(0),
    light_lux: Math.round(200 + Math.random() * 800),
    motion: Math.random() < 0.2,
  };

  const cameraImage = `https://picsum.photos/seed/${encodeURIComponent(
    req.params.missionId + "_" + side
  )}/600/400`;

  res.json({ side, sensors, cameraImage, timestamp: new Date() });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
