class SubjectRepository {
  id = null;
  name = null;
  course = null;
  stream = null;
  passout_year = null;
  semester = null;

  static Builder = class {
    id = null;
    name = null;
    course = null;
    stream = null;
    passout_year = null;
    semester = null;

    constructor(data) {
      if (data && typeof data == "object") {
      } else {
      }
    }

    setData = (data) => {
      const { id, name, course, stream, passout_year, semester } = data;
      if (id) {
        this.setId(id);
      }
      if (name) {
        this.setName(name);
      }
      if (course) {
        this.setName(course);
      }
      if (stream) {
        this.setName(stream);
      }
      if (passout_year) {
        this.setName(passout_year);
      }
      if (semester) {
        this.setName(semester);
      }

      return this;
    };
    setDefaultData = () => {};

    setId(id) {
      this.id = id;
      return this;
    }
    setName(name) {
      this.name = name;
      return this;
    }
    setCourse(course) {
      this.course = course;
      return this;
    }
    setStream(stream) {
      this.stream = stream;
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
  };
}
