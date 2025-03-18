const mongoose = require('mongoose');

const OrganizerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    contact: {
        type: String,
        required: true,
    }
}, { timestamps: true });

module.exports = mongoose.model('Organizer', OrganizerSchema);