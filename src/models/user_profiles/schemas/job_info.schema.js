const mongoose = require("mongoose");

const jobInfoSchema = mongoose.Schema({
  faculty_id: { type: String },
  room: { type: String },
  specialization: [{ subject_id: { type: String } }],
  department: { type: String },
  joined: { type: Date },
  salary: { type: Number },
  designation: { type: String },
});

module.exports = jobInfoSchema;
