// Dependencies
const router = require("express").Router();
const Workout = require("../models/workout.js");
const path = require('path');

// exercise.html route
router.get("/exercise", (req,res) =>{
  res.sendFile(path.join(__dirname, "../public/exercise.html"))
})

// stats.html route
router.get("/stats", (req,res) =>{
  res.sendFile(path.join(__dirname, "../public/stats.html"))
})

// index.html route
router.get("/", (req,res) =>{
  res.sendFile(path.join(__dirname, "../public/index.html"))
})

module.exports = router;