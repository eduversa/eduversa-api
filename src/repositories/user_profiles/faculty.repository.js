const { FacultyModel } = require("../../models");
const JobInfo = require("./profile_sections/job_info.repository");
const PersonalInfo = require("./profile_sections/personal_info.repository");

class FacultyRepository {
  image = null;
  user_id = null;
  personal_info = null;
  job_info = null;
  createdAt = null;
  updatedAt = null;

  constructor(builder) {
    if (builder && typeof builder == "object") {
      this.is_completely_filled = builder.is_completely_filled;
      this.image = builder.image;
      this.user_id = builder.user_id;
      this.personal_info = builder.personal_info;
      this.job_info = builder.job_info;
    }
  }

  create = async () => {
    try {
      const faculty = await new FacultyModel(this).save();
      console.log("Created Faculty Successfully");
      this.setData(faculty);
      return this;
    } catch (error) {
      console.log("Error - FacultyRepository - Create");
      throw error;
    }
  };

  readMultiple = async (query) => {
    try {
      const faculties = await FacultyModel.find(query);
      if (!faculties || faculties.length == 0) {
        throw new Error("Faculties Not Found");
      }
      return faculties;
    } catch (error) {
      console.log("Error - FacultyRepository - readMultiple");
      throw error;
    }
  };
  mustExist = async (query) => {
    try {
      const faculty = await FacultyModel.findOne(query);
      if (!faculty) {
        throw new Error("Faculty Not Found");
      }
      this.setData(faculty);
      return this;
    } catch (error) {
      console.log("Error - FacultyRepository - MustExist");
      throw error;
    }
  };
  mustNotExist = async (query) => {
    try {
      const faculty = await FacultyModel.findOne(query);
      if (faculty) {
        throw new Error("Faculty Already Exists");
      }
      return this;
    } catch (error) {
      console.log("Error - FacultyRepository - MustNotExist");
      throw error;
    }
  };
  delete = async () => {
    try {
      const faculty = await FacultyModel.findOneAndDelete({
        user_id: this.user_id,
      });
      console.log("Deleted Faculty Successfully");
      // console.log(faculty);
      this.setData(faculty);
      return this;
    } catch (error) {
      console.log("Error - FacultyRepository - Delete");
      throw error;
    }
  };
  deleteMultiple = async (query) => {
    try {
      const faculties = await FacultyModel.deleteMany(query);
      if (!faculties || faculties.deletedCount == 0) {
        throw new Error("Faculties Not Found");
      }
      return faculties;
    } catch (error) {
      console.log("Error - FacultyRepository - deleteMultiple");
      throw error;
    }
  };
  update = async (query) => {
    try {
      const faculty = await FacultyModel.findOneAndUpdate(query, this, {
        new: true,
      });
      console.log("Updated Faculty Successfully");
      this.setData(faculty);
      return this;
    } catch (error) {
      console.log("Error - FacultyRepository - Update");
      throw error;
    }
  };

  // setIsCompletelyFilled(value) {
  //   this.is_completely_filled = value;
  //   return this;
  // }

  setData(data) {
    this.is_completely_filled = data.is_completely_filled;
    this.image = data.image;
    this.user_id = data.user_id;
    this.personal_info = data.personal_info;
    this.job_info = data.job_info;
    this.createdAt = data.createdAt;
    this.updatedAt = data.updatedAt;
    return this;
  }
  static Builder = class {
    image = null;
    user_id = null;
    personal_info = null;
    job_info = null;

    constructor(data) {
      // console.log("data");
      // console.log(data);
      if (data && typeof data == "object") {
        this.setImage(data.image)
          .setUserId(data.user_id)
          .setPersonalInfo(data.personal_info)
          .setJobInfo(data.job_info);
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
    setJobInfo(data) {
      this.job_info = new JobInfo.Builder(this.job_info).setData(data).build();
      return this;
    }

    build() {
      return new FacultyRepository(this);
    }
  };
}

module.exports = FacultyRepository;
