const COLLEGE = require("../../data/temp/college.data");

class ApplicantCourseInfo {
  course_name = null;
  duration = null;
  stream = null;
  admission_year = null;
  constructor(builder) {
    if (builder && typeof builder == "object") {
      this.setData(builder);
    }
  }

  setData(data) {
    const { course_name, duration, stream, admission_year } = data;
    if (course_name) {
      this.course_name = course_name;
    }
    if (duration) {
      this.duration = duration;
    }
    if (stream) {
      this.stream = stream;
    }
    if (admission_year) {
      this.admission_year = admission_year;
    }
    return this;
  }

  static Builder = class {
    course_name = null;
    duration = null;
    stream = null;
    admission_year = null;

    constructor(data) {
      if (data && typeof data == "object") {
        this.setData(data);
      }
    }

    setData(data) {
      const { course_name, duration, stream, admission_year } = data;
      if (course_name) {
        this.setCourseName(course_name);
      }
      if (duration) {
        this.setDuration(duration);
      }
      if (stream) {
        this.setStream(stream);
      }
      if (admission_year) {
        this.setAdmissionYear(admission_year);
      }
      return this;
    }

    setCourseName(name) {
      this.course_name = name;
      return this;
    }
    setDuration(duration) {
      this.duration = duration;
      return this;
    }
    setStream(stream) {
      this.stream = stream;
      return this;
    }
    setAdmissionYear(year) {
      this.admission_year = year;
      return this;
    }

    build() {
      return new ApplicantCourseInfo(this);
    }
  };
}

class StudentCourseInfo {
  course_name = null;
  duration = null;
  section = null;
  stream = null;
  total_sem = null;
  currrent_sem = null;
  current_year = null;
  admission_year = null;
  passout_year = null;
  enrollment_number = null;
  registration_number = null;

  constructor(builder) {
    if (builder && typeof builder == "object") {
      this.setData(builder);
    }
  }

  setData(data) {
    const {
      course_name,
      duration,
      stream,
      admission_year,
      section,
      total_sem,
      currrent_sem,
      current_year,
      passout_year,
      enrollment_number,
      registration_number,
    } = data;
    if (course_name) {
      this.course_name = course_name;
    }
    if (duration) {
      this.duration = duration;
    }
    if (stream) {
      this.stream = stream;
    }
    if (admission_year) {
      this.admission_year = admission_year;
    }
    if (section) {
      this.section = section;
    }
    if (total_sem) {
      this.total_sem = total_sem;
    }
    if (currrent_sem) {
      this.currrent_sem = currrent_sem;
    }
    if (current_year) {
      this.current_year = current_year;
    }
    if (passout_year) {
      this.passout_year = passout_year;
    }
    if (enrollment_number) {
      this.enrollment_number = enrollment_number;
    }
    if (registration_number) {
      this.registration_number = registration_number;
    }
    return this;
  }

  static Builder = class {
    course_name = null;
    duration = null;
    stream = null;
    admission_year = null;
    section = null;
    total_sem = null;
    currrent_sem = null;
    current_year = null;
    passout_year = null;
    enrollment_number = null;
    registration_number = null;

    constructor(data) {
      console.log(data);
      if (data && typeof data == "object") {
        this.setData(data).setDefaultData(data);
      }
    }

    setDefaultData() {
      // const { course_name, duration, stream, admission_year } = data;
      const course = COLLEGE.college_courses.filter(
        (course) => course.name === this.course_name
      )[0];
      console.log(course);
      this.setSection("A")
        .setTotalSem(course.total_sem)
        .setCurrentSem(1)
        .setCurrentYear(1)
        .setPassoutYear(
          parseInt(this.admission_year) + parseInt(course.duration)
        );
      return this;
    }

    setData(data) {
      const {
        course_name,
        duration,
        stream,
        admission_year,
        section,
        total_sem,
        currrent_sem,
        current_year,
        passout_year,
        enrollment_number,
        registration_number,
      } = data;
      if (course_name) {
        this.setCourseName(course_name);
      }
      if (duration) {
        this.setDuration(duration);
      }
      if (stream) {
        this.setStream(stream);
      }
      if (admission_year) {
        this.setAdmissionYear(admission_year);
      }
      if (section) {
        this.setSection(section);
      }
      if (total_sem) {
        this.setTotalSem(total_sem);
      }
      if (currrent_sem) {
        this.setCurrentSem(currrent_sem);
      }
      if (current_year) {
        this.setCurrentYear(current_year);
      }
      if (passout_year) {
        this.setPassoutYear(passout_year);
      }
      if (enrollment_number) {
        this.setEnrollmentNumber(enrollment_number);
      }
      if (registration_number) {
        this.setRegistrationNumber(registration_number);
      }
      return this;
    }

    setCourseName(name) {
      this.course_name = name;
      return this;
    }
    setDuration(duration) {
      this.duration = duration;
      return this;
    }
    setStream(stream) {
      this.stream = stream;
      return this;
    }
    setAdmissionYear(year) {
      this.admission_year = year;
      return this;
    }
    setSection(section) {
      this.section = section;
      return this;
    }
    setTotalSem(total_sem) {
      this.total_sem = total_sem;
      return this;
    }
    setCurrentSem(currrent_sem) {
      this.currrent_sem = currrent_sem;
      return this;
    }
    setPassoutYear(passout_year) {
      this.passout_year = passout_year;
      return this;
    }
    setCurrentYear(current_year) {
      this.current_year = current_year;
      return this;
    }
    setEnrollmentNumber(enrollment_number) {
      this.enrollment_number = enrollment_number;
      return this;
    }
    setRegistrationNumber(registration_number) {
      this.registration_number = registration_number;
      return this;
    }

    build() {
      return new StudentCourseInfo(this);
    }
  };
}

module.exports = { ApplicantCourseInfo, StudentCourseInfo };
