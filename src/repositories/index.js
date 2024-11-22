// User Profiles
const AccountRepository = require("./user_profiles/account.repository");
const ApplicantRepository = require("./user_profiles/applicant.repository");
const StudentRepository = require("./user_profiles/student.repository");
const FacultyRepository = require("./user_profiles/faculty.repository");
// College
const CourseRepository = require("./college/course.repository");
const RoomRepository = require("./college/room.repository");
const SubjectRepository = require("./college/subject.repository");
const DepartmentRepository = require("./college/department.repository");

module.exports = {
  // User Profiles
  AccountRepository,
  ApplicantRepository,
  StudentRepository,
  FacultyRepository,
  // College
  SubjectRepository,
  RoomRepository,
  CourseRepository,
  DepartmentRepository,
};
