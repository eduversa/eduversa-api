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
    const { name, email, contact } = guardianData;
    this.setFamilyName("guardian", name);
    this.setFamilyEmail("guardian", email);
    this.setFamilyContact("guardian", contact);
    return this;
  }

  //blue-u// Father Name
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

  setFamilyEmail(emailFor, email) {
    const types = Object.keys(this.family_info);
    if (!types.includes(emailFor)) {
      throw new Error("Server Error: Invalid EmailFor in FamilyInfo");
    }
    validate.isValidEmail(email, "Family Info", emailFor + " Email");

    this.family_info[emailFor].email = email;
  }

  setFamilyContact(contactFor, contact) {
    const types = Object.keys(this.family_info);
    if (!types.includes(contactFor)) {
      throw new Error("Server Error: Invalid ContactFor in FamilyInfo");
    }
    validate.isValidContact(contact, "Family Info", contactFor + " Contact");

    this.family_info[contactFor].contact = contact;
  }
}

module.exports = Learner;
