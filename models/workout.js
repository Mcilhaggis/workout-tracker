const mongoose = require("mongoose");

const Schema = mongoose.Schema;
//Creating a schema with the fields that we need
const workoutSchema = new Schema({
  //Creating a date field, mongoose has a built in method for getting the date
  date: {
    type: Date,
    default: Date.now
  },
  //Creating the exercise fields an an array to hold all of the exercise proprties I need it to
  exercise: [{
    type: { type: String, trim: true, required: "Enter the name of the exercise" },
    name: { type: String, trim: true, required: "Enter the type of workout" },
    duration: { type: Number, default: 0, required: "Enter the duration"},
    weight: { type: Number, default: 0 },
    reps: { type: Number, default: 0 },
    sets: { type: Number, default: 0 },
    distance: { type: Number, default: 0}
  }]

});

//Creates the collection/table workout
const workout = mongoose.model("Workout", workoutSchema);

module.exports = workout;
