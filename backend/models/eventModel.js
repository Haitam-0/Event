const mongoose = require("mongoose");

const eventSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Please enter the event name"],
        },
        description: {
            type: String,
            default: "",
        },
        picture: {
            type: String,
            required: [true, "Please provide an event picture"],
        },
        picture2: {
            type: String,
            required: [true, "Please provide an event picture"],
        },
        feedback: {
            type: String,
            default: "",
        },
        price: {
            type: Number,
            required: true,
            min: 0
        },
        serviceToCall: {
            type: [String], // Array of service names
            default: [],
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Event", eventSchema);
