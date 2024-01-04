const { formatName } = require("../../functions/account.functions");
const {
  GENDERS,
  CATEGORY,
  BLOOD_GROUPS,
} = require("../../functions/data/defaultOptions.data");
const { FailedValidationError } = require("../errors/error.prototypes");
const format = require("../functions/formatter.class");
const validate = require("../valiator.class");

class Profile {
  image = "";
  user_id = "";
  personal_info = {
    first_name: "",
    middle_name: "",
    last_name: "",
    gender: "",
    dob: new Date(),
    present_address: {
      street: "",
      pincode: "",
      city: "",
      district: "",
      state: "",
    },
    are_addresses_same: true,
    permanent_address: {
      street: "",
      pincode: "",
      city: "",
      district: "",
      state: "",
    },
    email: "",
    contact: "",
    category: "",
    blood_group: "",
    aadhar_number: "",
    pan_number: "",
  };
  createdAt = null;
  updatedAt = null;

  constructor() {
    this.image = null;
    this.user_id = null;
    this.personal_info = {
      first_name: "",
      middle_name: null,
      last_name: "",
      gender: "",
      dob: null,
      present_address: {
        street: "",
        pincode: "",
        city: "",
        district: "",
        state: "",
      },
      are_addresses_same: true,
      permanent_address: {
        street: "",
        pincode: "",
        city: "",
        district: "",
        state: "",
      },
      email: "",
      contact: "",
      category: "",
      blood_group: "",
      aadhar_number: "",
      pan_number: "",
    };

    this.createdAt = new Date();
    this.updatedAt = new Date();
  }

  //blue-u// Image URL Setter
  setImage(imageURL) {
    this.image = imageURL;
    return this;
  }
  //blue-u// User ID Setter
  setUserID(user_id) {
    this.user_id = user_id;
    return this;
  }
  //blue-u// Created At Setter
  setCreatedAt(date) {
    this.createdAt = new Date(date);
    return this;
  }
  //blue-u// Updated At Setter
  setCreatedAt(date) {
    this.updatedAt = new Date(date);
    return this;
  }

  //blue-u// Personal Info Setter
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

  //blue-u// Name Setter
  setPersonalName(name) {
    validate.isEmpty(name, "Personal Info", "Name");

    const nameObject = formatName(name);
    if (!nameObject) {
      throw new FailedValidationError("Personal Info", "Name", name);
    }
    this.personal_info.first_name = nameObject.first_name;
    this.personal_info.last_name = nameObject.last_name;
    if (nameObject.middle_name) {
      this.personal_info.middle_name = nameObject.middle_name;
    } else {
      this.personal_info.middle_name = undefined;
    }

    return this;
  }
  //blue-u// Gender Setter
  setGender(gender) {
    validate.isEmpty(gender, "Applicant", "Gender");
    validate.isInArray(gender, GENDERS, "Applicant", "Gender");
    this.personal_info.gender = gender.toLowerCase();
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
    this.personal_info.dob = givenDOB;
    return this;
  }
  //blue-u// Present Address Setter
  setPresentAddress(address) {
    const { pincode, street, city, district, state } = address;
    validate.isEmpty(pincode, "Personal Info", "Present Address->Pincode");
    validate.isEmpty(street, "Personal Info", "Present Address->Street");
    validate.isEmpty(city, "Personal Info", "Present Address->City");
    validate.isEmpty(district, "Personal Info", "Present Address->District");
    validate.isEmpty(state, "Personal Info", "Present Address->State");

    this.personal_info.present_address = format.address(address);

    return this;
  }
  //blue-u// Permanent Address Setter
  setPermanentAddress(address) {
    const { pincode, street, city, district, state } = address;
    validate.isEmpty(pincode, "Personal Info", "Permanent Address->Pincode");
    validate.isEmpty(street, "Personal Info", "Permanent Address->Street");
    validate.isEmpty(city, "Personal Info", "Permanent Address->City");
    validate.isEmpty(district, "Personal Info", "Permanent Address->District");
    validate.isEmpty(state, "Personal Info", "Permanent Address->State");

    this.personal_info.permanent_address = format.address(address);

    return this;
  }
  //blue-u// Are Addresses Same Setter
  areAddressesSame() {
    const address1 = this.personal_info.present_address;
    const address2 = this.personal_info.permanent_address;

    this.personal_info.are_addresses_same =
      address1.pincode === address2.pincode &&
      address1.street === address2.street &&
      address1.city === address2.city &&
      address1.district === address2.district &&
      address1.state === address2.state;
    // this.personal_info.are_addresses_same = isSame;
    return this;
  }
  //blue-u// All Email Setter
  setPersonalEmail(email) {
    validate.isValidEmail(email, "Personal Info", "Email");

    this.personal_info.email = email;

    return this;
  }
  //blue-u// All Contact Setter
  setPersonalContact(contact) {
    validate.isValidContact(contact, "Personal Info", "Contact");

    this.personal_info.contact = contact;

    return this;
  }
  //blue-u// Category Setter
  setCategory(category) {
    validate.isEmpty(category, "Personal Info", "Category");
    validate.isInArray(category, CATEGORY, "Personal Info", "Category");
    this.personal_info.category = category.toLowerCase();
    return this;
  }
  //blue-u// Blood Group Setter
  setBloodGroup(bloodGroup) {
    validate.isEmpty(bloodGroup, "Personal Info", "Category");
    bloodGroup = bloodGroup.toUpperCase();
    validate.isInArray(bloodGroup, BLOOD_GROUPS, "Applicant", "Blood Group");
    this.personal_info.blood_group = bloodGroup;
    return this;
  }
  //blue-u// Aadhar Number Setter
  setPersonalAadharNumber(number) {
    validate.isEmpty(number, "Personal Info", "Aadhar Number");
    this.personal_info.aadhar_number = number;
    return this;
  }
  //blue-u// PAN Number Setter
  setPersonalPanNumber(number) {
    validate.isEmpty(number, "Personal Info", "PAN Number");
    number = number.toUpperCase();
    this.personal_info.pan_number = number;
    return this;
  }
}

module.exports = Profile;
