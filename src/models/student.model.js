const mongoose = require("mongoose");
const personalInfoSchema = require("./schemas/personal_info.schema");
const academicInfoSchema = require("./schemas/academic_info.schema");
const familyInfoSchema = require("./schemas/family_info.schema");
const { studentCourseInfoSchema } = require("./schemas/course_info.schema");

const studentSchema = mongoose.Schema(
  {
    image: { type: String },
    user_id: { type: String },
    personal_info: personalInfoSchema,
    academic_info: academicInfoSchema,
    family_info: familyInfoSchema,
    course_info: studentCourseInfoSchema,
  },
  {
    timestamps: true,
  }
);
const StudentModel = mongoose.model("student-data", studentSchema);
module.exports = StudentModel;
