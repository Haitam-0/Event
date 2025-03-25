const asyncHandler = require("express-async-handler");
const CreatedEvent = require("../models/createdEventModel");  // Importing the correct model

// @desc Get all created events
// @route GET /api/events
// @access Public
const getCreatedEvents = asyncHandler(async (req, res) => {
    const events = await CreatedEvent.find();  // Using CreatedEvent model
    res.status(200).json(events);
});

// @desc Get a specific created event by ID
// @route GET /api/events/:id
// @access Public
const getCreatedEvent = asyncHandler(async (req, res, next) => {
    const event = await CreatedEvent.findById(req.params.id);  // Using CreatedEvent model
    if (!event) {
        res.status(400);
        return next(new Error("Event not found"));
    }
    res.status(200).json(event);
});

// @desc Create a new event
// @route POST /api/events
// @access Public
const createCreatedEvent = asyncHandler(async (req, res, next) => {
    const { name, description, services, eventDate, category, address, price } = req.body; // Changed 'Price' to 'price'

    if (!name) {
        res.status(400);
        return next(new Error("Event name is required!"));
    }

    const event = await CreatedEvent.create({  
        name,
        description,
        services,  
        eventDate,
        category,
        price,  // Updated to match frontend
        address
    });

    res.status(201).json({ message: "Event created successfully", event });
});


// @desc Update a created event
// @route PUT /api/events/:id
// @access Public
const updateCreatedEvent = asyncHandler(async (req, res, next) => {
    const event = await CreatedEvent.findById(req.params.id);
    if (!event) {
        res.status(400);
        return next(new Error("Event not found"));
    }

    const updatedEvent = await CreatedEvent.findByIdAndUpdate(
        req.params.id,
        { ...req.body, price: req.body.price },  // Ensure price is updated
        { new: true }
    );
    res.status(200).json(updatedEvent);
});


// @desc Delete a created event
// @route DELETE /api/events/:id
// @access Public
const deleteCreatedEvent = asyncHandler(async (req, res, next) => {
    const event = await CreatedEvent.findById(req.params.id);  // Using CreatedEvent model
    if (!event) {
        res.status(400);
        return next(new Error("Event not found"));
    }

    await CreatedEvent.deleteOne({ _id: req.params.id });  // Using CreatedEvent model
    res.status(200).json({ message: "Event deleted successfully", event });
});

module.exports = {
    getCreatedEvents,
    getCreatedEvent,
    createCreatedEvent,
    updateCreatedEvent,
    deleteCreatedEvent,
};
