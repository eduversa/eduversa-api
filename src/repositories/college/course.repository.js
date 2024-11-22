const { Generator, ClientError } = require("../../helpers");
const { CourseModel } = require("../../models");

class CourseRepository {
  id = null;
  name = null;
  fees = null;
  duration = null;
  departments = null;
  // total_seats = null;

  constructor(builder) {
    if (builder && typeof builder == "object") {
      this.setData(builder);
    }
  }

  setData(data) {
    const { id, name, fees, duration, departments } = data;

    if (id) {
      this.id = id;
    }
    if (name) {
      this.name = name;
    }
    if (fees) {
      this.fees = fees;
    }
    if (duration) {
      this.duration = duration;
    }
    if (departments) {
      this.departments = departments;
    }

    return this;
  }

  // Section: CRUD

  create = async () => {
    try {
      const course = await new CourseModel(this).save();
      this.setData(course);
      return this;
    } catch (error) {
      console.log("Error - Course Repository - Create");
      throw error;
    }
  };
  mustExist = async (query) => {
    try {
      const course = await CourseModel.findOne(query);
      if (!course) throw new Error("Course Does Not Exist");
      this.setData(course);
      return this;
    } catch (error) {
      console.log("Error - Course Repository - mustExist");
      throw error;
    }
  };
  mustNotExist = async (query) => {
    try {
      const course = await CourseModel.findOne(query);
      if (course) throw new Error("Course Already Exists");

      return this;
    } catch (error) {
      console.log("Error - Course Repository - mustNotExist");
      throw error;
    }
  };
  update = async (query) => {
    try {
      const course = await CourseModel.findOneAndUpdate(query, this, {
        new: true,
      });
      this.setData(course);
      return this;
    } catch (error) {
      console.log("Error - Course Repository - update");
      throw error;
    }
  };
  delete = async () => {
    try {
      const course = await CourseModel.findOneAndDelete(this);
      this.setData(course);
      return this;
    } catch (error) {
      console.log("Error - Course Repository - delete");
      throw error;
    }
  };

  readMultiple = async (query = {}) => {
    try {
      const courses = await CourseModel.find(query);
      if (!courses || courses.length == 0) {
        throw new ClientError.NotFound("No Course Found");
      }
      return courses;
    } catch (error) {
      console.log("Error - Course Repository - readMultiple");
      throw error;
    }
  };

  deleteMultiple = async (query) => {
    try {
      const courses = await CourseModel.deleteMany(query);
      if (!courses || courses.deletedCount == 0) {
        throw new Error("Courses Not Found");
      }
      return courses;
    } catch (error) {
      console.log("Error - CourseRepository - deleteMultiple");
      throw error;
    }
  };

  static Builder = class {
    id = null;
    name = null;
    fees = null;
    duration = null;
    departments = null;

    constructor(data = undefined) {
      this.setDefault();
      if (data && typeof data == "object") {
        this.setData(data);
      }
    }
    setDefault() {
      this.setId(Generator.getCourseId()).setDepartments([]);
      return this;
    }

    setData(data) {
      const { id, name, departments, fees, duration } = data;

      if (id) {
        this.setId(id);
      }
      if (name) {
        this.setName(name);
      }
      if (departments) {
        this.setDepartments(departments);
      }
      if (fees) {
        this.setFees(fees);
      }
      if (duration) {
        this.setDuration(duration);
      }

      return this;
    }
    // Section: SETTERS

    setId = (id) => {
      this.id = id;
      return this;
    };
    setName = (name) => {
      this.name = name;
      return this;
    };
    setDepartments = (departments) => {
      this.departments = departments;
      return this;
    };
    setFees = (fees) => {
      this.fees = fees;
      return this;
    };
    setDuration = (duration) => {
      this.duration = duration;
      return this;
    };

    build() {
      return new CourseRepository(this);
    }
  };
}

module.exports = CourseRepository;
