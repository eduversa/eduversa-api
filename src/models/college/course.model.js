const mongoose = require("mongoose");

const courseSchema = mongoose.Schema({
  id: { type: String, unique: true, required: true },
  name: { type: String, required: true },
  fees: { type: Number, required: true },
  duration: { type: Number, required: true },
  departments: [{ type: String, required: true }],

  // Total seats
});

const CourseModel = mongoose.model("course-data", courseSchema);

module.exports = CourseModel;
