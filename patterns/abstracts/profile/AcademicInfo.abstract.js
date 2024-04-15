const { Validator } = require("../../classes");

const EXAM_TYPES = ["admission", "secondary", "higher_secondary"];
const isValidExamType = (type) => {
  if (!EXAM_TYPES.includes(type)) {
    throw new Error(`Server Error: Invalid Exam Type: ${type}`);
  }
};
class AcademicInfo {
  admission = { exam_name: "", year_of_exam: "", roll_number: "", rank: "" };
  secondary = {
    exam_name: "",
    year_of_exam: "",
    board: "",
    aggregate: "",
    school_name: "",
    subjectString: "",
    subjects: "",
    marks: {},
  };
  higher_secondary = {
    exam_name: "",
    year_of_exam: "",
    board: "",
    aggregate: "",
    school_name: "",
    subjectString: "",
    subjects: "",
    marks: {},
  };

  setExamName(type, name) {
    type = type.toLowerCase();
    isValidExamType(type);
    Validator.isNotEmpty(name, "Academic Information", type + " Exam Name");
    this[type].exam_name = name;
    return this;
  }

  setYearOfExam(type, year) {
    type = type.toLowerCase();
    isValidExamType(type);
    Validator.isNotEmpty(
      year,
      "Academic Information",
      "Year of " + type + " Exam"
    );
    this[type].year_of_exam = year;
    return this;
  }

  setAdmissionExamRollNumber(number) {
    Validator.isNotEmpty(number, "Academic Info", "Admission Exam Roll Number");
    this.admission.roll_number = number;
    return this;
  }
  setAdmissionExamRank(number) {
    Validator.isNotEmpty(number, "Academic Info", "Admission Exam Rank");
    this.admission.rank = number;
    return this;
  }

  setAdmissionExam(data) {
    const { exam_name, year_of_exam, roll_number, rank } = data;
    this.setExamName("admission", exam_name)
      .setYearOfExam("admission", year_of_exam)
      .setAdmissionExamRollNumber(roll_number)
      .setAdmissionExamRank(rank);

    return this;
  }

  setBoard(type, value) {
    isValidExamType(type);
    Validator.isNotEmpty(value, "Academic Information", type + " Board");
    this[type].board = value;
    return this;
  }

  setAggregate(type, value) {
    isValidExamType(type);
    Validator.isNotEmpty(value, "Academic Information", type + " Aggregate");
    this[type].board = value;
    return this;
  }

  setSchoolName(type, name) {
    isValidExamType(type);
    Validator.isNotEmpty(name, "Academic Information", type + " School Name");
    this[type].school_name = name;
    return this;
  }

  setMarks(type, marks) {
    isValidExamType(type);
    // validate.isEmpty(name, "Academic Information", type + " School Name");
    this[type].marks = marks;
    return this;
  }

  setSecondaryExam(data) {
    const { exam_name, year_of_exam, board, aggregate, marks, school_name } =
      data;
    this.setExamName("secondary", exam_name)
      .setYearOfExam("secondary", year_of_exam)
      .setAggregate("secondary", aggregate)
      .setBoard("secondary", board)
      .setSchoolName("secondary", school_name)
      .setMarks("secondary", marks);

    return this;
  }

  setHigherSecondaryExam(data) {
    const { exam_name, year_of_exam, board, aggregate, marks, school_name } =
      data;
    this.setExamName("higher_secondary", exam_name)
      .setYearOfExam("higher_secondary", year_of_exam)
      .setAggregate("higher_secondary", aggregate)
      .setBoard("higher_secondary", board)
      .setSchoolName("higher_secondary", school_name)
      .setMarks("higher_secondary", marks);

    return this;
  }
}
module.exports = AcademicInfo;
