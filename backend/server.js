const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv").config();
const path = require("path");
const connectDb = require("./config/dbConnection");
const errorHandler = require("./middleware/errorHandler");

const app = express();
const port = process.env.PORT || 5003; 

// Enable CORS for all routes
app.use(cors());  // Move this line above route definitions

// Connect to the database
connectDb()
    .then(() => console.log("✅ Database connected successfully"))
    .catch((err) => {
        console.error("❌ Database connection failed:", err);
        process.exit(1); // Stop the server if DB fails to connect
    });

app.use(express.json());

// Test API route
app.get("/", (req, res) => {
    res.send("Merhba bljami3 👋");
});

app.use("/api/users", require("./routes/userRoutes"));

app.use("/api/events", require("./routes/eventRoutes"));

app.use("/api/services" , require("./routes/servicesRoutes"))

app.use(errorHandler);

// Static file serving
app.use("/public", express.static(path.join(__dirname, "public")));

// Start server
app.listen(port, () => {
    console.log(`🚀 Server running on http://localhost:${port}`);
});
