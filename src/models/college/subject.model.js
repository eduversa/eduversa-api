const mongoose = require("mongoose");

const subjectSchema = mongoose.Schema({
  id: {
    type: String,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  course_id: {
    type: String,
    required: true,
  },
  department_id: {
    type: String,
    required: true,
  },
  type: {
    type: String,
  },
});

const SubjectModel = mongoose.model("subject-data", subjectSchema);

module.exports = SubjectModel;
