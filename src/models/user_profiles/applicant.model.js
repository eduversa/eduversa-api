const mongoose = require("mongoose");
const personalInfoSchema = require("./schemas/personal_info.schema");
const academicInfoSchema = require("./schemas/academic_info.schema");
const familyInfoSchema = require("./schemas/family_info.schema");
const { applicantCourseInfoSchema } = require("./schemas/course_info.schema");

const applicantSchema = mongoose.Schema(
  {
    is_completely_filled: { type: Boolean, default: false },
    image: { type: String },
    user_id: { type: String },
    personal_info: personalInfoSchema,
    academic_info: academicInfoSchema,
    family_info: familyInfoSchema,
    course_info: applicantCourseInfoSchema,
  },
  {
    timestamps: true,
  }
);
const ApplicantModel = mongoose.model("applicant-data", applicantSchema);
module.exports = ApplicantModel;
