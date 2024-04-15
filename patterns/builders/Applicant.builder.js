const { ApplicantCollection } = require("../../models/profile.models");
const {
  PersonalInfo,
  FamilyInfo,
  AcademicInfo,
  ApplicantCourseInfo,
} = require("../abstracts");

class Applicant {
  image = null;
  user_id = null;
  is_completely_filled = false;
  personal_info = new PersonalInfo();
  family_info = new FamilyInfo();
  academic_info = new AcademicInfo();
  course_info = new ApplicantCourseInfo();

  constructor() {
    this.image = "skbsbkxsab";
    this.user_id = "skbsbkxsab";
    this.personal_info = new PersonalInfo();
    this.family_info = new FamilyInfo();
    this.academic_info = new AcademicInfo();
    this.course_info = new ApplicantCourseInfo();
  }

  fromAccount(data) {
    const { first_name, middle_name, last_name, email, user_id, phone } = data;
    if (first_name && last_name) {
      this.personal_info.setPersonalName(
        `${first_name} ${middle_name ? middle_name : ""} ${last_name}`
      );
    }
    if (email) {
      this.personal_info.setPersonalEmail(email);
    }
    if (phone) {
      this.personal_info.setPersonalContact(phone);
    }

    this.user_id = user_id;

    return this;
  }

  setUserId(value) {
    this.user_id = value;
    return this;
  }
  setImage(value) {
    this.image = value;
    return this;
  }
  setIsCompletelyFilled(value) {
    this.is_completely_filled = value;
    return this;
  }
  setPersonalInfo(data) {
    this.personal_info.setPersonalInfo(data);
    return this;
  }
  setFamilyInfo(data) {
    this.family_info
      .setFather(data.father)
      .setMother(data.mother)
      .setGuardian(data.guardian);
    return this;
  }
  setCourseInfo(data) {
    this.course_info.setCourseInfo(data);
    return this;
  }

  setAcademicInfo(data) {
    this.academic_info
      .setAdmissionExam(data.admission)
      .setSecondaryExam(data.secondary)
      .setHigherSecondaryExam(data.higher_secondary);
    return this;
  }

  async create() {
    console.log("creating an applicant");
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
      console.log("saving an applicant");

      const savedApplicant = await data.save();
      this.setImage(savedApplicant.image)
        .setUserId(savedApplicant.user_id)
        .setIsCompletelyFilled(savedApplicant.is_completely_filled);
      this.setPersonalInfo(savedApplicant.personal_info)
        .setFamilyInfo(savedApplicant.family_info)
        .setAcademicInfo(savedApplicant.academic_info)
        .setCourseInfo(savedApplicant.course_info);
      //   this.image = savedApplicant.image;
      //   this.user_id = ;
      //   this.personal_info = savedApplicant.personal_info;
      //   this.academic_info = savedApplicant.academic_info;
      //   this.family_info = savedApplicant.family_info;
      //   this.course_info = savedApplicant.course_info;
      //   this.is_completely_filled = savedApplicant.is_completely_filled;
      console.log("done with applicant");

      return this;
    } catch (error) {
      throw new Error(error);
    }
  }
}

// console.log(new Applicant());
module.exports = Applicant;
