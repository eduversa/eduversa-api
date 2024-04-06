const { FailedValidationError } = require("../errors/error.prototypes");
const format = require("../functions/formatter.class");
const validate = require("../valiator.class");
const Profile = require("./profile.class");

class Learner extends Profile {
  family_info = {
    father: {
      first_name: "",
      middle_name: "",
      last_name: "",
      email: "",
      contact: "",
    },
    mother: {
      first_name: "",
      middle_name: "",
      last_name: "",
      email: "",
      contact: "",
    },
    guardian: {
      first_name: "",
      middle_name: "",
      last_name: "",
      relation: "",
      office_address: {
        street: "",
        pincode: "",
        city: "",
        district: "",
        state: "",
      },
      occupation: "",
      designation: "",
      office_contact: "",
      contact: "",
      income: "",
      email: "",
      pan_number: "",
      aadhar_number: "",
    },
  };
  academic_info = {
    admission: { exam_name: "", year_of_exam: "", roll_number: "", rank: "" },
    secondary: {
      exam_name: "",
      year_of_exam: "",
      board: "",
      aggregate: "",
      school_name: "",
      subjectString: "",
      subjects: "",
      marks: {},
    },
    higher_secondary: {
      exam_name: "",
      year_of_exam: "",
      board: "",
      aggregate: "",
      school_name: "",
      subjectString: "",
      subjects: "",
      marks: {},
    },
  };

  isValidExamType(type) {
    const examTypes = Object.keys(this.academic_info);
    if (!examTypes.includes(type)) {
      throw new Error(`Server Error: Invalid Exam Type: ${type}`);
    }
  }

  constructor() {
    super();
    this.family_info.father = {
      first_name: "",
      middle_name: null,
      last_name: "",
      email: "",
      contact: "",
    };
    this.family_info.mother = {
      first_name: "",
      middle_name: null,
      last_name: "",
      email: "",
      contact: "",
    };
    this.family_info.guardian = {
      first_name: "",
      middle_name: null,
      last_name: "",
      relation: "",
      office_address: {
        street: "",
        pincode: "",
        city: "",
        district: "",
        state: "",
      },
      occupation: "",
      designation: "",
      office_contact: "",
      contact: "",
      income: "",
      email: "",
      pan_number: "",
      aadhar_number: "",
    };
    this.academic_info.admission = {
      exam_name: "",
      year_of_exam: "",
      roll_number: "",
      rank: "",
    };
    this.academic_info.secondary = {
      exam_name: "",
      year_of_exam: "",
      board: "",
      aggregate: "",
      school_name: "",
      subjectString: "",
      subjects: "",
      marks: {},
    };
    this.academic_info.higher_secondary = {
      exam_name: "",
      year_of_exam: "",
      board: "",
      aggregate: "",
      school_name: "",
      subjectString: "",
      subjects: "",
      marks: {},
    };
  }

  //blue-u// Father Setter
  setFamilyInfo(data) {
    const { father, mother, guardian } = data;
    this.setFather(father);
    this.setMother(mother);
    this.setGuardian(guardian);
    return this;
  }

  //blue-u// Father Setter
  setFather(fatherData) {
    this.setFamilyName("father", fatherData.name);
    this.setFamilyEmail("father", fatherData.email);
    this.setFamilyContact("father", fatherData.contact);
    return this;
  }

  //blue-u// Mother Setter
  setMother(motherData) {
    this.setFamilyName("mother", motherData.name);
    this.setFamilyEmail("mother", motherData.email);
    this.setFamilyContact("mother", motherData.contact);
    return this;
  }

  //blue-u// Guardian Setter
  setGuardian(guardianData) {
    const {
      name,
      email,
      contact,
      relation,
      office_address,
      occupation,
      designation,
      office_contact,
      income,
      aadhar_number,
      pan_number,
    } = guardianData;
    this.setFamilyName("guardian", name);
    this.setFamilyEmail("guardian", email);
    this.setFamilyContact("guardian", contact);
    this.setGuardianRelation(relation);
    this.setOfficeAddress(office_address);
    this.setGuardianOccupation(occupation);
    this.setGuardianDesignation(designation);
    // this.setGuardianDesignation()
    this.setOfficeContact(office_contact);
    this.setGuardianIncome(income);
    this.setGuardianAadharNumber(aadhar_number);
    this.setGuardianPanNumber(pan_number);
    return this;
  }

  //blue-u// Family Name Setter
  setFamilyName(nameFor, name) {
    const types = Object.keys(this.family_info);
    if (!types.includes(nameFor)) {
      throw new Error("Server Error: Invalid NameFor in FamilyInfo");
    }
    validate.isEmpty(name, "Family Info", nameFor + " Name");
    const nameObject = format.name(name);

    if (!nameObject) {
      throw new FailedValidationError("Family Info", nameFor + " Name", name);
    }
    this.family_info[nameFor].first_name = nameObject.first_name;
    this.family_info[nameFor].last_name = nameObject.last_name;
    if (nameObject.middle_name) {
      this.family_info[nameFor].middle_name = nameObject.middle_name;
    } else {
      this.family_info[nameFor].middle_name = undefined;
    }
  }
  //blue-u// Family Email Setter
  setFamilyEmail(emailFor, email) {
    const types = Object.keys(this.family_info);
    if (!types.includes(emailFor)) {
      throw new Error("Server Error: Invalid EmailFor in FamilyInfo");
    }
    validate.isValidEmail(email, "Family Info", emailFor + " Email");

    this.family_info[emailFor].email = email;
  }
  //blue-u// Family Contact Setter
  setFamilyContact(contactFor, contact) {
    const types = Object.keys(this.family_info);
    if (!types.includes(contactFor)) {
      throw new Error("Server Error: Invalid ContactFor in FamilyInfo");
    }
    validate.isValidContact(contact, "Family Info", contactFor + " Contact");

    this.family_info[contactFor].contact = contact;
  }

