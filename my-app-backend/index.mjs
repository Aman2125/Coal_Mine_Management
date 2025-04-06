import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"; // Optionally for token-based authentication
import { createServer } from "http";
import { Server } from "socket.io";

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  }
});

const saltRounds = 10;
const secretKey = "qTYscBcyBGHghCkB/OZv93rDJRYgByojST2rT5XvLYM="; // Replace with your actual secret key

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Database connection
const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/myapp", {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log("DB connected");
  } catch (error) {
    console.error("Error connecting to DB:", error);
    process.exit(1);
  }
};
connectDB();

// Define User model
const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});
const User = mongoose.model("User", userSchema);

// Mock data generators
const generateAirQuality = () => Math.floor(Math.random() * 50) + 50;
const generateSafetyScore = () => Math.floor(Math.random() * 20) + 80;

// Socket.IO Handlers
io.on('connection', (socket) => {
  console.log('Client connected');

  // Send initial data
  socket.emit('initial-data', {
    airQuality: Array(12).fill(0).map(() => generateAirQuality()),
    safetyScore: generateSafetyScore(),
    paperSaved: Math.floor(Math.random() * 1000),
    activeAlerts: Math.floor(Math.random() * 5)
  });

  // Air quality updates
  setInterval(() => {
    socket.emit('air-quality-update', {
      value: generateAirQuality(),
      timestamp: new Date().toISOString()
    });
  }, 5000);

  // Safety score updates
  setInterval(() => {
    socket.emit('safety-score-update', {
      score: generateSafetyScore(),
      paperSaved: Math.floor(Math.random() * 5),
      timestamp: new Date().toISOString()
    });
  }, 8000);

  // Random alerts
  setInterval(() => {
    const alertTypes = ['safety', 'maintenance', 'environmental'];
    const alertType = alertTypes[Math.floor(Math.random() * alertTypes.length)];
    const alert = {
      id: Date.now(),
      type: alertType,
      message: `New ${alertType} alert: ${new Date().toLocaleTimeString()}`,
      level: Math.random() > 0.5 ? 'high' : 'medium',
      timestamp: new Date().toISOString()
    };
    socket.emit('new-alert', alert);
  }, 12000);

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

// Routes

// Registration Route
app.post("/api/register", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create a new user
    const newUser = new User({ email, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Login Route
app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Compare the password with the hashed password in the database
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Optionally, generate a JWT token (if you're using token-based authentication)
    const token = jwt.sign({ id: user._id, email: user.email }, secretKey, { expiresIn: "1h" });

    res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    console.error("Error logging in user:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Example protected route (if you're using JWT)
app.get("/api/protected", (req, res) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const decoded = jwt.verify(token, secretKey);
    res.json({ message: "Access granted", user: decoded });
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
});

// Start the server
httpServer.listen(9002, () => {
  console.log("Server started at port 9002");
});
