const mongoose = require("mongoose");

const subjectSchema = mongoose.Schema({
  id: {
    type: String,
  },
  name: {
    type: String,
  },
  course: {
    type: String,
  },
  stream: {
    type: String,
  },
  type: {
    type: String,
  },
});

const SubjectModel = mongoose.model("subject-data", subjectSchema);

module.exports = SubjectModel;
