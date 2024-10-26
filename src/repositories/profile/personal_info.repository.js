const { Parser } = require("../../helpers");

class PersonalInfo {
  first_name = null;
  middle_name = null;
  last_name = null;
  gender = null;
  dob = null;
  present_address = {
    street: null,
    pincode: null,
    city: null,
    district: null,
    state: null,
  };
  permanent_address = {
    street: null,
    pincode: null,
    city: null,
    district: null,
    state: null,
  };
  are_addresses_same = null;
  email = null;
  contact = null;
  category = null;
  blood_group = null;
  aadhar_number = null;
  pan_number = null;

  constructor(builder) {
    if (builder && typeof builder == "object") {
      this.setData(builder);
    }
  }

  setData(data) {
    const {
      first_name,
      middle_name,
      last_name,
      gender,
      dob,
      present_address,
      permanent_address,
      are_addresses_same,
      email,
      contact,
      category,
      blood_group,
      aadhar_number,
      pan_number,
    } = data;

    if (first_name) {
      this.first_name = first_name;
    }
    if (middle_name) {
      this.middle_name = middle_name;
    }
    if (last_name) {
      this.last_name = last_name;
    }
    if (gender) {
      this.gender = gender;
    }
    if (dob) {
      this.dob = dob;
    }
    if (permanent_address && typeof permanent_address == "object") {
      this.permanent_address = permanent_address;
    }
    if (present_address && typeof present_address == "object") {
      this.present_address = present_address;
    }
    if (email) {
      this.email = email;
    }
    if (contact) {
      this.contact = contact;
    }
    if (category) {
      this.category = category;
    }
    if (blood_group) {
      this.blood_group = blood_group;
    }
    if (aadhar_number) {
      this.aadhar_number = aadhar_number;
    }
    if (pan_number) {
      this.pan_number = pan_number;
    }
    this.are_addresses_same = are_addresses_same;
    return this;
  }
  // setData(data) {
  //   this.first_name = data.first_name || null;
  //   this.middle_name = data.middle_name || null;
  //   this.last_name = data.last_name || null;
  //   this.gender = data.gender || null;
  //   this.dob = new Date(data.dob) || null;
  //   this.present_address = data.present_address || {
  //     street: null,
  //     pincode: null,
  //     city: null,
  //     district: null,
  //     state: null,
  //   };
  //   this.permanent_address = data.permanent_address || {
  //     street: null,
  //     pincode: null,
  //     city: null,
  //     district: null,
  //     state: null,
  //   };
  //   this.are_addresses_same = data.are_addresses_same;
  //   this.email = data.email || null;
  //   this.contact = data.contact || null;
  //   this.category = data.category || null;
  //   this.blood_group = data.blood_group || null;
  //   this.aadhar_number = data.aadhar_number || null;
  //   this.pan_number = data.pan_number || null;
  // }

  // SECTION: BUILDER CLASS

  static Builder = class {
    first_name = null;
    middle_name = null;
    last_name = null;
    gender = null;
    dob = null;
    present_address = {
      street: null,
      pincode: null,
      city: null,
      district: null,
      state: null,
    };
    permanent_address = {
      street: null,
      pincode: null,
      city: null,
      district: null,
      state: null,
    };
    are_addresses_same = null;
    email = null;
    contact = null;
    category = null;
    blood_group = null;
    aadhar_number = null;
    pan_number = null;

    constructor(data) {
      if (data && typeof data == "object") {
        this.setData(data);
      }
    }

    setData(data) {
      let {
        name,
        first_name,
        middle_name,
        last_name,
        gender,
        dob,
        present_address,
        permanent_address,
        are_addresses_same,
        email,
        contact,
        category,
        blood_group,
        aadhar_number,
        pan_number,
      } = data;

      if (name) {
        const nameObj = Parser.parseName(name);
        first_name = nameObj.first_name;
        middle_name = nameObj.middle_name;
        last_name = nameObj.last_name;
      }

      if (first_name) {
        this.setFirstName(first_name);
      }
      if (middle_name) {
        this.setMiddleName(middle_name);
      }
      if (last_name) {
        this.setLastName(last_name);
      }
      if (gender) {
        this.setGender(gender);
      }
      if (dob) {
        this.setDob(dob);
      }
      if (permanent_address && typeof permanent_address == "object") {
        this.setPermanentAddress(permanent_address);
      }
      if (present_address && typeof present_address == "object") {
        this.setPresentAddress(present_address);
      }
      if (email) {
        this.setEmail(email);
      }
      if (contact) {
        this.setContact(contact);
      }
      if (category) {
        this.setCategory(category);
      }
      if (blood_group) {
        this.setBloodGroup(blood_group);
      }
      if (aadhar_number) {
        this.setAadharNumber(aadhar_number);
      }
      if (pan_number) {
        this.setPanNumber(pan_number);
      }
      this.setAreAddressesSame();
      return this;
    }

    // Section: Setters
    setFirstName(first_name) {
      this.first_name = first_name;
      return this;
    }
    setMiddleName(middle_name) {
      this.middle_name = middle_name;
      return this;
    }
    setLastName(last_name) {
      this.last_name = last_name;
      return this;
    }
    setGender(value) {
      this.gender = value;
      return this;
    }

    setDob(dob) {
      this.dob = new Date(dob);
      return this;
    }

    setPresentAddress(address) {
      this.present_address.street = address.street;
      this.present_address.pincode = address.pincode;
      this.present_address.city = address.city;
      this.present_address.district = address.district;
      this.present_address.state = address.state;
      return this;
    }
    setPermanentAddress(address) {
      this.permanent_address.street = address.street;
      this.permanent_address.pincode = address.pincode;
      this.permanent_address.city = address.city;
      this.permanent_address.district = address.district;
      this.permanent_address.state = address.state;
      return this;
    }
    setAreAddressesSame() {
      this.are_addresses_same = this.compareAddresses();
      return this;
    }

    setEmail(email) {
      this.email = email;
      return this;
    }
    setContact(contact) {
      this.contact = contact;
      return this;
    }
    setCategory(category) {
      this.category = category;
      return this;
    }
    setBloodGroup(bg) {
      this.blood_group = bg;
      return this;
    }
    setAadharNumber(aadhar_number) {
      this.aadhar_number = aadhar_number;
      return this;
    }
    setPanNumber(pan_number) {
      this.pan_number = pan_number;
      return this;
    }

    // Functions
    compareAddresses() {
      return (
        this.permanent_address.street == this.present_address.street &&
        this.permanent_address.pincode == this.present_address.pincode &&
        this.permanent_address.city == this.present_address.city &&
        this.permanent_address.district == this.present_address.district &&
        this.permanent_address.state == this.present_address.state
      );
    }
    build() {
      return new PersonalInfo(this);
    }
  };
}

module.exports = PersonalInfo;
