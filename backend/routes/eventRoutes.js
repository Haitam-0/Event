const express = require("express") ;
const router = express.Router() ;

const {
    getEvents,
    getEvent,
    updateEvent,
    deleteEvent,
    createEvent 
    } = require('../controllers/eventController')

router.route("/").get(getEvents).post(createEvent);

router.route("/:id").get(getEvent).put(updateEvent).delete(deleteEvent);
 
module.exports = router ; 


