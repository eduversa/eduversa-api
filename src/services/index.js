const AuthenticationService = require("./authentication.service");
// User Profiles
const AccountService = require("./user_profiles/account.service");
const ApplicantService = require("./user_profiles/applicant.service");
const StudentService = require("./user_profiles/student.service");
const FacultyService = require("./user_profiles/faculty.service");
// College
const CollegeService = require("./college/college.service");
const SubjectService = require("./college/subject.service");
const RoomService = require("./college/room.service");
const CourseService = require("./college/course.service");
const DepartmentService = require("./college/department.service");
const CurriculumService = require("./college/curriculum.service");
// Features
const ScannerService = require("./features/scanner.service");

module.exports = {
  // User Profiles
  AccountService,
  ApplicantService,
  StudentService,
  FacultyService,
  // College
  CollegeService,
  SubjectService,
  RoomService,
  CourseService,
  DepartmentService,
  CurriculumService,
  // Features
  ScannerService,
  AuthenticationService,
};
