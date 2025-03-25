const express = require("express");
const router = express.Router();
const {
    getCreatedEvent,
    getCreatedEvents,
    updateCreatedEvent,
    deleteCreatedEvent,
    createCreatedEvent
} = require("../controllers/createdEventController");

// Définition correcte des routes
router.route("/").get(getCreatedEvents).post(createCreatedEvent);
router.route("/:id").get(getCreatedEvent).put(updateCreatedEvent).delete(deleteCreatedEvent);
    
module.exports = router;
