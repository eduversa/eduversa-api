class AcademicInfo {
  admission = {
    exam_name: null,
    year_of_exam: null,
    roll_number: null,
    rank: null,
  };
  secondary = {
    exam_name: null,
    year_of_exam: null,
    board: null,
    aggregate: null,
    school_name: null,
    subjectString: null,
    subjects: null,
    marks: null,
  };
  higher_secondary = {
    exam_name: null,
    year_of_exam: null,
    board: null,
    aggregate: null,
    school_name: null,
    subjectString: null,
    subjects: null,
    marks: null,
  };
  constructor(builder) {
    if (builder && typeof builder == "object") {
      this.setData(builder);
    }
  }

  setData(data) {
    const { secondary, higher_secondary, admission } = data;
    if (secondary && typeof secondary == "object") {
      const {
        exam_name,
        year_of_exam,
        board,
        aggregate,
        school_name,
        // subjectString,
        // subjects,
        marks,
      } = secondary;
      this.secondary.exam_name = exam_name;
      this.secondary.year_of_exam = year_of_exam;
      this.secondary.board = board;
      this.secondary.aggregate = aggregate;
      this.secondary.school_name = school_name;
      this.secondary.marks = marks;
    }
    if (higher_secondary && typeof higher_secondary == "object") {
      const {
        exam_name,
        year_of_exam,
        board,
        aggregate,
        school_name,
        // subjectString,
        // subjects,
        marks,
      } = higher_secondary;
      this.higher_secondary.exam_name = exam_name;
      this.higher_secondary.year_of_exam = year_of_exam;
      this.higher_secondary.board = board;
      this.higher_secondary.aggregate = aggregate;
      this.higher_secondary.school_name = school_name;
      this.higher_secondary.marks = marks;
    }
    if (admission && typeof admission == "object") {
      const { exam_name, year_of_exam, roll_number, rank } = admission;
      this.admission.exam_name = exam_name;
      this.admission.year_of_exam = year_of_exam;
      this.admission.roll_number = roll_number;
      this.admission.rank = rank;
    }
    return this;
  }
  static Builder = class {
    admission = {
      exam_name: null,
      year_of_exam: null,
      roll_number: null,
      rank: null,
    };
    secondary = {
      exam_name: null,
      year_of_exam: null,
      board: null,
      aggregate: null,
      school_name: null,
      subjectString: null,
      subjects: null,
      marks: null,
    };
    higher_secondary = {
      exam_name: null,
      year_of_exam: null,
      board: null,
      aggregate: null,
      school_name: null,
      subjectString: null,
      subjects: null,
      marks: null,
    };

    constructor(data) {
      if (data && typeof data == "object") {
        this.setData(data);
      }
    }

    setData(data) {
      const { secondary, higher_secondary, admission } = data;
      if (secondary && typeof secondary == "object") {
        this.setSecondaryExam(secondary);
      }
      if (higher_secondary && typeof higher_secondary == "object") {
        this.setHigherSecondaryExam(higher_secondary);
      }
      if (admission && typeof admission == "object") {
        this.setAdmissionExam(admission);
      }
      return this;
    }

    setSecondaryExam(secondary) {
      const {
        exam_name,
        year_of_exam,
        board,
        aggregate,
        school_name,
        // subjectString,
        // subjects,
        marks,
      } = secondary;
      this.secondary.exam_name = exam_name;
      this.secondary.year_of_exam = year_of_exam;
      this.secondary.board = board;
      this.secondary.aggregate = aggregate;
      this.secondary.school_name = school_name;
      this.secondary.marks = marks;
      return this;
    }
    setHigherSecondaryExam(higher_secondary) {
      const {
        exam_name,
        year_of_exam,
        board,
        aggregate,
        school_name,
        // subjectString,
        // subjects,
        marks,
      } = higher_secondary;
      this.higher_secondary.exam_name = exam_name;
      this.higher_secondary.year_of_exam = year_of_exam;
      this.higher_secondary.board = board;
      this.higher_secondary.aggregate = aggregate;
      this.higher_secondary.school_name = school_name;
      this.higher_secondary.marks = marks;
      return this;
    }
    setAdmissionExam(admission) {
      const { exam_name, year_of_exam, roll_number, rank } = admission;
      this.admission.exam_name = exam_name;
      this.admission.year_of_exam = year_of_exam;
      this.admission.roll_number = roll_number;
      this.admission.rank = rank;
      return this;
    }

    build() {
      return new AcademicInfo(this);
    }
  };
}

module.exports = AcademicInfo;
