const { Generator } = require("../../helpers");
const { SubjectModel } = require("../../models");
class SubjectRepository {
  id = null;
  name = null;
  course_id = null;
  department_id = null;
  type = null;

  constructor(builder) {
    if (builder && typeof builder === "object") {
      this.setData(builder);
    }
  }

  setData = (data) => {
    const { id, name, course_id, department_id, type } = data;
    if (id) {
      this.id = id;
    }
    if (name) {
      this.name = name;
    }
    if (course_id) {
      this.course_id = course_id;
    }
    if (department_id) {
      this.department_id = department_id;
    }
    if (type) {
      this.type = type;
    }

    return this;
  };

  create = async () => {
    try {
      const subject = await new SubjectModel(this).save();
      this.setData(subject);
      return this;
    } catch (error) {
      console.log("Error - Subject Repository - Create");
      throw error;
    }
  };
  mustExist = async (query) => {
    try {
      const subject = await SubjectModel.findOne(query);
      if (!subject) throw new Error("Subject Does Not Exist");
      this.setData(subject);
      return this;
    } catch (error) {
      console.log("Error - Subject Repository - mustExist");
      throw error;
    }
  };
  mustNotExist = async (query) => {
    try {
      const subject = await SubjectModel.findOne(query);
      if (subject) throw new Error("Subject Already Exists");

      return this;
    } catch (error) {
      console.log("Error - Subject Repository - mustNotExist");
      throw error;
    }
  };
  update = async (query) => {
    try {
      const subject = await SubjectModel.findOneAndUpdate(query, this, {
        new: true,
      });
      this.setData(subject);
      return this;
    } catch (error) {
      console.log("Error - Subject Repository - update");
      throw error;
    }
  };
  delete = async () => {
    try {
      const subject = await SubjectModel.findOneAndDelete(this);
      this.setData(subject);
      return this;
    } catch (error) {
      console.log("Error - Subject Repository - delete");
      throw error;
    }
  };

  static Builder = class {
    id = null;
    name = null;
    course_id = null;
    department_id = null;
    type = null;

    constructor(data) {
      this.setDefaultData();
      if (data && typeof data == "object") {
        this.setData(data);
      }
    }

    setData = (data) => {
      const { id, name, course_id, department_id, type } = data;
      if (id) {
        this.setId(id);
      }
      if (name) {
        this.setName(name);
      }
      if (course_id) {
        this.setCourseId(course_id);
      }
      if (department_id) {
        this.setDepartmentId(department_id);
      }
      if (type) {
        this.setType(type);
      }

      return this;
    };
    setDefaultData = () => {
      this.setId(Generator.getSubjectId());
      return this;
    };

    setId(id) {
      this.id = id;
      return this;
    }
    setName(name) {
      this.name = name;
      return this;
    }
    setCourseId(course_id) {
      this.course_id = course_id;
      return this;
    }
    setDepartmentId(department_id) {
      this.department_id = department_id;
      return this;
    }
    setType(type) {
      this.type = type;
      return this;
    }

    build() {
      return new SubjectRepository(this);
    }
  };
}
module.exports = SubjectRepository;
