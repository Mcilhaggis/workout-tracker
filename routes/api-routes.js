const router = require("express").Router();
const Workout = require("../models/workout.js");

//Creating the route for creating a new workout 
router.post('/api/workouts', (req, res) => {
    Workout.create(req.body)
    .then((data) => {
        console.log(data)
        //sending data to front end 
        res.json(data)
    })
    .catch((err) => {
        res.status(400).json(err);
    })
})

//Creating the route for adding exercise to the workout
router.put('/api/workouts/:id', (req, res) => {
        Workout.findOneAndUpdate(req.params.id,
            {
                $push: 
                {
                    exercise: req.body
                }
            })
            .then((data) => {
                res.json(data)
            })
            .catch((err) => {
                res.status(400).json(err);
            })
    })
    

//Get the sum of the duration of the workout
router.get("/api/workouts", (req, res) => {
    Workout.aggregate([{
        $addFields: { 
            totalDuration: { $sum: "$exercises.duration" } 
        },
    }, ])   
    .then((data) => {
        res.json(data)
    })
    .catch((err) => {
        res.status(400).json(err);
    })
})

//Get the sum of the duration of workouts in a seven day range. 
router.get("/api/workouts/range", (req, res) => {
    Workout.aggregate([{
        $addFields: { 
            totalDuration: { $sum: "$exercises.duration" } },
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