const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const linkScheme = new Schema(
    {
        from: { type: String, required: true },
        to: { type: String, required: true, unique: true },
        code: {
            type: String,
            required: true,
            unique: true,
        },
        date: { type: Date, default: Date.now },
        clicks: { type: Number, default: 0 },
        owner: { type: mongoose.Types.ObjectId, ref: "User" },
    },
    { versionKey: false }
);

const Link = mongoose.model("Link", linkScheme);

module.exports = Link;
