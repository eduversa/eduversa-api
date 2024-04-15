const {
  FailedValidationError,
} = require("../../../classes/errors/error.prototypes");
const { OPTIONS } = require("../../../data");
const { Validator, Formatter } = require("../../classes");

class FamilyInfo {
  father = {
    first_name: "",
    middle_name: "",
    last_name: "",
    email: "",
    contact: "",
  };
  mother = {
    first_name: "",
    middle_name: "",
    last_name: "",
    email: "",
    contact: "",
  };
  guardian = {
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
  };

  constructor() {}

  // Father Methods
  setFatherName(value) {
    Validator.isNotEmpty(value, "Family Info", "Father Name");

    const nameObject = Formatter.name(value);
    if (!nameObject) {
      throw new FailedValidationError("Family Info", "Father Name", value);
    }
    this.father.first_name = nameObject.first_name;
    this.father.last_name = nameObject.last_name;
    if (nameObject.middle_name) {
      this.father.middle_name = nameObject.middle_name;
    } else {
      this.father.middle_name = undefined;
    }

    return this;
  }

  setFatherEmail(value) {
    Validator.isEmail(value, "Family Info", "Father Email");

    this.father.email = value;
    return this;
  }

  setFatherContact(value) {
    Validator.isPhone(value, "Family Info", "Father Contact");
    this.father.contact = value;
    return this;
  }

  setFather(data) {
    const { name, email, contact } = data;
    this.setFatherName(name).setFatherEmail(email).setFatherContact(contact);
    return this;
  }

  //Mother Methods
  setMotherName(value) {
    Validator.isNotEmpty(value, "Family Info", "Mother Name");

    const nameObject = Formatter.name(value);
    if (!nameObject) {
      throw new FailedValidationError("Family Info", "Mother Name", value);
    }
    this.mother.first_name = nameObject.first_name;
    this.mother.last_name = nameObject.last_name;
    if (nameObject.middle_name) {
      this.mother.middle_name = nameObject.middle_name;
    } else {
      this.mother.middle_name = undefined;
    }

    return this;
  }

  setMotherEmail(value) {
    Validator.isEmail(value, "Family Info", "Mother Email");

    this.mother.email = value;
    return this;
  }

  setMotherContact(value) {
    Validator.isPhone(value, "Family Info", "Mother Contact");
    this.mother.contact = value;
    return this;
  }

  setMother(data) {
    const { name, email, contact } = data;
    this.setMotherName(name).setMotherEmail(email).setMotherContact(contact);
    return this;
  }

  //Guardian Methods
  setGuardianName(value) {
    Validator.isNotEmpty(value, "Family Info", "Guardian Name");

    const nameObject = Formatter.name(value);
    if (!nameObject) {
      throw new FailedValidationError("Family Info", "Guardian Name", value);
    }
    this.guardian.first_name = nameObject.first_name;
    this.guardian.last_name = nameObject.last_name;
    if (nameObject.middle_name) {
      this.guardian.middle_name = nameObject.middle_name;
    } else {
      this.guardian.middle_name = undefined;
    }

    return this;
  }

  setGuardianEmail(value) {
    Validator.isEmail(value, "Family Info", "Guardian Email");

    this.guardian.email = value;
    return this;
  }

  setGuardianContact(value) {
    Validator.isPhone(value, "Family Info", "Guardian Contact");
    this.guardian.contact = value;
    return this;
  }

  setGuardianRelation(value) {
    Validator.isNotEmpty(value, "Family Info", "Relation");
    Validator.isAlphabetic(value, "Family Info", "Relation");
    value = value.toLowerCase();
    Validator.isInArray(value, OPTIONS.RELATION, "Family Info", "Relation");
    this.guardian.relation = value;
    return this;
  }

  setGuardianOfficeAddress(address) {
    const { pincode, street, city, district, state } = address;
    Validator.isNotEmpty(pincode, "Family Info", "Office Address->Pincode");
    Validator.isNotEmpty(street, "Family Info", "Office Address->Street");
    Validator.isNotEmpty(city, "Family Info", "Office Address->City");
    Validator.isNotEmpty(district, "Family Info", "Office Address->District");
    Validator.isNotEmpty(state, "Family Info", "Office Address->State");

    this.guardian.office_address = Formatter.address(address);

    return this;
  }

  setGuardianOccupation(value) {
    Validator.isNotEmpty(value, "Family Info", "Occupation");
    Validator.isAlphabetic(value, "Family Info", "Occupation");
    value = value.toLowerCase();
    // green-u// Validator.isInArray(OPTIONS.OCCUPATION)-->Add Later
    this.guardian.occupation = value;
    return this;
  }

  setGuardianDesignation(value) {
    Validator.isNotEmpty(value, "Family Info", "Designation");
    Validator.isAlphabetic(value, "Family Info", "Designation");
    value = value.toLowerCase();
    // green-u// Validator.isInArray(OPTIONS.DESIGNATION)-->Add Later
    this.guardian.designation = value;
    return this;
  }

  setGuardianOfficeContact(contact) {
    Validator.isPhone(contact, "Family Info", "Office Contact");

    this.guardian.office_contact = contact;
    return this;
  }

  setGuardianIncome(value) {
    Validator.isNotEmpty(value, "Family Info", "Income");
    // green-u// Validator.isInArray(OPTIONS.INCOME)-->Add Later
    this.guardian.income = value;
    return this;
  }

  setGuardianAadharNumber(number) {
    Validator.isNotEmpty(number, "Family Info", "Aadhar Number");
    this.guardian.aadhar_number = number;
    return this;
  }

  setGuardianPanNumber(number) {
    Validator.isNotEmpty(number, "Family Info", "PAN Number");
    this.guardian.pan_number = number.toUpperCase();
    return this;
  }
  setGuardian(data) {
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
    } = data;
    this.setGuardianName(name)
      .setGuardianEmail(email)
      .setGuardianContact(contact)
      .setGuardianRelation(relation)
      .setGuardianOfficeAddress(office_address)
      .setGuardianOccupation(occupation)
      .setGuardianDesignation(designation)
      .setGuardianOfficeContact(office_contact)
      .setGuardianIncome(income)
      .setGuardianAadharNumber(aadhar_number)
      .setGuardianPanNumber(pan_number);
    return this;
  }

  
}
module.exports = FamilyInfo;
