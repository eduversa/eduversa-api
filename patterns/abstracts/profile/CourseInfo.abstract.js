const { Validator } = require("../../classes");

class ApplicantCourseInfo {
  course_name = undefined;
  duration = undefined;
  stream = undefined;
  admission_year = undefined;

  constructor() {
    this.admission_year = `${new Date().getFullYear()}`;
  }

  setCourseName(value) {
    Validator.isNotEmpty(value, "Applicant Profile", "Course Name");
    this.course_name = value;
    return this;
  }

  setDuration(value) {
    this.duration = value;
    return this;
  }

  setStream(value) {
    this.stream = value;
    return this;
  }
  setAdmissionYear(value) {
    this.admission_year = value;
    return this;
  }

  setCourseInfo(data) {
    const { course_name, duration, stream, admission_year } = data;
    this.setCourseName(course_name)
      .setDuration(duration)
      .setStream(stream)
      .setAdmissionYear(admission_year);
    return this;
  }
}
class StudentCourseInfo {}
module.exports = { ApplicantCourseInfo, StudentCourseInfo };
