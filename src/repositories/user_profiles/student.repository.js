const { StudentModel } = require("../../models");
const AcademicInfo = require("./profile_sections/academic_info.repository");
const {
  StudentCourseInfo,
} = require("./profile_sections/course_info.repository");
const FamilyInfo = require("./profile_sections/family_info.repository");
const PersonalInfo = require("./profile_sections/personal_info.repository");

class StudentRepository {
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
      const student = await new StudentModel(this).save();
      console.log("Created Student Successfully");
      this.setData(student);
      return this;
    } catch (error) {
      console.log("Error - StudentRepository - Create");
      throw error;
    }
  };

  readMultiple = async (query) => {
    try {
      const students = await StudentModel.find(query);
      if (!students || students.length == 0) {
        throw new Error("Students Not Found");
      }
      return students;
    } catch (error) {
      console.log("Error - StudentRepository - readMultiple");
      throw error;
    }
  };
  mustExist = async (query) => {
    try {
      const student = await StudentModel.findOne(query);
      if (!student) {
        throw new Error("student Not Found");
      }
      this.setData(student);
      return this;
    } catch (error) {
      console.log("Error - studentRepository - MustExist");
      throw error;
    }
  };
  mustNotExist = async (query) => {
    try {
      const student = await StudentModel.findOne(query);
      if (student) {
        throw new Error("student Already Exists");
      }
      return this;
    } catch (error) {
      console.log("Error - studentRepository - MustNotExist");
      throw error;
    }
  };
  delete = async () => {
    try {
      const student = await StudentModel.findOneAndDelete({
        user_id: this.user_id,
      });
      console.log("Deleted student Successfully");
      console.log(student);
      this.setData(student);
      return this;
    } catch (error) {
      console.log("Error - studentRepository - Delete");
      throw error;
    }
  };
  deleteMultiple = async (query) => {
    try {
      const students = await StudentModel.deleteMany(query);
      if (!students || students.deletedCount == 0) {
        throw new Error("students Not Found");
      }
      return students;
    } catch (error) {
      console.log("Error - studentRepository - deleteMultiple");
      throw error;
    }
  };
  update = async (query) => {
    try {
      const student = await StudentModel.findOneAndUpdate(query, this, {
        new: true,
      });
      console.log("Updated student Successfully");
      this.setData(student);
      return this;
    } catch (error) {
      console.log("Error - studentRepository - Update");
      throw error;
    }
  };

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
      this.course_info = new StudentCourseInfo.Builder(this.course_info)
        .setData(data)
        .setDefaultData()
        .setEnrollmentNumber("1" + this.user_id)
        .setRegistrationNumber("304" + this.user_id)
        .build();
      return this;
    }
    build() {
      return new StudentRepository(this);
    }
  };
}

module.exports = StudentRepository;
