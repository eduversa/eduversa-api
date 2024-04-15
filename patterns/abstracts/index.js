const AcademicInfo = require("./profile/AcademicInfo.abstract");
const {
  ApplicantCourseInfo,
  StudentCourseInfo,
} = require("./profile/CourseInfo.abstract");
const FamilyInfo = require("./profile/FamilyInfo.abstract");
const PersonalInfo = require("./profile/PersonalInfo.abstract");

module.exports = {
  PersonalInfo,
  FamilyInfo,
  AcademicInfo,
  ApplicantCourseInfo,
  StudentCourseInfo,
};
