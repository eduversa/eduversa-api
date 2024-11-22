const { Generator } = require("../../../helpers");

class JobInfo {
  faculty_id = null;
  room = null;
  specialization = null;
  department = null;
  joined = null;
  salary = null;
  designation = null;

  constructor(builder) {
    if (builder && typeof builder == "object") {
      this.setData(builder);
    }
  }

  setData(data) {
    const {
      faculty_id,
      room,
      specialization,
      department,
      joined,
      salary,
      designation,
    } = data;
    if (faculty_id) {
      this.faculty_id = faculty_id;
    }
    if (room) {
      this.room = room;
    }
    if (specialization) {
      this.specialization = specialization;
    }
    if (department) {
      this.department = department;
    }
    if (joined) {
      this.joined = joined;
    }
    if (salary) {
      this.salary = salary;
    }
    if (designation) {
      this.designation = designation;
    }
    return this;
  }

  static Builder = class {
    faculty_id = null;
    room = null;
    specialization = null;
    department = null;
    joined = null;
    salary = null;
    designation = null;

    constructor(data) {
      this.setDefaultData();
      if (data && typeof data == "object") {
        this.setData(data);
      }
    }

    setDefaultData() {
      this.setFacultyId(Generator.getFacultyId())
        .setSpecialization([])
        .setJoined(new Date());
      return this;
    }
    setData(data) {
      const {
        faculty_id,
        room,
        specialization,
        department,
        joined,
        salary,
        designation,
      } = data;
      if (faculty_id) {
        this.setFacultyId(faculty_id);
      }
      if (room) {
        this.setRoom(room);
      }
      if (specialization) {
        this.setSpecialization(specialization);
      }

      if (department) {
        this.setDepartment(department);
      }
      if (joined) {
        this.setJoined(joined);
      }
      if (salary) {
        this.setSalary(salary);
      }
      if (designation) {
        this.setDesignation(designation);
      }
      return this;
    }

    setFacultyId(id) {
      this.faculty_id = id;
      return this;
    }
    setRoom(room) {
      this.room = room;
      return this;
    }
    setSpecialization(specialization) {
      this.specialization = specialization;
      return this;
    }

    setDepartment(department) {
      this.department = department;
      return this;
    }
    setJoined(date) {
      this.joined = new Date(date);
      return this;
    }
    setSalary(salary) {
      this.salary = salary;
      return this;
    }
    setDesignation(designation) {
      this.designation = designation;
      return this;
    }

    build() {
      return new JobInfo(this);
    }
  };
}

module.exports = JobInfo;
