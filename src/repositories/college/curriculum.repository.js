const { Generator } = require("../../helpers");
const { CurriculumModel } = require("../../models");
class CurriculumRepository {
  id = null;
  passout_year = null;
  semester = null;
  department_id = null;
  subjects = null;

  constructor(builder) {
    if (builder && typeof builder == "object") {
      this.setData(builder);
    }
  }

  setData(data) {
    const { id, passout_year, semester, department_id, subjects } = data;
    if (id) {
      this.id = id;
    }
    if (passout_year) {
      this.passout_year = passout_year;
    }
    if (semester) {
      this.semester = semester;
    }
    if (department_id) {
      this.department_id = department_id;
    }
    if (subjects) {
      this.subjects = subjects;
    }
    return this;
  }

  create = async () => {
    try {
      const curriculum = await new CurriculumModel(this).save();
      this.setData(curriculum);
      return this;
    } catch (error) {
      console.log("Error - Curriculum Repository - Create");
      throw error;
    }
  };
  mustExist = async (query) => {
    try {
      const curriculum = await CurriculumModel.findOne(query);
      if (!curriculum) throw new Error("Curriculum Does Not Exist");
      this.setData(curriculum);
      return this;
    } catch (error) {
      console.log("Error - Curriculum Repository - mustExist");
      throw error;
    }
  };
  mustNotExist = async (query) => {
    try {
      const curriculum = await CurriculumModel.findOne(query);
      if (curriculum) throw new Error("Curriculum Already Exists");

      return this;
    } catch (error) {
      console.log("Error - Curriculum Repository - mustNotExist");
      throw error;
    }
  };
  update = async (query) => {
    try {
      const curriculum = await CurriculumModel.findOneAndUpdate(query, this, {
        new: true,
      });
      this.setData(curriculum);
      return this;
    } catch (error) {
      console.log("Error - Curriculum Repository - update");
      throw error;
    }
  };
  delete = async () => {
    try {
      const curriculum = await CurriculumModel.findOneAndDelete(this);
      this.setData(curriculum);
      return this;
    } catch (error) {
      console.log("Error - Curriculum Repository - delete");
      throw error;
    }
  };

  readMultiple = async (query = {}) => {
    try {
      const curriculums = await CurriculumModel.find(query);
      if (!curriculums || curriculums.length == 0) {
        throw new ClientError.NotFound("No Curriculum Found");
      }
      return curriculums;
    } catch (error) {
      console.log("Error - Curriculum Repository - readMultiple");
      throw error;
    }
  };

  deleteMultiple = async (query) => {
    try {
      const curriculums = await CurriculumModel.deleteMany(query);
      if (!curriculums || curriculums.deletedCount == 0) {
        throw new Error("Curriculums Not Found");
      }
      return curriculums;
    } catch (error) {
      console.log("Error - CurriculumRepository - deleteMultiple");
      throw error;
    }
  };

  static Builder = class {
    id = null;
    passout_year = null;
    semester = null;
    department_id = null;
    subjects = null;

    constructor(builder) {
      this.setDefault();
      if (builder && typeof builder == "object") {
        this.setData(builder);
      }
    }

    setDefault() {
      this.setId(Generator.getCurriculumId()).setSubjects([]);
      return this;
    }

    setData(data) {
      const { id, passout_year, semester, department_id, subjects } = data;
      if (id) {
        this.setId(id);
      }
      if (passout_year) {
        this.setPassoutYear(passout_year);
      }
      if (semester) {
        this.setSemester(semester);
      }
      if (department_id) {
        this.setDepartmentId(department_id);
      }
      if (subjects) {
        this.setSubjects(subjects);
      }
      return this;
    }

    setId(id) {
      this.id = id;
      return this;
    }
    setPassoutYear(passout_year) {
      this.passout_year = passout_year;
      return this;
    }
    setSemester(semester) {
      this.semester = semester;
      return this;
    }
    setDepartmentId(department_id) {
      this.department_id = department_id;
      return this;
    }
    setSubjects(subjects) {
      this.subjects = subjects;
      return this;
    }

    build() {
      return new CurriculumRepository(this);
    }
  };
}

module.exports = CurriculumRepository;
