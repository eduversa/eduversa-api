// User Profiles
const AccountController = require("./user_profiles/account.controller");
const ApplicantController = require("./user_profiles/applicant.controller");
const StudentController = require("./user_profiles/student.controller");
const FacultyController = require("./user_profiles/faculty.controller");
// College
const CollegeController = require("./college/college.controller");
const SubjectController = require("./college/subject.controller");
const RoomController = require("./college/room.controller");
const DepartmentController = require("./college/department.controller");
// Features
const RoutineController = require("./features/routine.controller");
const ScannerController = require("./features/scanner.controller");

module.exports = {
  // User Profiles
  AccountController,
  ApplicantController,
  StudentController,
  FacultyController,
  // College
  CollegeController,
  SubjectController,
  RoomController,
  DepartmentController,
  // Features
  ScannerController,
  RoutineController,
};
