const { ApplicantModel } = require("../../models");
const AcademicInfo = require("./profile_sections/academic_info.repository");
const {
  ApplicantCourseInfo,
} = require("./profile_sections/course_info.repository");
const FamilyInfo = require("./profile_sections/family_info.repository");
const PersonalInfo = require("./profile_sections/personal_info.repository");

class ApplicantRepository {
  is_completely_filled = false;
  image = null;
  user_id = null;
  personal_info = null;
  academic_info = null;
  family_info = null;
  course_info = null;
  createdAt = null;
  updatedAt = null;

  constructor(builder) {
    if (builder && typeof builder == "object") {
      this.is_completely_filled = builder.is_completely_filled;
      this.image = builder.image;
      this.user_id = builder.user_id;
      this.personal_info = builder.personal_info;
      this.academic_info = builder.academic_info;
      this.family_info = builder.family_info;
      this.course_info = builder.course_info;
    }
  }

  create = async () => {
    try {
      const applicant = await new ApplicantModel(this).save();
      console.log("Created Applicant Successfully");
      this.setData(applicant);
      return this;
    } catch (error) {
      console.log("Error - ApplicantRepository - Create");
      throw error;
    }
  };

  readMultiple = async (query) => {
    try {
      const applicants = await ApplicantModel.find(query);
      if (!applicants || applicants.length == 0) {
        throw new Error("Applicants Not Found");
      }
      return applicants;
    } catch (error) {
      console.log("Error - ApplicantRepository - readMultiple");
      throw error;
    }
  };
  mustExist = async (query) => {
    try {
      const applicant = await ApplicantModel.findOne(query);
      if (!applicant) {
        throw new Error("Applicant Not Found");
      }
      this.setData(applicant);
      return this;
    } catch (error) {
      console.log("Error - ApplicantRepository - MustExist");
      throw error;
    }
  };
  mustNotExist = async (query) => {
    try {
      const applicant = await ApplicantModel.findOne(query);
      if (applicant) {
        throw new Error("Applicant Already Exists");
      }
      return this;
    } catch (error) {
      console.log("Error - ApplicantRepository - MustNotExist");
      throw error;
    }
  };
  delete = async () => {
    try {
      const applicant = await ApplicantModel.findOneAndDelete({
        user_id: this.user_id,
      });
      console.log("Deleted Applicant Successfully");
      console.log(applicant);
      this.setData(applicant);
      return this;
    } catch (error) {
      console.log("Error - ApplicantRepository - Delete");
      throw error;
    }
  };
  deleteMultiple = async (query) => {
    try {
      const applicants = await ApplicantModel.deleteMany(query);
      if (!applicants || applicants.deletedCount == 0) {
        throw new Error("Applicants Not Found");
      }
      return applicants;
    } catch (error) {
      console.log("Error - ApplicantRepository - deleteMultiple");
      throw error;
    }
  };
  update = async (query) => {
    try {
      const applicant = await ApplicantModel.findOneAndUpdate(query, this, {
        new: true,
      });
      console.log("Updated Applicant Successfully");
      this.setData(applicant);
      return this;
    } catch (error) {
      console.log("Error - ApplicantRepository - Update");
      throw error;
    }
  };

  setIsCompletelyFilled(value) {
    this.is_completely_filled = value;
    return this;
  }

  setData(data) {
    this.is_completely_filled = data.is_completely_filled;
    this.image = data.image;
    this.user_id = data.user_id;
    this.personal_info = data.personal_info;
    this.academic_info = data.academic_info;
    this.family_info = data.family_info;
    this.course_info = data.course_info;
    this.createdAt = data.createdAt;
    this.updatedAt = data.updatedAt;
    return this;
  }
  static Builder = class {
    image = null;
    user_id = null;
    personal_info = null;
    academic_info = null;
    family_info = null;
    course_info = null;

    constructor(data) {
      // console.log("data");
      // console.log(data);
      if (data && typeof data == "object") {
        this.setImage(data.image)
          .setUserId(data.user_id)
          .setPersonalInfo(data.personal_info)
          .setAcademicInfo(data.academic_info)
          .setFamilyInfo(data.family_info)
          .setCourseInfo(data.course_info);
      }
    }

    setImage(image) {
      console.log(image);
      this.image = image;
      return this;
    }
    setUserId(user_id) {
      this.user_id = user_id;
      return this;
    }
    setPersonalInfo(data) {
      this.personal_info = new PersonalInfo.Builder(this.personal_info)
        .setData(data)
        .build();
      return this;
    }
    setAcademicInfo(data) {
      this.academic_info = new AcademicInfo.Builder(this.academic_info)
        .setData(data)
        .build();
      return this;
    }
    setFamilyInfo(data) {
      this.family_info = new FamilyInfo.Builder(this.family_info)
        .setData(data)
        .build();
      return this;
    }
    setCourseInfo(data) {
      this.course_info = new ApplicantCourseInfo.Builder(this.course_info)
        .setData(data)
        .build();
      return this;
    }
    build() {
      return new ApplicantRepository(this);
    }
  };
}

module.exports = ApplicantRepository;
