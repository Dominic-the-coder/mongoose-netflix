const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const tvShowSchema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    creator: {
        type: String,
        required: true,
        trim: true,
    },
    premiere_year: {
        type: Number,
        required: true,
    },
    end_year: {
        type: Number,
    },
    seasons: {
        type: Number,
        required: true,
        min: 1,
    },
    genre: {
        type: String,
        required: true,
    },
    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 10,
    },
    createdAt: {
        type: Date,
        default: () => Date.now(),
        immutable: true,
    },
    updatedAt: Date,
});

tvShowSchema.pre("save", function () {
    this.updatedAt = Date.now();
});

const TVShow = model("TVShow", tvShowSchema);
module.exports = TVShow;
