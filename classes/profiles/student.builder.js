// const { ApplicantCollection } = require("../../models/profile.models");
const { StudentCollection } = require("../../models/profile.models");
const { NotFoundError } = require("../errors/error.prototypes");
const validate = require("../valiator.class");
const Learner = require("./learner.class");

class Student extends Learner {
  course_info = {
    course_name: "",
    duration: "",
    section: "",
    stream: "",
    total_sem: "",
    currrent_sem: "",
    current_year: "",
    admission_year: "",
    passout_year: "",
    enrollment_number: "",
    registration_number: "",
  };

  constructor() {
    super();
    this.course_info.course_name = "";
    this.course_info.duration = "";
    this.course_info.stream = "";
    this.course_info.admission_year = `${new Date().getFullYear()}`;
  }

  setCourseInfo(data) {
    const { course_name, duration, stream, admission_year } = data;
    this.setCourseName(course_name)
      .setDuration(duration)
      .setSection()
      .setStream(stream)
      .setAdmissionYear(admission_year);
    this.course_info.current_year = "1";
    this.course_info.currrent_sem = "1";
    this.course_info.passout_year =
      this.course_info.admission_year + this.course_info.duration;
    this.course_info.total_sem = 2 * this.course_info.duration;
    return this;
  }

  setCourseName(name) {
    validate.isEmpty(name, "Applicant Profile", "Course Name");
    this.course_info.course_name = name;
    return this;
  }
  setDuration(value) {
    // validate.isEmpty(name, "Applicant Profile", "Course Name")
    this.course_info.duration = value;
    return this;
  }
  setStream(value) {
    // validate.isEmpty(name, "Applicant Profile", "Course Name")
    this.course_info.stream = value;
    return this;
  }
  setAdmissionYear(value) {
    // validate.isEmpty(name, "Applicant Profile", "Course Name")
    this.course_info.admission_year = value;
    return this;
  }

  setEnrollmentNumber(value) {
    this.course_info.enrollment_number = value;
    return this;
  }

  setRegistrationNumber(value) {
    this.course_info.registration_number = value;
    return this;
  }

  setSection() {
    // Logic to calculate the section (using student matrix)

    this.course_info.section = "A";
    return this;
  }

  async create() {
    try {
      const data = new StudentCollection({
        image: this.image,
        user_id: this.user_id,
        personal_info: this.personal_info,
        academic_info: this.academic_info,
        family_info: this.family_info,
        course_info: this.course_info,
      });
      const savedStudent = await data.save();
      this.image = savedStudent.image;
      this.user_id = savedStudent.user_id;
      this.personal_info = savedStudent.personal_info;
      this.academic_info = savedStudent.academic_info;
      this.family_info = savedStudent.family_info;
      this.course_info = savedStudent.course_info;
      return this;
    } catch (error) {
      throw new Error(error);
    }
  }
  async findOneByStudentID(user_id) {
    try {
      const studentData = await StudentCollection.findOne({ user_id });
      if (!studentData) {
        return false;
      }
      this.image = studentData.image;
      this.user_id = studentData.user_id;
      this.personal_info = studentData.personal_info;
      this.academic_info = studentData.academic_info;
      this.family_info = studentData.family_info;
      this.course_info = studentData.course_info;
      this.createdAt = studentData.createdAt;
      this.updatedAt = studentData.updatedAt;
      return this;
    } catch (error) {
      throw new NotFoundError("Student", "UserID", user_id);
    }
  }

  async updateByUserID(user_id) {
    try {
      const applicantData = await ApplicantCollection.findOneAndUpdate(
        { user_id },
        {
          image: this.image,
          user_id: this.user_id,
          personal_info: this.personal_info,
          academic_info: this.academic_info,
          family_info: this.family_info,
          course_info: this.course_info,
        },
        { new: true }
      );
      this.image = applicantData.image;
      this.user_id = applicantData.user_id;
      this.personal_info = applicantData.personal_info;
      this.academic_info = applicantData.academic_info;
      this.family_info = applicantData.family_info;
      this.course_info = applicantData.course_info;
      return this;
    } catch (error) {
      throw new BadRequestError("Applicant", "Update");
    }
  }
}

module.exports = Student;
// console.log(new Applicant().findOneByUserID("202400299"));
