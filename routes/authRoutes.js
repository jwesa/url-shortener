const express = require("express");
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const User = require("../models/User.js");

const jwtSecret = config.get("jwtSecret");

const authRouter = express.Router();

authRouter.post(
    "/register",
    [
        check("email", "Incorrect email").isEmail(),
        check("password", "Minimal password length is 6 characters").isLength({
            min: 6,
        }),
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                res.status(400).json({
                    errors: errors.array(),
                    message:
                        errors.array()[0].msg || "Incorrect data on register",
                });
            } else {
                const { email, password } = req.body;

                const candidate = await User.findOne({ email });
                if (candidate) {
                    return res.status(400).json({
                        message: "User already exists",
                    });
                }

                const hashedPassword = await bcrypt.hash(password, 12);

                const user = new User({
                    email,
                    password: hashedPassword,
                });
                await user.save();

                res.status(201).json({
                    message: "User created.",
                });
            }
        } catch (error) {
            // res.status(500).json({
            //     message: "Something went wrong. Try again",
            // });
            console.log(error);
        }
    }
);

authRouter.post(
    "/login",
    [
        check("email", "Enter correct email").normalizeEmail().isEmail(),
        check("password", "Enter password").exists(),
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                res.status(400).json({
                    errors: errors.array(),
                    message: errors.array()[0].msg || "Incorrect data on login",
                });
            }

            const { email, password } = req.body;

            const user = await User.findOne({ email });
            if (!user) {
                return res.status(400).json({
                    message: "User not found.",
                });
            }

            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.status(400).json({
                    message: "Incorrect password, try again please",
                });
            }

            const token = jwt.sign(
                {
                    userId: user.id,
                },
                jwtSecret,
                { expiresIn: "1h" }
            );
            res.json({
                token,
                userId: user.id,
            });
        } catch (error) {
            res.status(500).json({
                message: "Something went wrong. Try again",
            });
        }
    }
);

module.exports = authRouter;
