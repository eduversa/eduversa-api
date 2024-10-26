const mongoose = require("mongoose");

const applicantCourseInfoSchema = mongoose.Schema({
  course_name: { type: String },
  duration: { type: String },
  stream: { type: String },
  admission_year: { type: String, default: new Date().getFullYear() },
});

const studentCourseInfoSchema = mongoose.Schema({
  course_name: { type: String },
  duration: { type: String },
  section: { type: String },
  stream: { type: String },
  total_sem: { type: String },
  currrent_sem: { type: String },
  current_year: { type: String },
  admission_year: { type: String },
  passout_year: { type: String },
  enrollment_number: { type: String },
  registration_number: { type: String },
});

module.exports = { applicantCourseInfoSchema, studentCourseInfoSchema };
