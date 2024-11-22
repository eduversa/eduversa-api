const { Generator, ClientError } = require("../../helpers");
const { DepartmentModel } = require("../../models");

class DepartmentRepository {
  id = null;
  name = null;
  streams = null;
  course_id = null;
  hod = null;

  constructor(builder) {
    if (builder && typeof builder == "object") {
      this.setData(builder);
    }
  }

  setData(data) {
    const { id, name, streams, hod, course_id } = data;

    if (id) {
      this.id = id;
    }
    if (name) {
      this.name = name;
    }
    if (streams) {
      this.streams = streams;
    }
    if (hod) {
      this.hod = hod;
    }
    if (course_id) {
      this.course_id = course_id;
    }

    return this;
  }

  // Section: CRUD

  create = async () => {
    try {
      const dept = await new DepartmentModel(this).save();
      this.setData(dept);
      return this;
    } catch (error) {
      console.log("Error - Department Repository - Create");
      throw error;
    }
  };
  mustExist = async (query) => {
    try {
      const department = await DepartmentModel.findOne(query);
      if (!department) throw new Error("Department Does Not Exist");
      this.setData(department);
      return this;
    } catch (error) {
      console.log("Error - Department Repository - mustExist");
      throw error;
    }
  };
  mustNotExist = async (query) => {
    try {
      const department = await DepartmentModel.findOne(query);
      if (department) throw new Error("Department Already Exists");

      return this;
    } catch (error) {
      console.log("Error - Department Repository - mustNotExist");
      throw error;
    }
  };
  update = async (query) => {
    try {
      const department = await DepartmentModel.findOneAndUpdate(query, this, {
        new: true,
      });
      this.setData(department);
      return this;
    } catch (error) {
      console.log("Error - Department Repository - update");
      throw error;
    }
  };
  delete = async () => {
    try {
      const department = await DepartmentModel.findOneAndDelete(this);
      this.setData(department);
      return this;
    } catch (error) {
      console.log("Error - Department Repository - delete");
      throw error;
    }
  };

  readMultiple = async (query = {}) => {
    try {
      const departments = await DepartmentModel.find(query);
      if (!departments || departments.length == 0) {
        throw new ClientError.NotFound("No Department Found");
      }
      return departments;
    } catch (error) {
      console.log("Error - Department Repository - readMultiple");
      throw error;
    }
  };

  deleteMultiple = async (query) => {
    try {
      const departments = await DepartmentModel.deleteMany(query);
      if (!departments || departments.deletedCount == 0) {
        throw new Error("Departments Not Found");
      }
      return departments;
    } catch (error) {
      console.log("Error - DepartmentRepository - deleteMultiple");
      throw error;
    }
  };

  static Builder = class {
    id = null;
    name = null;
    streams = null;
    course_id = null;
    hod = null;

    constructor(data = undefined) {
      this.setDefault();
      if (data && typeof data == "object") {
        this.setData(data);
      }
    }
    setDefault() {
      this.setId(Generator.getDepartmentId()).setStreams([]);
      return this;
    }

    setData(data) {
      const { id, name, streams, hod, course_id } = data;

      if (id) {
        this.setId(id);
      }
      if (name) {
        this.setName(name);
      }
      if (streams) {
        this.setStreams(streams);
      }
      if (hod) {
        this.setHod(hod);
      }
      if (course_id) {
        this.setCourseId(course_id);
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
    setStreams = (streams) => {
      this.streams = streams;
      return this;
    };
    setHod = (hod) => {
      this.hod = hod;
      return this;
    };
    setCourseId = (course_id) => {
      this.course_id = course_id;
      return this;
    };

    build() {
      return new DepartmentRepository(this);
    }
  };
}

module.exports = DepartmentRepository;
