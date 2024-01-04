const { ApplicantCollection } = require("../../models/profile.models");
const { NotFoundError } = require("../errors/error.prototypes");
const Learner = require("./learner.class");

class Applicant extends Learner {
  course_info = {
    course_name: "",
    duration: "",
    stream: "",
    admission_year: "",
  };

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
      return this;
    } catch (error) {
      throw new BadRequestError("Applicant", "Update");
    }
  }
}

module.exports = Applicant;
// console.log(new Applicant().findOneByUserID("202400299"));