  //blue-u// Guardian Relation Setter
  setGuardianRelation(relation) {
    validate.isEmpty(relation, "Family Info", "Relation");
    validate.isAlphabetString(relation, "Family Info", "Relation");
    // green-u// validate.isInArray()-->Add Later
    this.family_info.guardian.relation = relation;
  }
  //blue-u// Guardian Office Address Setter
  setOfficeAddress(address) {
    const { pincode, street, city, district, state } = address;
    validate.isEmpty(pincode, "Family Info", "Office Address->Pincode");
    validate.isEmpty(street, "Family Info", "Office Address->Street");
    validate.isEmpty(city, "Family Info", "Office Address->City");
    validate.isEmpty(district, "Family Info", "Office Address->District");
    validate.isEmpty(state, "Family Info", "Office Address->State");

    this.family_info.guardian.office_address = format.address(address);

    return this;
  }

  //blue-u// Guardian Occupation Setter
  setGuardianOccupation(value) {
    validate.isEmpty(value, "Family Info", "Occupation");
    validate.isAlphabetString(value, "Family Info", "Occupation");
    // green-u// validate.isInArray()-->Add Later
    this.family_info.guardian.occupation = value;
  }

  //blue-u// Guardian Occupation Setter
  setGuardianDesignation(value) {
    validate.isEmpty(value, "Family Info", "Designation");
    validate.isAlphabetString(value, "Family Info", "Designation");
    // green-u// validate.isInArray()-->Add Later
    this.family_info.guardian.designation = value;
  }
  //blue-u// Office Contact Setter
  setOfficeContact(contact) {
    validate.isValidContact(contact, "Family Info", "Office Contact");

    this.family_info.guardian.office_contact = contact;
  }

  //blue-u// Guardian Income Setter
  setGuardianIncome(value) {
    validate.isEmpty(value, "Family Info", "Income");
    // green-u// validate.isInArray()-->Add Later
    this.family_info.guardian.income = value;
  }

  //blue-u// Guardian Aadhar Number Setter
  setGuardianAadharNumber(number) {
    validate.isEmpty(number, "Family Info", "Aadhar Number");
    this.family_info.guardian.aadhar_number = number;
    return this;
  }

  //blue-u// Guardian PAN Number Setter
  setGuardianPanNumber(number) {
    validate.isEmpty(number, "Family Info", "PAN Number");
    this.family_info.guardian.pan_number = number.toUpperCase();
    return this;
  }

  //red-u// ------------------------------------ Academic Info Setters -------------------------------------
  //blue-u// Academic Info Setter
  setAcademicInfo(data) {
    const { admission, secondary, higher_secondary } = data;
    this.setAdmissionExam(admission);
    this.setSecondaryExam(secondary);
    this.setHigherSecondaryExam(higher_secondary);
    return this;
  }

  setExamName(type, name) {
    this.isValidExamType(type);
    validate.isEmpty(name, "Academic Information", type + " Exam Name");
    this.academic_info[type].exam_name = name;
    return this;
  }
  setYearOfExam(type, year) {
    const examTypes = Object.keys(this.academic_info);
    if (!examTypes.includes(type)) {
      throw new Error(`Server Error: Invalid Exam Type: ${type}`);
    }
    validate.isEmpty(year, "Academic Information", "Year of " + type + " Exam");
    this.academic_info[type].year_of_exam = year;
    return this;
  }

  setAdmissionExamRollNumber(number) {
    validate.isEmpty(number, "Academic Info", "Admission Exam Roll Number");
    this.academic_info.admission.roll_number = number;
    return this;
  }
  setAdmissionExamRank(number) {
    validate.isEmpty(number, "Academic Info", "Admission Exam Rank");
    this.academic_info.admission.rank = number;
    return this;
  }

  //blue-u// Admission Exam Setter
  setAdmissionExam(data) {
    const { exam_name, year_of_exam, roll_number, rank } = data;
    this.setExamName("admission", exam_name)
      .setYearOfExam("admission", year_of_exam)
      .setAdmissionExamRollNumber(roll_number)
      .setAdmissionExamRank(rank);

    return this;
  }

  // board: "",
  setBoard(type, name) {
    this.isValidExamType(type);
    validate.isEmpty(name, "Academic Information", type + " Board");
    this.academic_info[type].board = name;
    return this;
  }
  // aggregate: "",
  setAggregate(type, name) {
    this.isValidExamType(type);
    validate.isEmpty(name, "Academic Information", type + " Aggregate");
    this.academic_info[type].board = name;
    return this;
  }
  // school_name: "",
  setSchoolName(type, name) {
    this.isValidExamType(type);
    validate.isEmpty(name, "Academic Information", type + " School Name");
    this.academic_info[type].school_name = name;
    return this;
  }
  // subjectString: "",
  // subjects: "",
  // marks: {},
  setMarks(type, marks) {
    this.isValidExamType(type);
    // validate.isEmpty(name, "Academic Information", type + " School Name");
    this.academic_info[type].marks = marks;
    return this;
  }

  //blue-u// Secondary Exam Setter
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
  //blue-u// Higher Secondary Exam Setter
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

module.exports = Learner;
