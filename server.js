const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");

const PORT = process.env.PORT || 3000;

const db = require("./models");

const app = express();

app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout", { useNewUrlParser: true });

//Require the routes in a seperate folder
app.use(require("./routes.api-routes.js"))
app.use(require("./routes.html-routes.js"))

app.listen(PORT, () => {
    console.log(`App running on ${PORT}`)
})