const express = require("express");
const Link = require("../models/Link");
const redirectRoute = express.Router();

redirectRoute.get("/:code", async (req, res) => {
    try {
        const code = req.params.code;
        const link = await Link.findOne({ code });
        if (link) {
            link.clicks++;
            await link.save();
            res.redirect(link.from);
        } else {
            res.status(404).json({ message: "Link not found" });
        }
    } catch (error) {
        res.status(500).json({
            message: "Something went wrong. Try again",
        });
    }
});

module.exports = redirectRoute;
