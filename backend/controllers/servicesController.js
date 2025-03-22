const asyncHandler = require("express-async-handler");
const Service = require("../models/serviceModel");

// @desc Get all services
// @route GET /api/services
// @access Public
const getServices = asyncHandler(async (req, res) => {
    const services = await Service.find();
    res.status(200).json(services);
});

// @desc Get one service
// @route GET /api/services/:id
// @access Public
const getService = asyncHandler(async (req, res, next) => {
    const service = await Service.findById(req.params.id);
    if (!service) {
        res.status(400);
        return next(new Error("Service not found"));
    }
    res.status(200).json(service);
});

// @desc Create new service
// @route POST /api/services
// @access Public
const createService = asyncHandler(async (req, res, next) => {
    const { name, description, price, category } = req.body;

    if (!name || !price) {
        res.status(400);
        return next(new Error("Name and price are required!"));
    }

    const service = await Service.create({
        name,
        description,
        price,
        category,
    });

    res.status(201).json({ message: "Service created successfully", service });
});

// @desc Update service
// @route PUT /api/services/:id
// @access Public
const updateService = asyncHandler(async (req, res, next) => {
    const service = await Service.findById(req.params.id);
    if (!service) {
        res.status(400);
        return next(new Error("Service not found"));
    }

    const updatedService = await Service.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    );
    res.status(200).json(updatedService);
});

// @desc Delete service
// @route DELETE /api/services/:id
// @access Public
const deleteService = asyncHandler(async (req, res, next) => {
    const service = await Service.findById(req.params.id);
    if (!service) {
        res.status(400);
        return next(new Error("Service not found"));
    }

    await Service.deleteOne({ _id: req.params.id });
    res.status(200).json({ message: "Service deleted successfully", service });
});

module.exports = {
    getServices,
    getService,
    createService,
    updateService,
    deleteService,
};
