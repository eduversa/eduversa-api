const { ApplicantCollection } = require("../../models/profile.models");
const { NotFoundError } = require("../errors/error.prototypes");
const validate = require("../valiator.class");
const Learner = require("./learner.class");

class Applicant extends Learner {
  course_info = {
    course_name: "",
    duration: "",
    stream: "",
    admission_year: "",
  };
  is_completely_filled = false;

  constructor() {
    super();
    this.course_info.course_name = "";
    this.course_info.duration = "";
    this.course_info.stream = "";
    this.course_info.admission_year = `${new Date().getFullYear()}`;
    this.is_completely_filled = false;
  }

  setCourseInfo(data) {
    const { course_name, duration, stream, admission_year } = data;
    this.setCourseName(course_name)
      .setDuration(duration)
      .setStream(stream)
      .setAdmissionYear(admission_year);
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

  async delete(user_id) {
    try {
      const applicantData = await ApplicantCollection.findOneAndDelete({
        user_id: user_id || this.user_id,
      });
      this.image = applicantData.image;
      this.user_id = applicantData.user_id;
      this.personal_info = applicantData.personal_info;
      this.academic_info = applicantData.academic_info;
      this.family_info = applicantData.family_info;
      this.course_info = applicantData.course_info;
      this.createdAt = applicantData.createdAt;
      this.updatedAt = applicantData.updatedAt;
      this.is_completely_filled = applicantData.is_completely_filled;

      return this;
    } catch (error) {
      throw new NotFoundError("Applicant", "UserID", user_id);
    }
  }
  async findOneByUserID(user_id) {
    try {
      const applicantData = await ApplicantCollection.findOne({ user_id });
      this.image = applicantData.image;
      this.user_id = applicantData.user_id;
      this.personal_info = applicantData.personal_info;
      this.academic_info = applicantData.academic_info;
      this.family_info = applicantData.family_info;
      this.course_info = applicantData.course_info;
      this.createdAt = applicantData.createdAt;
      this.updatedAt = applicantData.updatedAt;
      this.is_completely_filled = applicantData.is_completely_filled;

      return this;
    } catch (error) {
      throw new NotFoundError("Applicant", "UserID", user_id);
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
      this.is_completely_filled = applicantData.is_completely_filled;
      return this;
    } catch (error) {
      throw new BadRequestError("Applicant", "Update");
    }
  }

  async create() {
    try {
      const data = new ApplicantCollection({
        image: this.image,
        user_id: this.user_id,
        personal_info: this.personal_info,
        academic_info: this.academic_info,
        family_info: this.family_info,
        course_info: this.course_info,
        is_completely_filled: this.is_completely_filled,
      });
      const savedApplicant = await data.save();
      this.image = savedApplicant.image;
      this.user_id = savedApplicant.user_id;
      this.personal_info = savedApplicant.personal_info;
      this.academic_info = savedApplicant.academic_info;
      this.family_info = savedApplicant.family_info;
      this.course_info = savedApplicant.course_info;
      this.is_completely_filled = savedApplicant.is_completely_filled;

      return this;
    } catch (error) {
      throw new Error(error);
    }
  }
}

module.exports = Applicant;
// console.log(new Applicant().findOneByUserID("202400299"));
