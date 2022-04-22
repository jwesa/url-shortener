const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const config = require("config");

const authRoute = require("./routes/authRoutes");
const linkRoute = require("./routes/linkRoutes");
const redirectRoute = require("./routes/redirectRoutes");

const PORT = config.get("port") || 3000;
const mongoUri = config.get("mongoUri");

const app = express();

mongoose.connect(
    mongoUri,
    { useUnifiedTopology: true, useNewUrlParser: true },
    (err) => {
        if (err) {
            console.log("Error occured: ", err.message);
            process.exit(1);
        }
    }
);

app.use(express.json({ extended: true }));

app.use("/api/auth", authRoute);
app.use("/api/link", linkRoute);
app.use("/t", redirectRoute);

if (process.env.NODE_ENV === "production") {
    app.use("/", express.static(path.join(__dirname, "client", "build")));

    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
    });
}

app.listen(PORT, () => {
    console.log(`App started on port ${PORT}.`);
});
