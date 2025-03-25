const mongoose = require("mongoose");

const createdEventSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String },
    services: { type: [String], default: [] },
    eventDate: { type: Date, required: true },
    category: { type: String },
    price: { type: Number, required: true },  // Ensure price is required
    address: { type: String },
});

module.exports = mongoose.model("CreatedEvent", createdEventSchema);
