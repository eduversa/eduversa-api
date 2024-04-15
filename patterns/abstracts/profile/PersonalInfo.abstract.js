const {
  FailedValidationError,
} = require("../../../classes/errors/error.prototypes");
const { OPTIONS } = require("../../../data");
const Formatter = require("../../classes/Formatter.static");
const Validator = require("../../classes/Validator.static");

class PersonalInfo {
  first_name = "";
  middle_name = "";
  last_name = "";
  gender = "";
  dob = new Date();
  present_address = {
    street: "",
    pincode: "",
    city: "",
    district: "",
    state: "",
  };
  are_addresses_same = true;
  permanent_address = {
    street: "",
    pincode: "",
    city: "",
    district: "",
    state: "",
  };
  email = "";
  contact = "";
  category = "";
  blood_group = "";
  aadhar_number = "";
  pan_number = "";

  constructor() {
    // if (this.constructor == PersonalInfo) {
    //   throw new Error("Abstract Class cannot be instantiated");
    // }
    this.first_name = "";
    this.middle_name = "";
    this.last_name = "";
    this.gender = "";
    this.dob = new Date();
    this.present_address = {
      street: "",
      pincode: "",
      city: "",
      district: "",
      state: "",
    };
    this.are_addresses_same = true;
    this.permanent_address = {
      street: "",
      pincode: "",
      city: "",
      district: "",
      state: "",
    };
    this.email = "";
    this.contact = "";
    this.category = "";
    this.blood_group = "";
    this.aadhar_number = "";
    this.pan_number = "";
  }

  setPersonalName(name) {
    Validator.isNotEmpty(name, "Personal Info", "Name");

    const nameObject = Formatter.name(name);
    if (!nameObject) {
      throw new FailedValidationError("Personal Info", "Name", name);
    }
    this.first_name = nameObject.first_name;
    this.last_name = nameObject.last_name;
    if (nameObject.middle_name) {
      this.middle_name = nameObject.middle_name;
    } else {
      this.middle_name = undefined;
    }

    return this;
  }

  setGender(gender) {
    Validator.isNotEmpty(gender, "Applicant", "Gender");
    gender = gender.toLowerCase();
    Validator.isInArray(gender, OPTIONS.GENDER, "Applicant", "Gender");
    this.gender = gender;
    return this;
  }
  //blue-u// Date Of Birth Setter
  setDOB(dob) {
    const givenDOB = new Date(dob);
    // console.log(typeof givenDOB, givenDOB.getTime());
    const yearDiff = new Date().getFullYear() - givenDOB.getFullYear();
    if (isNaN(givenDOB.getTime()) || yearDiff < 15) {
      throw new FailedValidationError("Personal Info", "Date of Birth", dob);
    }
    this.dob = givenDOB;
    return this;
  }
  //blue-u// Present Address Setter
  setPresentAddress(address) {
    const { pincode, street, city, district, state } = address;
    Validator.isNotEmpty(pincode, "Personal Info", "Present Address->Pincode");
    Validator.isNotEmpty(street, "Personal Info", "Present Address->Street");
    Validator.isNotEmpty(city, "Personal Info", "Present Address->City");
    Validator.isNotEmpty(
      district,
      "Personal Info",
      "Present Address->District"
    );
    Validator.isNotEmpty(state, "Personal Info", "Present Address->State");

    this.present_address = Formatter.address(address);

    return this;
  }
  //blue-u// Permanent Address Setter
  setPermanentAddress(address) {
    const { pincode, street, city, district, state } = address;
    Validator.isNotEmpty(
      pincode,
      "Personal Info",
      "Permanent Address->Pincode"
    );
    Validator.isNotEmpty(street, "Personal Info", "Permanent Address->Street");
    Validator.isNotEmpty(city, "Personal Info", "Permanent Address->City");
    Validator.isNotEmpty(
      district,
      "Personal Info",
      "Permanent Address->District"
    );
    Validator.isNotEmpty(state, "Personal Info", "Permanent Address->State");

    this.permanent_address = Formatter.address(address);

    return this;
  }
  //blue-u// Are Addresses Same Setter
  areAddressesSame() {
    const address1 = this.present_address;
    const address2 = this.permanent_address;

    this.are_addresses_same =
      address1.pincode === address2.pincode &&
      address1.street === address2.street &&
      address1.city === address2.city &&
      address1.district === address2.district &&
      address1.state === address2.state;
    // this.are_addresses_same = isSame;
    return this;
  }
  //blue-u// All Email Setter
  setPersonalEmail(email) {
    Validator.isEmail(email, "Personal Info", "Email");

    this.email = email;

    return this;
  }
  //blue-u// All Contact Setter
  setPersonalContact(contact) {
    Validator.isPhone(contact, "Personal Info", "Contact");

    this.contact = contact;

    return this;
  }
  //blue-u// Category Setter
  setCategory(category) {
    Validator.isNotEmpty(category, "Personal Info", "Category");
    category = category.toLowerCase();
    Validator.isInArray(
      category,
      OPTIONS.CATEGORY,
      "Personal Info",
      "Category"
    );
    this.category = category;
    return this;
  }
  //blue-u// Blood Group Setter
  setBloodGroup(bloodGroup) {
    Validator.isNotEmpty(bloodGroup, "Personal Info", "Category");
    bloodGroup = bloodGroup.toUpperCase();
    Validator.isInArray(
      bloodGroup,
      OPTIONS.BLOOD_GROUP,
      "Applicant",
      "Blood Group"
    );
    this.blood_group = bloodGroup;
    return this;
  }
  //blue-u// Aadhar Number Setter
  setPersonalAadharNumber(number) {
    Validator.isNotEmpty(number, "Personal Info", "Aadhar Number");
    //ADD - Validation for Aadhar Number
    this.aadhar_number = number;
    return this;
  }
  //blue-u// PAN Number Setter
  setPersonalPanNumber(number) {
    Validator.isNotEmpty(number, "Personal Info", "PAN Number");
    number = number.toUpperCase();
    //ADD - Validation for PAN Number
    this.pan_number = number;
    return this;
  }

  setPersonalInfo(data) {
    const {
      name,
      gender,
      dob,
      present_address,
      permanent_address,
      email,
      contact,
      category,
      blood_group,
      aadhar_number,
      pan_number,
    } = data;

    this.setPersonalName(name)
      .setGender(gender)
      .setDOB(dob)
      .setPresentAddress(present_address)
      .setPermanentAddress(permanent_address)
      .areAddressesSame()
      .setPersonalEmail(email)
      .setPersonalContact(contact)
      .setCategory(category)
      .setBloodGroup(blood_group)
      .setPersonalAadharNumber(aadhar_number)
      .setPersonalPanNumber(pan_number);
    return this;
  }
}

module.exports = PersonalInfo;
