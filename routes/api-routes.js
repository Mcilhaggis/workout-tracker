const router = require("express").Router();
const Workout = require("../models/workout.js");
//get workouts
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
// add exercise
router.put("/api/workouts/:id", (req, res) => {
    Workout.findByIdAndUpdate({ _id: req.params.id }, { $push: { exercises: {...req.body } } })
        .then((data) => {
            res.json(data);
        })
        .catch((err) => {
            res.status(400).json(err);
        });
});

//create workout
router.post("/api/workouts", (req, res) => {
    console.log("req.body in post route ::: ", req.body);
    Workout.create(req.body)
        .then((data) => {
            res.json(data);
        })
        .catch((err) => {
            res.status(400).json(err);
        });
});
// get workouts in range
router.get("/api/workouts/range", (req, res) => {
    Workout.find([{
            $addFields: { totalDuration: { $sum: "$exercises.duration" } }
        }])
        .sort({ id: -1 })
        .limit(7)
        .then((data) => {
            res.json(data.reverse());
        })
        .catch((err) => {
            res.status(400).json(err);
        });
    // Workout.find({}).limit(7).then(data => {
    //     res.json(data);
    // }).catch(err => {
    //     console.log("err :::", err);
    // })
});
module.exports = router;

