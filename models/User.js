const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userScheme = new Schema(
    {
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        links: [{ type: mongoose.Types.ObjectId, ref: "Link" }],
    },
    { versionKey: false }
);

const User = mongoose.model("User", userScheme);

module.exports = User;
