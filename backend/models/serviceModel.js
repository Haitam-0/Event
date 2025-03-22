const mongoose = require("mongoose");

const serviceSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true
        },
        description: {
            type: String,
            required: false,
            trim: true
        },
        price: {
            type: Number,
            required: true,
            min: 0
        },
        category: {
            type: String,
            required: false,
            trim: true
        },
        image: {
            type: String,
            required: false
        }
    },
    {
        timestamps: true // Automatically adds createdAt and updatedAt fields
    }
);

const Service = mongoose.model("Service", serviceSchema);

module.exports = Service;
