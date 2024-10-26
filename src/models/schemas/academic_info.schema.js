const mongoose = require("mongoose");

const academicInfoSchema = mongoose.Schema({
  admission: {
    exam_name: { type: String },
    year_of_exam: { type: String },
    roll_number: { type: String },
    rank: { type: String },
  },
  secondary: {
    exam_name: { type: String },
    year_of_exam: { type: String },
    board: { type: String },
    aggregate: { type: String },
    school_name: { type: String },
    subjectString: { type: String },
    subjects: String,
    marks: Object,
  },
  higher_secondary: {
    exam_name: { type: String },
    year_of_exam: { type: String },
    board: { type: String },
    aggregate: { type: String },
    school_name: { type: String },
    subjectString: { type: String },
    subjects: String,
    marks: Object,
  },
});

module.exports = academicInfoSchema;
