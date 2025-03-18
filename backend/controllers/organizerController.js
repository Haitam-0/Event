const asyncHandler = require("express-async-handler");
const Organizer = require("../models/Organizer");

// @desc Get all organizers
// @route GET /api/organizers
// @access Public
const getAllOrganizers = asyncHandler(async (req, res) => {
    const organizers = await Organizer.findAll();
    res.status(200).json(organizers);
});

// @desc Get one organizer
// @route GET /api/organizers/:id
// @access Public
const getOrganizerById = asyncHandler(async (req, res, next) => {
    const organizer = await Organizer.findByPk(req.params.id);
    if (!organizer) {
        res.status(400);
        return next(new Error("Organizer not found"));
    }
    res.status(200).json(organizer);
});

// @desc Create new organizer
// @route POST /api/organizers
// @access Public
const createOrganizer = asyncHandler(async (req, res, next) => {
    const { name, contact } = req.body;

    if (!name || !contact) {
        res.status(400);
        return next(new Error("Name and contact are required!"));
    }

    const organizer = await Organizer.create({
        name,
        contact,
    });

    res.status(201).json({ message: "Organizer created successfully", organizer });
});

// @desc Update organizer
// @route PUT /api/organizers/:id
// @access Public
const updateOrganizer = asyncHandler(async (req, res, next) => {
    const organizer = await Organizer.findByPk(req.params.id);
    if (!organizer) {
        res.status(400);
        return next(new Error("Organizer not found"));
    }

    await organizer.update(req.body);
    res.status(200).json(organizer);
});

// @desc Delete organizer
// @route DELETE /api/organizers/:id
// @access Public
const deleteOrganizer = asyncHandler(async (req, res, next) => {
    const organizer = await Organizer.findByPk(req.params.id);
    if (!organizer) {
        res.status(400);
        return next(new Error("Organizer not found"));
    }

    await organizer.destroy();
    res.status(200).json({ message: "Organizer deleted successfully", organizer });
});

module.exports = {
    getAllOrganizers,
    getOrganizerById,
    createOrganizer,
    updateOrganizer,
    deleteOrganizer,
};
