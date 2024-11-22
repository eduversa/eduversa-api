// User Profiles
const AccountModel = require("./user_profiles/account.model");
const ApplicantModel = require("./user_profiles/applicant.model");
const StudentModel = require("./user_profiles/student.model");
const FacultyModel = require("./user_profiles/faculty.model");
// College
const RoomModel = require("./college/room.model");
const SubjectModel = require("./college/subject.model");
const DepartmentModel = require("./college/department.model");
const CollegeModel = require("./college/college.model"); // Not Exported

// Features

module.exports = {
  // User Profiles
  AccountModel,
  ApplicantModel,
  StudentModel,
  FacultyModel,
  // College
  RoomModel,
  SubjectModel,
  DepartmentModel,
};
