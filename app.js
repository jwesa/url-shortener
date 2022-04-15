const express = require("express");
const mongoose = require("mongoose");
const config = require("config");
const authRoute = require("./routes/authRoutes");

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

app.use("/api/auth", authRoute);

app.listen(PORT, () => {
    console.log(`App started on port ${PORT}.`);
});
