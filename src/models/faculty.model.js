const mongoose = require("mongoose");
const personalInfoSchema = require("./schemas/personal_info.schema");
const jobInfoSchema = require("./schemas/job_info.schema");

const facultySchema = mongoose.Schema(
  {
    image: { type: String },
    user_id: { type: String },
    personal_info: personalInfoSchema,
    job_info: jobInfoSchema,
  },
  {
    timestamps: true,
  }
);
const FacultyModel = mongoose.model("faculty-data", facultySchema);
module.exports = FacultyModel;
