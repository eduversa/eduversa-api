// User Profiles
const AccountRouter = require("./user_profiles/account.router");
const ApplicantRouter = require("./user_profiles/applicant.router");
const FacultyRouter = require("./user_profiles/faculty.router");
const StudentRouter = require("./user_profiles/student.router");
// College
const CollegeRouter = require("./college/college.router");
const SubjectRouter = require("./college/subject.router");
const RoomRouter = require("./college/room.router");
const DepartmentRouter = require("./college/department.router");
const CourseRouter = require("./college/course.router");
// Features
const ScannerRouter = require("./features/scanner.router");
const RoutineRouter = require("./features/routine.router");

module.exports = {
  // User Profiles
  AccountRouter,
  ApplicantRouter,
  StudentRouter,
  FacultyRouter,
  // College
  CollegeRouter,
  SubjectRouter,
  RoomRouter,
  DepartmentRouter,
  CourseRouter,
  // Features
  ScannerRouter,
  RoutineRouter,
};
