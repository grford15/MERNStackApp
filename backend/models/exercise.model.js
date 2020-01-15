const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const exerciseSchema = new Schema(
  {
    username: { type: String, required: true },
    description: { type: String, required: true },
    duration: { type: Number, required: true },
    date: { type: Date, required: true },
  },
  {
    timestamps: true,
  },
);
//sets up the exerciseSchema with 4 fields of varying types

const Exercise = mongoose.model('Exercise', exerciseSchema);
//creates a new model object with the exerciseSchema prototype

module.exports = Exercise;
