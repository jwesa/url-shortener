const express = require("express");
const config = require("config");
const shortid = require("shortid");
const authMiddleware = require("../middleware/authMiddleware");

const Link = require("../models/Link");

const linkRouter = express.Router();

linkRouter.post("/generate", authMiddleware, async (req, res) => {
    try {
        const baseUrl = config.get("baseUrl");
        const { from } = req.body;
        const code = shortid.generate();
        const exists = await Link.findOne({ from });
        if (exists) {
            return res.status(200).json({ link: exists });
        }

        const to = baseUrl + "/t/" + code;
        const link = new Link({
            code,
            to,
            from,
            owner: req.user.userId,
        });

        await link.save();
        res.status(201).json({ link, message: "Short link created"});
    } catch (error) {
        res.status(500).json({
            message: "Something went wrong. Try again",
        });
    }
});

linkRouter.get("/", authMiddleware, async (req, res) => {
    try {
        const links = await Link.find({ owner: req.user.userId });
        res.json(links);
    } catch (error) {
        res.status(500).json({
            message: "Something went wrong. Try again",
        });
    }
});

linkRouter.get("/:id", authMiddleware, async (req, res) => {
    try {
        const id = req.params.id;
        const link = await Link.findById(id);
        res.json(link);
    } catch (error) {
        res.status(500).json({
            message: "Something went wrong. Try again",
        });
    }
});

module.exports = linkRouter;
