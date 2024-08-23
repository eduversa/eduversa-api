const mongoose = require("mongoose");

const routinePeriodSchema = mongoose.Schema(
  {
    //yellow-u// Define the Schema Here
    id: {
        type: String
    },
    subject: {
        type: String
    },
    room: {
        type:String
    },
    faculty: [{type:String}],
    day: {type: String},
    index: {type: Number}

  },
  {
    //yellow-u// Options like Timestamps Ho Here
    timestamps: true
  }
);

const RoutinePeriodCollection = mongoose.model("-data", routinePeriodSchema);

module.exports = RoutinePeriodCollection;
