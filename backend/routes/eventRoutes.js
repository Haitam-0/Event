const express = require("express");
const router = express.Router();
const {
    getEvent,
    getEvents,
    updateEvent,
    deleteEvent,
    createEvent
} = require("../controllers/EventController");

// Définition correcte des routes
router.route("/").get(getEvents).post(createEvent);
router.route("/:id").get(getEvent).put(updateEvent).delete(deleteEvent);

module.exports = router;
