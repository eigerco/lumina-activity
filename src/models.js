const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    userId: String,
    eventType: String,
    timestamp: { type: Date, default: Date.now },
    data: mongoose.Schema.Types.Mixed,
});

const Event = mongoose.model('Event', eventSchema);

module.exports = { Event };
