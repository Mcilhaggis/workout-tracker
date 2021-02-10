const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// Creating a new schema with the fields that we need
const workoutSchema = new Schema({
    // Creating a date field, mongoose accepts "Date" as a type
    // Mongoose has a built in feature of getting the date
    // We use Date.now and not Date.now();
    day: {
        type: Date,
        default: Date.now
    },
    // Creating the exercises field as an array to hold the actual exercise properties
    exercises: [{
        name: {
            type: String,
            trim: true
        },
        type: {
            type: String,
            trim: true
        },
        weight: {
            type: Number,
            default: 0
        },
        sets: {
            type: Number,
            default: 0
        },
        reps: {
            type: Number,
            default: 0
        },
        duration: {
            type: Number,
            default: 0
        },
        distance: {
            type: Number,
            default: 0
        }
    }],
});
// Creating our table name (workout) and implementing our schema (workoutSchema)
const workout = mongoose.model('workout', workoutSchema);
module.exports = workout;