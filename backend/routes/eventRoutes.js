const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");

router.get("/", (req, res) => {
    const eventsPath = path.join(__dirname, "../data/event.json");
    fs.readFile(eventsPath, "utf-8", (err, data) => {
        if (err) {
            res.status(500).json({ error: "Failed to load events" });
        } else {
            res.json(JSON.parse(data));
        }
    });
});

module.exports = router;
