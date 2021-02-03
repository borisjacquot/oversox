const mongoose = require('mongoose');

const PointsModel = mongoose.model(
    "points",
    {
        tag: {
            type: String,
            required: true
        },
        dps: {
            type: String,
            required: false
        },
        tank: {
            type: String,
            required: false
        },
        heal: {
            type: String,
            required: false
        }
    },
    "points"
);

module.exports = { PointsModel };