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
    type: {
      type: String,
      trim: true
    },
    name: {
      type: String,
      trim: true
    },
    duration: {
      type: Number,
      default: 0
    },
    weight: {
      type: Number,
      default: 0
    },
    reps: {
      type: Number,
      default: 0
    },
    sets: {
      type: Number,
      default: 0
    }
  }]

});

const workout = mongoose.model("Workout", workoutSchema);

module.exports = workout;
