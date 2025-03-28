const asyncHandler = require("express-async-handler");
const Event = require("../models/eventModel");

// @desc Get all events
// @route GET /api/events
// @access Public
const getEvents = asyncHandler(async (req, res) => {
    const events = await Event.find();
    res.status(200).json(events);
});

// @desc Get one event
// @route GET /api/events/:id
// @access Public
const getEvent = asyncHandler(async (req, res, next) => {
    const event = await Event.findById(req.params.id);
    if (!event) {
        res.status(400);
        return next(new Error("Event not found"));
    }
    res.status(200).json(event);
});

// @desc Create new event
// @route POST /api/events
// @access Public
const createEvent = asyncHandler(async (req, res, next) => {
    const { name, description, picture, feedback, serviceToCall, price ,picture2 } = req.body;

    if (!name || !picture || !price) {
        res.status(400);
        return next(new Error("Name, picture, and price are required!"));
    }

    // Ensure the price is a number
    const parsedPrice = parseFloat(price);
    if (isNaN(parsedPrice) || parsedPrice <= 0) {
        res.status(400);
        return next(new Error("Price must be a positive number"));
    }

    const event = await Event.create({
        name,
        description,
        picture,
        picture2,
        feedback,
        serviceToCall,
        price: parsedPrice
    });

    res.status(201).json({ message: "Event created successfully", event });
});

// @desc Update event
// @route PUT /api/events/:id
// @access Public
const updateEvent = asyncHandler(async (req, res, next) => {
    const event = await Event.findById(req.params.id);
    if (!event) {
        res.status(400);
        return next(new Error("Event not found"));
    }

    const updatedEvent = await Event.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    );
    res.status(200).json(updatedEvent);
});

// @desc Delete event
// @route DELETE /api/events/:id
// @access Public
const deleteEvent = asyncHandler(async (req, res, next) => {
    const event = await Event.findById(req.params.id);
    if (!event) {
        res.status(400);
        return next(new Error("Event not found"));
    }

    await Event.deleteOne({ _id: req.params.id });
    res.status(200).json({ message: "Event deleted successfully", event });
});

module.exports = {
    getEvents,
    getEvent,
    createEvent,
    updateEvent,
    deleteEvent,
};
