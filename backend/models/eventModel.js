const mongoose = require("mongoose");

const eventSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Please enter the event name"],
        },
        date: {
            type: Date,
            required: [true, "Please enter the event date"],
        },
        location: {
            type: String,
            required: [true, "Please enter the event location"],
        },
        description: {
            type: String,
            default: "",
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Event", eventSchema);
