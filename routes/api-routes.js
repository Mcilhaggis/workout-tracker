const router = require("express").Router();
const Workout = require("../models/workout.js");

// Getting all workouts
router.get("/api/workouts", (req, res) => {

    Workout.aggregate([{
            $addFields: { totalDuration: { $sum: "$exercises.duration" } },
        }, ])
        .then((data) => {
            res.json(data);
        })
        .catch((err) => {
            res.status(400).json(err);
        });
});

// Adding a new exercise
router.put("/api/workouts/:id", (req, res) => {

    Workout.findByIdAndUpdate({ _id: req.params.id }, { $push: { exercises: {...req.body } } })
        .then((dbWorkout) => {
            res.json(dbWorkout);
        })
        .catch((err) => {
            res.status(400).json(err);
        });
});

// Create a new workout
router.post("/api/workouts", ({ body }, res) => {

    Workout.create(body)
        .then((dbWorkout) => {
            res.json(dbWorkout);
        })
        .catch((err) => {
            res.status(400).json(err);
        });
});

// Get workouts for the last 7 days
router.get("/api/workouts/range", (req, res) => {

    Workout.aggregate([{
            $addFields: { totalDuration: { $sum: "$exercises.duration" } },
        }])
        .sort({ day: -1 })
        .limit(7)
        .then((data) => {
            res.json(data.reverse());
        })
        .catch((err) => {
            res.status(400).json(err);
        });
});

module.exports = router;