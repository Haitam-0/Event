const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv").config();
const path = require("path");
const fs = require("fs");
const connectDb = require("./config/dbConnection");
const errorHandler = require("./middleware/errorHandler");

const app = express();
const port = process.env.PORT || 5003; // Change to 5003

// Connect to the database
connectDb()
    .then(() => console.log("✅ Database connected successfully"))
    .catch((err) => {
        console.error("❌ Database connection failed:", err);
        process.exit(1); // Stop the server if DB fails to connect
    });

// Middleware
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from 'public' folder
app.use("/public", express.static(path.join(__dirname, "public")));

// Test API route
app.get("/", (req, res) => {
    res.send("Merhba bljami3 👋");
});

// Load JSON data safely
const loadJsonData = (filePath) => {
    try {
        return JSON.parse(fs.readFileSync(filePath, "utf-8"));
    } catch (error) {
        console.error(`❌ Error loading ${filePath}:`, error);
        return [];
    }
};

const events = loadJsonData(path.join(__dirname, "data", "event.json"));
const services = loadJsonData(path.join(__dirname, "data", "services.json"));
console.log("📄 Loaded services:", services);


// API routes for JSON data
app.get("/api/events/json", (req, res) => {
    res.json(events);
});

app.get("/api/services", (req, res) => {
    res.json(services);
});


// Other API routes
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/events", require("./routes/eventRoutes"));

// Error handler middleware
app.use(errorHandler);

// Start server
app.listen(port, () => {
    console.log(`🚀 Server running on http://localhost:${port}`);
});
