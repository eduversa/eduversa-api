const mongoose = require("mongoose");

const curriculumSchema = mongoose.Schema({
  id: { type: String, required: true, unique: true },
  passout_year: { type: Number },
  semester: { type: Number },
  department_id: { type: String },
  subjects: [
    {
      id: { type: String },
      assigned_faculty: [{ type: String }],
      name: { type: String },
      code: { type: String },
      type: { type: String },
      classes_per_week: { type: Number },
    },
  ],
});

const CurriculumModel = mongoose.model("curriculum-data", curriculumSchema);
module.exports = CurriculumModel;
